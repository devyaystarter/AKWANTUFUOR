"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Latest", href: "/latest" },
  { label: "Hardshell", href: "/hardshell" },
  { label: "Carry-On", href: "/carry-on" },
  { label: "Laptop Bags", href: "/laptop-bags" },
  { label: "Backpacks", href: "/backpacks" },
];

const trendingSearches = [
  "Hardshell suitcase",
  "Laptop bag",
  "Luggage set",
];

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { cartItems, updateQuantity, removeItem, cartCount, cartTotal, isCartOpen, openCart, closeCart } = useCart();
  const router = useRouter();

  // Close search on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        closeCart();
      }
    };

    if (isSearchOpen || isCartOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isSearchOpen, isCartOpen, closeCart]);

  return (
    <>
      <header style={{ backgroundColor: "#FFFFFF" }} className="w-full border-b border-black/10">
        <div style={{ paddingLeft: "clamp(1.5rem, 6.51vw, 125px)", paddingRight: "clamp(1.5rem, 6.51vw, 125px)" }} className="flex h-[75px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={205}
              height={46}
              priority
              style={{ height: "auto", width: "140px" }}
            />
          </Link>

          {/* Nav — desktop only */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ 
                  color: "#190E05",
                  fontSize: "clamp(1rem, 0.94vw, 18px)",
                  lineHeight: "120%"
                }}
                className="relative font-normal tracking-normal after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#190E05] after:transition-all after:duration-300 after:ease-out hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons — orange on mobile/tablet, dark on desktop */}
          <div className="flex items-center gap-5">
            {/* Search */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search" 
              className="hover:opacity-70 transition-opacity cursor-pointer"
            >
              {/* Orange icon on mobile/tablet */}
              <svg
                className="lg:hidden"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C8873A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              {/* Original SVG icon on desktop */}
              <Image
                src="/header/Search.svg"
                alt="Search"
                width={20}
                height={20}
                className="hidden lg:block"
              />
            </button>

            {/* Cart */}
            <button 
              onClick={openCart}
              aria-label="Cart" 
              className="relative hover:opacity-70 transition-opacity cursor-pointer"
            >
              {/* Orange icon on mobile/tablet */}
              <svg
                className="lg:hidden"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C8873A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {/* Original SVG icon on desktop */}
              <Image
                src="/header/fluent_cart-24-regular.svg"
                alt="Cart"
                width={20}
                height={20}
                className="hidden lg:block"
              />
              {cartCount > 0 && (
                <span
                  style={{ backgroundColor: "#1A0E05" }}
                  className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold text-white"
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40 bg-black/30"
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery("");
            }}
          />
          
          {/* Search Dropdown */}
          <div className="fixed left-0 right-0 z-50 flex justify-center px-4" style={{ top: "75px" }}>
            <div 
              className="w-full max-w-lg rounded-xl bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 px-6 py-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#CCCCCC"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search bags, luggage..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  style={{
                    fontSize: "15px",
                    color: "#190E05",
                  }}
                  className="flex-1 border-none bg-transparent font-normal outline-none placeholder:text-gray-400"
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                  style={{
                    fontSize: "15px",
                    color: "#999999",
                  }}
                  className="cursor-pointer font-normal transition-colors hover:text-[#190E05]"
                >
                  Cancel
                </button>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100" />

              {/* Trending Searches */}
              <div className="px-6 py-5">
                <div className="mb-4 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FF6B6B"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#FF6B6B",
                      letterSpacing: "0.5px",
                    }}
                    className="font-semibold uppercase"
                  >
                    Trending Searches
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => {
                        setSearchQuery(search);
                        // Handle search here
                      }}
                      style={{
                        fontSize: "14px",
                        color: "#000000",
                        backgroundColor: "#F8F8F8",
                      }}
                      className="cursor-pointer rounded-full px-4 py-2 font-normal transition-colors hover:bg-gray-200"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40 bg-black/30"
            onClick={closeCart}
          />
          
          {/* Sidebar */}
          <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  <h2 className="text-2xl font-bold">My Cart</h2>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                    {cartCount}
                  </span>
                </div>
                <button
                  onClick={closeCart}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
                  aria-label="Close cart"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="mb-6 flex gap-4">
                    {/* Product Image */}
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-1 flex-col">
                      <h3 className="mb-1 font-semibold text-black">{item.name}</h3>
                      <p className="mb-2 text-sm text-gray-500">Colour: {item.color}</p>
                      
                      {/* Price */}
                      <div className="mb-3 flex items-baseline gap-2">
                        <span className="text-lg font-bold text-black">
                          GH₵ {item.price}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          GH₵ {item.originalPrice}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
                            aria-label="Decrease quantity"
                          >
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
                            </svg>
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
                            aria-label="Increase quantity"
                          >
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
                              <line x1="12" y1="5" x2="12" y2="19" />
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                          </button>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-red-50 transition-colors hover:bg-red-100"
                          aria-label="Remove item"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#EF4444"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 px-6 py-4">
                {/* Free Delivery Notice */}
                <div className="mb-4 rounded-lg bg-gray-100 px-4 py-3 text-sm text-gray-700">
                  Add GH₵ 50 more for free delivery
                </div>

                {/* Total */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-gray-600">Total ({cartCount} items)</span>
                  <span className="text-2xl font-bold text-black">GH₵ {cartTotal}</span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => {
                    closeCart();
                    router.push("/checkout");
                  }}
                  style={{ backgroundColor: "#1A0E05" }}
                  className="w-full cursor-pointer rounded-lg py-4 text-center font-semibold text-white transition-colors hover:bg-[#525252]"
                >
                  Checkout Now
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
