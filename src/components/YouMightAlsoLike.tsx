import ProductCard from "./ProductCard";
import productsData from "../../data_models/products.json";

interface YouMightAlsoLikeProps {
  currentProductId: string;
}

export default function YouMightAlsoLike({ currentProductId }: YouMightAlsoLikeProps) {
  // Pick 4 products from the same category, excluding the current one.
  // Fall back to any other products if not enough in the same category.
  const currentProduct = productsData.products.find((p) => p.id === currentProductId);

  let suggestions = productsData.products.filter(
    (p) => p.id !== currentProductId && p.category === currentProduct?.category
  );

  // If fewer than 4 in the same category, pad with other products
  if (suggestions.length < 4) {
    const others = productsData.products.filter(
      (p) => p.id !== currentProductId && p.category !== currentProduct?.category
    );
    suggestions = [...suggestions, ...others];
  }

  // Take the first 4, and mark the last one as out of stock to match the design
  const displayProducts = suggestions.slice(0, 4).map((p, index) => ({
    ...p,
    inStock: index < 3, // last card is "Out of stock" per the design
  }));

  return (
    <section className="w-full bg-white pb-16 pt-10">
      <div
        className="mx-auto"
        style={{
          maxWidth: "1638px",
          paddingLeft: "clamp(1.5rem, 7.34vw, 141px)",
          paddingRight: "clamp(1.5rem, 7.34vw, 141px)",
        }}
      >
        <h2
          className="mb-8 font-semibold"
          style={{ fontSize: "clamp(1.25rem, 1.25vw, 24px)", color: "#000000" }}
        >
          You might also like
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image}
              colors={product.colors}
              badgeColor="#E53E3E"
              inStock={product.inStock}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
