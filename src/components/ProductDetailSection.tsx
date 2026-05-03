"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  colors: string[];
  category: string;
  size: string;
  inStock: boolean;
}

interface ProductDetailSectionProps {
  product: Product;
}

// Map hex colors to display names
const COLOR_NAMES: Record<string, string> = {
  "#D4A574": "Orange",
  "#4A5568": "Slate",
  "#2D3748": "Dark Slate",
  "#1A202C": "Charcoal",
  "#718096": "Gray",
  "#E5E7EB": "Light Gray",
};

function getColorName(hex: string): string {
  return COLOR_NAMES[hex] ?? hex;
}

// Star rating component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={star <= Math.round(rating) ? "#F59E0B" : "none"}
          stroke="#F59E0B"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductDetailSection({ product }: ProductDetailSectionProps) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState(product.colors[0] ?? "");
  const [quantity, setQuantity] = useState(1);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  // Build a grid of 6 image slots using the product image (repeated for the gallery)
  const galleryImages = Array(6).fill(product.image);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      description: product.description,
      color: getColorName(selectedColor),
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <section className="w-full bg-white py-10">
      <div
        className="mx-auto"
        style={{
          maxWidth: "1638px",
          paddingLeft: "clamp(1.5rem, 7.34vw, 141px)",
          paddingRight: "clamp(1.5rem, 7.34vw, 141px)",
        }}
      >
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm">
          <Link
            href="/"
            style={{ color: "#999999" }}
            className="transition-colors hover:text-[#190E05]"
          >
            adeefuor specials
          </Link>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#999999"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span style={{ color: "#C8873A" }} className="font-medium">
            {product.inStock ? "In stock" : "Out of stock"}
          </span>
        </div>

        {/* Main Content: Gallery + Info */}
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/* Left: Image Gallery Grid */}
          <div className="w-full lg:w-[52%]">
            <div className="grid grid-cols-2 gap-3">
              {galleryImages.map((img, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-xl bg-[#F5F5F5]"
                >
                  {/* Discount badge on 2nd and 6th images (index 1 and 5) */}
                  {(index === 1 || index === 5) && discount > 0 && (
                    <div
                      className="absolute right-3 top-3 z-10 rounded-full px-2.5 py-1 text-xs font-semibold text-white"
                      style={{ backgroundColor: "#E53E3E" }}
                    >
                      -{discount}%
                    </div>
                  )}
                  <Image
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 27vw"
                    className="object-contain p-4"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="w-full lg:w-[48%]">
            {/* Product Name */}
            <h1
              className="mb-3 font-semibold leading-tight"
              style={{ fontSize: "clamp(1.5rem, 2.08vw, 40px)", color: "#000000" }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mb-4 flex items-center gap-2">
              <StarRating rating={4.8} />
              <span style={{ fontSize: "14px", color: "#5E5E5E" }}>
                4.8 (214 reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-5 flex items-baseline gap-3">
              <span
                className="font-bold"
                style={{ fontSize: "clamp(1.25rem, 1.67vw, 32px)", color: "#000000" }}
              >
                GH₵ {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span
                  className="font-normal line-through"
                  style={{ fontSize: "clamp(0.875rem, 1.04vw, 20px)", color: "#999999" }}
                >
                  GH₵ {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Colour Selector */}
            <div className="mb-6">
              <p
                className="mb-3 font-medium"
                style={{ fontSize: "14px", color: "#000000" }}
              >
                Colour:{" "}
                <span className="font-normal" style={{ color: "#5E5E5E" }}>
                  {getColorName(selectedColor)}
                </span>
              </p>
              <div className="grid grid-cols-3 gap-2" style={{ maxWidth: "240px" }}>
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select ${getColorName(color)} colour`}
                    className="relative overflow-hidden rounded-lg border-2 transition-all"
                    style={{
                      borderColor: selectedColor === color ? "#1A0E05" : "transparent",
                      aspectRatio: "1",
                    }}
                  >
                    <div className="relative h-full w-full bg-[#F5F5F5]">
                      <Image
                        src={product.image}
                        alt={getColorName(color)}
                        fill
                        sizes="80px"
                        className="object-contain p-1"
                        style={{ filter: color === "#D4A574" ? "none" : color === "#4A5568" ? "hue-rotate(200deg) saturate(0.5)" : color === "#2D3748" ? "hue-rotate(200deg) saturate(0.3) brightness(0.7)" : color === "#1A202C" ? "grayscale(1) brightness(0.5)" : color === "#718096" ? "grayscale(0.8)" : color === "#E5E7EB" ? "grayscale(1) brightness(1.2)" : "none" }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6 flex items-center gap-4">
              <span style={{ fontSize: "14px", color: "#000000" }} className="font-medium">
                Qty:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-gray-300 font-medium transition-colors hover:border-[#1A0E05]"
                  style={{ color: "#000000", fontSize: "16px" }}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span
                  className="flex h-8 w-8 items-center justify-center font-medium"
                  style={{ fontSize: "14px", color: "#000000" }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-gray-300 font-medium transition-colors hover:border-[#1A0E05]"
                  style={{ color: "#000000", fontSize: "16px" }}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <span style={{ fontSize: "14px", color: "#5E5E5E" }}>
                = GH₵ {(product.price * quantity).toLocaleString()}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mb-8 flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 cursor-pointer rounded py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#525252]"
                style={{ backgroundColor: "#1A0E05" }}
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 cursor-pointer rounded border py-3.5 text-sm font-semibold transition-colors hover:bg-[#1A0E05] hover:text-white"
                style={{ borderColor: "#C8873A", color: "#C8873A" }}
              >
                Buy Now
              </button>
            </div>

            {/* Product Details */}
            <div>
              <h3
                className="mb-2 font-semibold"
                style={{ fontSize: "14px", color: "#000000" }}
              >
                Product Details
              </h3>
              <p style={{ fontSize: "13px", color: "#5E5E5E", lineHeight: "1.6" }}>
                Airline-approved carry-on bag that fits overhead bins. Spinner wheels,
                expandable, and built to last a lifetime of travel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
