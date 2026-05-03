"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  colors?: string[];
  badge?: string;
  badgeColor?: string;
  inStock?: boolean;
}

const MAX_VISIBLE_COLORS = 5;

export default function ProductCard({
  id,
  name,
  description,
  price,
  originalPrice,
  image,
  colors = [],
  badgeColor = "#E53E3E",
  inStock = true,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const visibleColors = colors.slice(0, MAX_VISIBLE_COLORS);
  const extraColors = colors.length - MAX_VISIBLE_COLORS;

  const handleAddToCart = () => {
    if (!inStock) return;
    addToCart({ id, name, description, color: colors[0] ?? "N/A", price, originalPrice, image });
  };

  const handleAddToCartFromIcon = (e: React.MouseEvent) => {
    e.preventDefault();
    handleAddToCart();
  };

  return (
    <>
      <style>{`
        /* Figma: Smart animate, ease-out, 100ms */

        /* Image area shrinks on hover to give room for thumbnails */
        .pc-img-area {
          position: relative;
          overflow: hidden;
          border-radius: 16px 16px 0 0;
          /* SVGs have their own bg baked in — no extra bg needed */
          padding-bottom: 100%;
          height: 0;
          transition: padding-bottom 100ms ease-out;
        }
        .pc-root:hover .pc-img-area {
          padding-bottom: 78%;
        }

        /* Product image scale */
        .pc-img {
          position: absolute;
          inset: 0;
          transition: transform 100ms ease-out;
        }
        .pc-root:hover .pc-img {
          transform: scale(1.04);
        }

        /* Discount badge grows */
        .pc-badge {
          transition: transform 100ms ease-out;
          transform-origin: top right;
        }
        .pc-root:hover .pc-badge {
          transform: scale(1.1);
        }

        /* Action icons: bare orange strokes, slide in from left */
        .pc-icons {
          opacity: 0;
          transform: translateY(-50%) translateX(-10px);
          transition: opacity 100ms ease-out, transform 100ms ease-out;
          pointer-events: none;
        }
        .pc-root:hover .pc-icons {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
          pointer-events: auto;
        }

        /* Default swatches fade out */
        .pc-sw-default {
          max-height: 28px;
          opacity: 1;
          overflow: hidden;
          transition: opacity 100ms ease-out, max-height 100ms ease-out;
        }
        .pc-root:hover .pc-sw-default {
          max-height: 0;
          opacity: 0;
        }

        /* Hover thumbnails fade in */
        .pc-sw-hover {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: opacity 100ms ease-out, max-height 100ms ease-out;
        }
        .pc-root:hover .pc-sw-hover {
          max-height: 56px;
          opacity: 1;
        }
      `}</style>

      <div
        className="pc-root flex flex-col overflow-hidden bg-white"
        style={{
          borderRadius: "16px",
          border: "0.5px solid #CACACA",
        }}
      >
        {/* ── Image area — SVGs have baked-in bg, fill edge-to-edge ── */}
        <div className="pc-img-area">
          <Link href={`/product/${id}`} className="pc-img block">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1280px) 33vw, 25vw"
              className="object-cover"
            />
          </Link>

          {/* Discount badge */}
          {discount > 0 && (
            <div
              className="pc-badge absolute right-3 top-3 z-10 rounded-full px-3 py-1.5 text-white"
              style={{
                backgroundColor: badgeColor,
                fontSize: "13px",
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              -{discount}%
            </div>
          )}

          {/* Action icons — bare orange strokes, left side, vertically centered */}
          <div className="pc-icons absolute left-4 top-1/2 z-10 flex flex-col gap-4">
            <button
              onClick={handleAddToCartFromIcon}
              aria-label="Add to cart"
              style={{ color: "#C8873A" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </button>
            <button
              aria-label="Add to wishlist"
              style={{ color: "#C8873A" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            <Link
              href={`/product/${id}`}
              aria-label="Quick view"
              style={{ color: "#C8873A" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                <line x1="11" y1="8" x2="11" y2="14"/>
                <line x1="8" y1="11" x2="14" y2="11"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* ── Info area ── */}
        <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
          {/* Name */}
          <Link href={`/product/${id}`}>
            <h3
              className="mb-0.5 font-bold leading-snug line-clamp-1"
              style={{ fontSize: "clamp(0.9rem, 0.95vw, 17px)", color: "#000000" }}
            >
              {name}
            </h3>
          </Link>

          {/* Description */}
          <p
            className="mb-2 font-normal leading-snug line-clamp-1"
            style={{ fontSize: "clamp(0.72rem, 0.75vw, 13px)", color: "#5E5E5E" }}
          >
            {description}
          </p>

          {/* Price */}
          <div className="mb-2 flex items-baseline gap-2">
            <span
              className="font-bold"
              style={{ fontSize: "clamp(0.95rem, 1vw, 18px)", color: "#000000" }}
            >
              GH₵ {price.toLocaleString()}
            </span>
            {originalPrice && (
              <span
                className="font-normal line-through"
                style={{ fontSize: "clamp(0.68rem, 0.72vw, 13px)", color: "#AAAAAA" }}
              >
                GH₵ {originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* ── Swatches ── */}
          {colors.length > 0 && (
            <div className="mb-3">
              {/* DEFAULT: small flat color squares */}
              <div className="pc-sw-default flex items-center gap-1">
                {visibleColors.map((color, i) => (
                  <span
                    key={i}
                    aria-label={color}
                    style={{
                      backgroundColor: color,
                      width: "18px",
                      height: "18px",
                      borderRadius: "3px",
                      display: "inline-block",
                      border: i === 0 ? "2px solid #C8873A" : "1px solid #D1D5DB",
                      flexShrink: 0,
                    }}
                  />
                ))}
                {extraColors > 0 && (
                  <span
                    className="inline-flex items-center justify-center font-medium"
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "3px",
                      border: "1px solid #D1D5DB",
                      fontSize: "9px",
                      color: "#5E5E5E",
                      flexShrink: 0,
                    }}
                  >
                    +{extraColors}
                  </span>
                )}
              </div>

              {/* HOVERED: 43×43 product image thumbnails */}
              <div className="pc-sw-hover flex items-center gap-1.5 flex-wrap">
                {visibleColors.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Color option ${i + 1}`}
                    className="relative flex-shrink-0 overflow-hidden"
                    style={{
                      width: "43px",
                      height: "43px",
                      borderRadius: "6px",
                      border: i === 0 ? "2px solid #C8873A" : "1px solid #E5E7EB",
                    }}
                  >
                    <Image
                      src={image}
                      alt={`Option ${i + 1}`}
                      fill
                      sizes="43px"
                      className="object-cover"
                    />
                  </button>
                ))}
                {extraColors > 0 && (
                  <span
                    className="inline-flex flex-shrink-0 items-center justify-center font-medium"
                    style={{
                      width: "43px",
                      height: "43px",
                      borderRadius: "6px",
                      border: "1px solid #D1D5DB",
                      fontSize: "11px",
                      color: "#5E5E5E",
                      backgroundColor: "#F5F5F5",
                    }}
                  >
                    +{extraColors}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Add to cart / Out of stock */}
          <button
            onClick={inStock ? handleAddToCart : undefined}
            disabled={!inStock}
            className="mt-auto w-full rounded-lg py-3 font-semibold"
            style={{
              backgroundColor: inStock ? "#1A0E05" : "#E5E7EB",
              color: inStock ? "#FFFFFF" : "#999999",
              cursor: inStock ? "pointer" : "not-allowed",
              fontSize: "14px",
              transition: "background-color 100ms ease-out",
            }}
          >
            {inStock ? "Add to cart" : "Out of stock"}
          </button>
        </div>
      </div>
    </>
  );
}
