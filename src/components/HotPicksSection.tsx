"use client";

import ProductCard from "./ProductCard";

// Mock data - will be replaced with API call
const mockProducts = [
  {
    id: "1",
    name: "ProShield Hardshell",
    description: "Sunset Hills Spinner 55 cm",
    price: 450,
    originalPrice: 580,
    image: "/products/product1.svg",
    colors: ["#D4A574", "#4A5568", "#2D3748", "#1A202C", "#718096"],
  },
  {
    id: "2",
    name: "ProShield Hardshell",
    description: "Sunset Hills Spinner 55 cm",
    price: 450,
    originalPrice: 580,
    image: "/products/product2.svg",
    colors: ["#E5E7EB", "#4A5568", "#2D3748"],
  },
  {
    id: "3",
    name: "ProShield Hardshell",
    description: "Sunset Hills Spinner 55 cm",
    price: 450,
    originalPrice: 580,
    image: "/products/product3.svg",
    colors: ["#D4A574", "#4A5568", "#2D3748", "#1A202C"],
  },
  {
    id: "4",
    name: "ProShield Hardshell",
    description: "Sunset Hills Spinner 55 cm",
    price: 450,
    originalPrice: 580,
    image: "/products/product4.svg",
    colors: ["#E5E7EB", "#4A5568", "#2D3748", "#1A202C"],
  },
  {
    id: "5",
    name: "ProShield Hardshell",
    description: "Sunset Hills Spinner 55 cm",
    price: 450,
    originalPrice: 580,
    image: "/products/product5.svg",
    colors: ["#D4A574", "#4A5568", "#2D3748"],
  },
  {
    id: "6",
    name: "ProShield Hardshell",
    description: "Sunset Hills Spinner 55 cm",
    price: 450,
    originalPrice: 580,
    image: "/products/product6.svg",
    colors: ["#E5E7EB", "#4A5568", "#2D3748", "#1A202C"],
  },
  {
    id: "7",
    name: "ProShield Hardshell",
    description: "Sunset Hills Spinner 55 cm",
    price: 450,
    originalPrice: 580,
    image: "/products/product7.svg",
    colors: ["#D4A574", "#4A5568", "#2D3748"],
  },
  {
    id: "8",
    name: "ProShield Hardshell",
    description: "Sunset Hills Spinner 55 cm",
    price: 450,
    originalPrice: 580,
    image: "/products/product8.svg",
    colors: ["#E5E7EB", "#4A5568", "#2D3748", "#1A202C", "#718096"],
  },
];

export default function HotPicksSection() {
  return (
    <section className="w-full bg-white py-16">
      {/* Section Header */}
      <div className="mb-8 text-center">
        <h2
          style={{
            fontSize: "clamp(1.5rem, 1.67vw, 32px)",
            color: "#000000",
          }}
          className="mb-2 font-semibold"
        >
          Hot Picks
        </h2>
        <p
          style={{
            fontSize: "clamp(0.875rem, 0.83vw, 16px)",
            color: "#5E5E5E",
          }}
          className="font-light"
        >
          Trending this week
        </p>
      </div>

      {/* Products Slider - Full Width */}
      <div
        className="flex gap-6 overflow-x-auto px-[clamp(1.5rem,6.51vw,125px)] scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {mockProducts.map((product) => (
          <div key={product.id} style={{ width: "clamp(260px, calc((100vw - clamp(3rem, 13.02vw, 250px) - 72px) / 4), 391px)", flexShrink: 0 }}>
            <ProductCard {...product} badgeColor="#FF0000" />
          </div>
        ))}
      </div>
    </section>
  );
}
