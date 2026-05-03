"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import productsData from "../../data_models/products.json";

const PRODUCTS_PER_PAGE = 12;

export default function AllProductsSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSize, setSelectedSize] = useState("All sizes");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Get unique categories from products
  const categories = ["All", ...Array.from(new Set(productsData.products.map(p => p.category)))];
  const sizes = ["All sizes", "Small (Carry-On)", "Medium", "Large", "Set"];
  
  // Filter products based on selected category and size
  let filteredProducts = productsData.products;
  
  // Filter by category
  if (selectedCategory !== "All") {
    filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
  }
  
  // Filter by size
  if (selectedSize !== "All sizes") {
    filteredProducts = filteredProducts.filter(p => p.size === selectedSize);
  }
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  
  // Reset to page 1 when category or size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedSize]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.filter-dropdown')) {
        setIsFilterOpen(false);
      }
    };

    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of section
    const section = document.getElementById('all-products-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  return (
    <section id="all-products-section" className="w-full bg-white py-16">
      <div
        className="mx-auto"
        style={{
          maxWidth: "1638px",
          paddingLeft: "clamp(1.5rem, 7.34vw, 141px)",
          paddingRight: "clamp(1.5rem, 7.34vw, 141px)",
        }}
      >
        {/* Section Header */}
        <div className="mb-8">
          <h2
            style={{
              fontSize: "clamp(1.5rem, 1.67vw, 32px)",
              color: "#000000",
            }}
            className="mb-6 font-semibold"
          >
            All Products
          </h2>
          
          {/* Category Filters and Size Filter */}
          <div className="flex items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    fontSize: "clamp(0.875rem, 0.83vw, 16px)",
                    color: selectedCategory === category ? "#190E05" : "#999999",
                  }}
                  className="relative cursor-pointer pb-1 font-medium transition-colors hover:text-[#190E05] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#190E05] after:transition-all after:duration-300 after:ease-out hover:after:w-full data-[active=true]:after:w-full"
                  data-active={selectedCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Size Filter Dropdown */}
            <div className="filter-dropdown relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                style={{
                  fontSize: "clamp(0.875rem, 0.83vw, 16px)",
                  color: "#190E05",
                  borderColor: "#E5E7EB",
                }}
                className="flex cursor-pointer items-center gap-2 rounded-md border bg-white px-4 py-2 font-normal transition-colors hover:border-[#190E05]"
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
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                Filter
              </button>

              {/* Dropdown Menu */}
              {isFilterOpen && (
                <div
                  className="absolute right-0 top-full z-10 mt-2 rounded-md border border-gray-200 bg-white shadow-lg"
                  style={{ minWidth: "160px" }}
                >
                  <div className="py-2">
                    <div
                      style={{
                        fontSize: "clamp(0.75rem, 0.73vw, 14px)",
                        color: "#999999",
                      }}
                      className="mb-1 px-4 py-1 font-medium"
                    >
                      Sizes
                    </div>
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSize(size);
                          setIsFilterOpen(false);
                        }}
                        style={{
                          fontSize: "clamp(0.875rem, 0.83vw, 16px)",
                          color: "#190E05",
                        }}
                        className="flex w-full cursor-pointer items-center justify-between px-4 py-2 text-left font-normal transition-colors hover:bg-gray-50"
                      >
                        {size}
                        {selectedSize === size && (
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
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image}
              colors={product.colors}
              badgeColor="#FF0000"
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                backgroundColor: currentPage === 1 ? "#F5F5F5" : "#FFFFFF",
                color: currentPage === 1 ? "#999999" : "#190E05",
              }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded border border-gray-300 transition-colors hover:border-[#1A0E05] disabled:cursor-not-allowed disabled:hover:border-gray-300"
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
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                style={{
                  backgroundColor: currentPage === page ? "#1A0E05" : "#FFFFFF",
                  color: currentPage === page ? "#FFFFFF" : "#190E05",
                  fontSize: "clamp(0.875rem, 0.83vw, 16px)",
                }}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded border border-gray-300 font-medium transition-colors hover:border-[#1A0E05]"
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                backgroundColor: currentPage === totalPages ? "#F5F5F5" : "#FFFFFF",
                color: currentPage === totalPages ? "#999999" : "#190E05",
              }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded border border-gray-300 transition-colors hover:border-[#1A0E05] disabled:cursor-not-allowed disabled:hover:border-gray-300"
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
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
