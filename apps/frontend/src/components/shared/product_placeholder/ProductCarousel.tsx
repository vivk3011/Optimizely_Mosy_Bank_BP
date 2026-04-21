"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useWindowWidth } from "@react-hook/window-size/throttled";

export type Product = {
  id: string;
  name: string;
  category: string;
  originalPrice: number;
  salePrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge: string;
  url: string;
};

type ProductCarouselProps = {
  products: Product[];
  heading?: string;
};

const BADGE_COLORS: Record<string, string> = {
  "HOT DEAL": "bg-red-500",
  "TOP SELLER": "bg-orange-500",
  "LIMITED TIME": "bg-purple-600",
  "BEST VALUE": "bg-green-600",
  "NEW": "bg-blue-600",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-3.5 w-3.5 ${star <= Math.round(rating) ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-xs text-gray-500">({rating.toFixed(1)})</span>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const badgeColor = BADGE_COLORS[product.badge] ?? "bg-gray-700";

  return (
    <a
      href={product.url}
      className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-44 object-cover"
        />
        <span className={`absolute top-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white ${badgeColor}`}>
          {product.badge}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-3 gap-1">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">{product.category}</span>
        <p className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">{product.name}</p>
        <StarRating rating={product.rating} />
        <span className="text-[10px] text-gray-400">{product.reviewCount} reviews</span>
        <div className="mt-auto pt-2 flex items-baseline gap-2">
          <span className="text-base font-bold text-red-600">${product.salePrice.toFixed(2)}</span>
          <span className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
          <span className="ml-auto text-[10px] font-bold text-green-700 bg-green-50 rounded px-1 py-0.5">
            -{product.discountPercent}%
          </span>
        </div>
        <button
          className="mt-2 w-full rounded-lg bg-orange-500 py-1.5 text-xs font-semibold text-white hover:bg-orange-600 transition-colors"
          onClick={(e) => e.preventDefault()}
        >
          Shop Now
        </button>
      </div>
    </a>
  );
}

export default function ProductCarousel({ products, heading }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(25); // vw units
  const windowWidth = useWindowWidth();
  const itemCount = products.length;

  // Match _carousel-block.tsx responsive breakpoints
  useEffect(() => {
    if (!windowWidth) return;
    setItemWidth(windowWidth <= 900 ? 80 : 25);
  }, [windowWidth]);

  const handlePrev = () =>
    setCurrentIndex((i) => (i <= 0 ? 0 : i - 1));

  const handleNext = () =>
    setCurrentIndex((i) => (i >= itemCount - 1 ? itemCount - 1 : i + 1));

  if (!itemCount) return null;

  return (
    <section className="w-full overflow-hidden relative my-10 flex flex-col px-4">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">{heading ?? "🔥 Hot This Week"}</h2>
        </div>

        {/* Nav buttons — same SVG style as _carousel-block.tsx */}
        <section role="navigation" className="flex gap-4">
          <button onClick={handlePrev} aria-label="Previous slide">
            <svg
              width="48" height="49" viewBox="0 0 48 49" fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: "rotate(180deg)" }}
              className={currentIndex === 0 ? "text-mischka dark:text-ghost-white" : "text-vulcan dark:text-light-grey"}
            >
              <g clipPath="url(#products-clip-prev)">
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M48 24.4104C48 30.7756 45.4714 36.8801 40.9706 41.381C36.4697 45.8818 30.3652 48.4104 24 48.4104C17.6348 48.4104 11.5303 45.8818 7.02944 41.381C2.52856 36.8801 0 30.7756 0 24.4104C0 18.0452 2.52856 11.9407 7.02944 7.43984C11.5303 2.93896 17.6348 0.4104 24 0.4104C30.3652 0.4104 36.4697 2.93896 40.9706 7.43984C45.4714 11.9407 48 18.0452 48 24.4104ZM13.5 25.9104C13.1022 25.9104 12.7206 25.7524 12.4393 25.4711C12.158 25.1898 12 24.8082 12 24.4104C12 24.0126 12.158 23.631 12.4393 23.3497C12.7206 23.0684 13.1022 22.9104 13.5 22.9104H30.879L24.438 16.4724C24.1563 16.1907 23.9981 15.8087 23.9981 15.4104C23.9981 15.0121 24.1563 14.6301 24.438 14.3484C24.7197 14.0667 25.1017 13.9085 25.5 13.9085C25.8983 13.9085 26.2803 14.0667 26.562 14.3484L35.562 23.3484C35.7017 23.4877 35.8125 23.6533 35.8881 23.8355C35.9638 24.0177 36.0027 24.2131 36.0027 24.4104C36.0027 24.6077 35.9638 24.8031 35.8881 24.9853C35.8125 25.1675 35.7017 25.3331 35.562 25.4724L26.562 34.4724C26.2803 34.7541 25.8983 34.9123 25.5 34.9123C25.1017 34.9123 24.7197 34.7541 24.438 34.4724C24.1563 34.1907 23.9981 33.8087 23.9981 33.4104C23.9981 33.0121 24.1563 32.6301 24.438 32.3484L30.879 25.9104H13.5Z"
                  fill="currentColor" />
              </g>
              <defs>
                <clipPath id="products-clip-prev">
                  <rect width="48" height="48" fill="white" transform="translate(0 0.4104)" />
                </clipPath>
              </defs>
            </svg>
            <span className="sr-only">Previous Slide</span>
          </button>

          <button onClick={handleNext} aria-label="Next slide">
            <svg
              width="48" height="49" viewBox="0 0 48 49" fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={currentIndex >= itemCount - 1 ? "text-mischka dark:text-light-grey" : "text-vulcan dark:text-ghost-white"}
            >
              <g clipPath="url(#products-clip-next)">
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M48 24.4104C48 30.7756 45.4714 36.8801 40.9706 41.381C36.4697 45.8818 30.3652 48.4104 24 48.4104C17.6348 48.4104 11.5303 45.8818 7.02944 41.381C2.52856 36.8801 0 30.7756 0 24.4104C0 18.0452 2.52856 11.9407 7.02944 7.43984C11.5303 2.93896 17.6348 0.4104 24 0.4104C30.3652 0.4104 36.4697 2.93896 40.9706 7.43984C45.4714 11.9407 48 18.0452 48 24.4104ZM13.5 25.9104C13.1022 25.9104 12.7206 25.7524 12.4393 25.4711C12.158 25.1898 12 24.8082 12 24.4104C12 24.0126 12.158 23.631 12.4393 23.3497C12.7206 23.0684 13.1022 22.9104 13.5 22.9104H30.879L24.438 16.4724C24.1563 16.1907 23.9981 15.8087 23.9981 15.4104C23.9981 15.0121 24.1563 14.6301 24.438 14.3484C24.7197 14.0667 25.1017 13.9085 25.5 13.9085C25.8983 13.9085 26.2803 14.0667 26.562 14.3484L35.562 23.3484C35.7017 23.4877 35.8125 23.6533 35.8881 23.8355C35.9638 24.0177 36.0027 24.2131 36.0027 24.4104C36.0027 24.6077 35.9638 24.8031 35.8881 24.9853C35.8125 25.1675 35.7017 25.3331 35.562 25.4724L26.562 34.4724C26.2803 34.7541 25.8983 34.9123 25.5 34.9123C25.1017 34.9123 24.7197 34.7541 24.438 34.4724C24.1563 34.1907 23.9981 33.8087 23.9981 33.4104C23.9981 33.0121 24.1563 32.6301 24.438 32.3484L30.879 25.9104H13.5Z"
                  fill="currentColor" />
              </g>
              <defs>
                <clipPath id="products-clip-next">
                  <rect width="48" height="48" fill="white" transform="translate(0 0.4104)" />
                </clipPath>
              </defs>
            </svg>
            <span className="sr-only">Next Slide</span>
          </button>
        </section>
      </div>

      {/* Animated track — same motion.div pattern as _carousel-block.tsx */}
      <motion.div
        className="flex px-4"
        style={{
          // @ts-ignore - inline CSS variable
          ["--item-width"]: `${itemWidth}vw`,
          width: `calc(${itemCount * itemWidth}vw + ${(itemCount - 1) * 16}px)`,
          x: `calc(${currentIndex * -itemWidth}vw - ${currentIndex * 16}px)`,
          transition: "0.5s",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              flex: `0 0 ${itemWidth}vw`,
              width: `${itemWidth}vw`,
              paddingLeft: "8px",
              paddingRight: "8px",
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </motion.div>

      {/* Indicator dots */}
      <div className="mt-6 flex justify-center gap-2">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 w-2 rounded-full transition-colors ${i === currentIndex ? "bg-orange-500" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </section>
  );
}
