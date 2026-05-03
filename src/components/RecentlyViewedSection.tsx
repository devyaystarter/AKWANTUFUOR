"use client";

import { useRef } from "react";
import ProductCard from "./ProductCard";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import productsData from "../../data_models/products.json";

interface RecentlyViewedSectionProps {
  currentProductId: string;
}

export default function RecentlyViewedSection({
  currentProductId,
}: RecentlyViewedSectionProps) {
  const recentIds = useRecentlyViewed(currentProductId);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Resolve IDs to full product objects
  const products = recentIds
    .map((id) => productsData.products.find((p) => p.id === id))
    .filter(Boolean) as (typeof productsData.products)[number][];

  // Don't render the section until there's at least one previously viewed product
  if (products.length === 0) return null;

  return (
    <section className="w-full bg-white pb-16 pt-10">
      {/* Section Header */}
      <div className="mb-8 text-center">
        <h2
          className="font-semibold"
          style={{ fontSize: "clamp(1.25rem, 1.67vw, 32px)", color: "#000000" }}
        >
          Recently viewed
        </h2>
      </div>

      {/* Carousel — full-width scrollable row, same pattern as HotPicksSection */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-[clamp(1.5rem,6.51vw,125px)] scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div key={product.id} className="w-[280px] flex-shrink-0">
            <ProductCard
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
          </div>
        ))}
      </div>
    </section>
  );
}
