"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  { id: 1, image: "/hero/bg1.svg" },
  { id: 2, image: "/hero/bg2.svg" },
  { id: 3, image: "/hero/bg3.svg" },
  { id: 4, image: "/hero/bg4.svg" },
  { id: 5, image: "/hero/bg5.svg" },
  { id: 6, image: "/hero/bg6.svg" },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5000ms delay as per Figma

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        // Desktop: maintain the 1920/635 ratio. Mobile: fixed min-height so content fits.
        aspectRatio: "1920/635",
        minHeight: "clamp(420px, 33vw, 635px)",
      }}
    >
      {/* Background Images with Fade */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-1000 ease-out"
          style={{
            opacity: currentSlide === index ? 1 : 0,
            zIndex: currentSlide === index ? 1 : 0,
          }}
        >
          <Image
            src={slide.image}
            alt={`Hero background ${slide.id}`}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Content Overlay */}
      <div
        className="relative z-10 flex h-full items-center"
        style={{ paddingLeft: "clamp(1.25rem, 7.29vw, 140px)", paddingRight: "clamp(1.25rem, 4vw, 60px)" }}
      >
        <div style={{ maxWidth: "clamp(260px, 28.65vw, 550px)", width: "100%" }}>
          <h1
            style={{
              color: "#000000",
              fontSize: "clamp(1.75rem, 4.17vw, 80px)",
              lineHeight: "130%",
            }}
            className="mb-3 font-semibold tracking-normal"
          >
            Travel in Style
            <br />
            and Comfort
          </h1>
          <p
            style={{
              color: "#000000",
              fontSize: "clamp(0.85rem, 1.04vw, 20px)",
              lineHeight: "120%",
            }}
            className="mb-6 font-normal tracking-normal"
          >
            Affordable, Durable, Delivered Fast across Ghana.
          </p>

          {/* CTA Button */}
          <Link
            href="/shop"
            style={{
              fontSize: "clamp(0.8rem, 0.83vw, 16px)",
              lineHeight: "100%",
            }}
            className="inline-flex items-center gap-2.5 rounded-lg border border-[#190E05] bg-[#1A0E05] px-7 py-3.5 font-medium text-white transition-colors hover:bg-[#525252]"
          >
            Shop Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <div>
              <div
                style={{
                  color: "#000000",
                  fontSize: "clamp(0.8rem, 0.83vw, 16px)",
                  lineHeight: "120%",
                }}
                className="font-bold tracking-normal"
              >
                500+
              </div>
              <div
                style={{
                  color: "#000000",
                  fontSize: "clamp(0.8rem, 0.83vw, 16px)",
                  lineHeight: "120%",
                }}
                className="font-light tracking-normal"
              >
                Products
              </div>
            </div>
            <div>
              <div
                style={{
                  color: "#000000",
                  fontSize: "clamp(0.8rem, 0.83vw, 16px)",
                  lineHeight: "120%",
                }}
                className="font-bold tracking-normal"
              >
                Free Delivery
              </div>
              <div
                style={{
                  color: "#000000",
                  fontSize: "clamp(0.8rem, 0.83vw, 16px)",
                  lineHeight: "120%",
                }}
                className="font-light tracking-normal"
              >
                GH₵200+
              </div>
            </div>
            <div>
              <div
                style={{
                  color: "#000000",
                  fontSize: "clamp(0.8rem, 0.83vw, 16px)",
                  lineHeight: "120%",
                }}
                className="font-bold tracking-normal"
              >
                30-day
              </div>
              <div
                style={{
                  color: "#000000",
                  fontSize: "clamp(0.8rem, 0.83vw, 16px)",
                  lineHeight: "120%",
                }}
                className="font-light tracking-normal"
              >
                Returns
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div
        className="absolute top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2"
        style={{ right: "clamp(0.75rem, 5.31vw, 102px)" }}
      >
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="group relative flex cursor-pointer items-center justify-center transition-all"
          >
            {currentSlide === index ? (
              <div
                style={{ backgroundColor: "#190E05" }}
                className="h-6 w-2 rounded-full"
              />
            ) : (
              <div
                style={{ borderColor: "#190E05" }}
                className="h-2 w-2 rounded-full border-[1.5px]"
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
