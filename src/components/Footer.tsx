"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Latest", href: "/latest" },
  { label: "Hardshell", href: "/hardshell" },
  { label: "Carry-On", href: "/carry-on" },
  { label: "Laptop Bags", href: "/laptop-bags" },
  { label: "Backpacks", href: "/backpacks" },
];

export default function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer style={{ backgroundColor: "#1A0E05" }} className="w-full">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-16">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo-footer.svg"
            alt="AK24WANTUFUOR"
            width={319}
            height={71}
            style={{ width: "200px", height: "auto" }}
          />
        </Link>

        {/* Nav */}
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-normal text-white/80 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Newsletter */}
        <div className="flex w-full flex-col items-center gap-4">
          <p className="text-sm font-normal text-white">Get In Touch</p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-sm overflow-hidden rounded border border-white/20"
          >
            <input
              type="email"
              placeholder="Your Email"
              aria-label="Your Email"
              className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none"
            />
            <button
              type="submit"
              className="flex-shrink-0 bg-white px-5 py-2.5 text-sm font-medium text-[#1A0E05] hover:bg-white/90 transition-colors cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-white/10" />

        {/* Copyright */}
        <p className="text-xs text-white/40">
          © {year} AK24WANTUFUOR
        </p>
      </div>
    </footer>
  );
}
