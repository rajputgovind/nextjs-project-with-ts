"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  "All",
  "Building",
  "Home Loans",
  "Property Guides & Tips",
  "Finance",
  "Property Investments",
];

const blogPosts = Array(9).fill({
  category: "Building",
  date: "August 20, 2023",
  title: "Guiding you to your dream home with advanced AI and unmatched..",
  image: "/pool-home.png",
});

export default function Component() {
  const [activePage, setActivePage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("All");

  const totalPages = 20;
  const visiblePages = 7;

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= visiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    const startPage = Math.max(2, activePage - 2);
    const endPage = Math.min(totalPages - 1, activePage + 2);

    if (startPage > 2) pages.push("...");
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    if (endPage < totalPages - 1) pages.push("...");

    pages.push(totalPages);
    return pages;
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[300px] mb-12">
        <Image
          src="/night-skyscrapper.png"
          alt="City skyline"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
      </div>

      <div className="container mx-auto py-8 px-4-">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <hr className="hr-grad h-1 mb-3" />
            <h2 className="text-[22px] text-[#000000] font-bold mb-5">
              Categories
            </h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => setActiveCategory(category)}
                    className={`text-left w-full py-1 font-semibold ${
                      activeCategory === category
                        ? "text-pink-500 font-semibold"
                        : "text-[#0B0B0B] hover:text-gray-900"
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post, index) => (
                <div
                  key={index}
                  className="border custom-shadow-4 rounded-xl overflow-hidden"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={360}
                    height={240}
                    className="w-full object-cover"
                  />
                  <div className="p-4">
                    <div className="flex flex-col gap-2 mb-2">
                      <span className="text-[#3A3A3A] text-[18px] font-medium">
                        {post.category}
                      </span>
                      <span className="text-[#3A3A3A] text-[12px] font-normal">
                        {post.date}
                      </span>
                    </div>
                    <p className="text-[#3A3A3A] text-[16px] leading-[22px] mb-2">
                      {post.title}{" "}
                      <Link
                        href="#"
                        className="text-[#EF2BA0] hover:text-pink-600"
                      >
                        Read More
                      </Link>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2 bg-[#FDE6F4] px-[24px] py-3 rounded-[26px] custom-shadow-2">
                <button
                  onClick={() => setActivePage(Math.max(1, activePage - 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                  disabled={activePage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      typeof page === "number" && setActivePage(page)
                    }
                    className={`w-8 h-8 flex items-center justify-center rounded-full
                      ${
                        typeof page === "number" && page === activePage
                          ? "bg-[#443F6D] text-white"
                          : "hover:bg-[#443f6d]"
                      }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setActivePage(Math.min(totalPages, activePage + 1))
                  }
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                  disabled={activePage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
