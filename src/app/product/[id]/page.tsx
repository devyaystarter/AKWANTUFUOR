import { notFound } from "next/navigation";
import { headers } from "next/headers";
import type { Metadata } from "next";
import ProductDetailSection from "@/components/ProductDetailSection";
import YouMightAlsoLike from "@/components/YouMightAlsoLike";
import RecentlyViewedSection from "@/components/RecentlyViewedSection";
import productsData from "../../../../data_models/products.json";

type Props = {
  params: Promise<{ id: string }>;
};

// ── OG / SEO metadata ──────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = productsData.products.find((p) => p.id === id);

  if (!product) {
    return { title: "Product not found" };
  }

  // Derive the base URL from the incoming request — works in dev, staging, prod
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const title = `${product.name} — ${product.description}`;
  const description =
    `${product.size} · ${product.category} · GH₵ ${product.price.toLocaleString()}` +
    (discount > 0 ? ` (${discount}% off, was GH₵ ${product.originalPrice.toLocaleString()})` : "") +
    ` · ${product.inStock ? "In stock" : "Out of stock"}`;

  const imageUrl = `${baseUrl}${product.image}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/product/${id}`,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    other: {
      "product:price:amount": String(product.price),
      "product:price:currency": "GHS",
      "product:availability": product.inStock ? "in stock" : "out of stock",
      "product:category": product.category,
    },
  };
}

// ── Page ───────────────────────────────────────────────────────────────────
export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = productsData.products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <ProductDetailSection product={product} />
      <YouMightAlsoLike currentProductId={id} />
      <RecentlyViewedSection currentProductId={id} />
    </main>
  );
}
