"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

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

export type ProductCardAspectRatio = "square" | "portrait" | "photo" | "monitor" | "widescreen";
export type ProductCardOrientation = "landscape" | "portrait";
export type ProductCardRoundedCorners = "none" | "small" | "medium" | "large" | "huge" | "full";
export type ProductCardStyle = "default" | "compact" | "minimal" | "featured";
export type ProductItemsPerView = "one" | "two" | "three" | "four" | "five";
export type ProductMaxItems = "all" | "four" | "eight" | "twelve" | "sixteen" | "twenty";
export type ProductFadeAppear = "none" | "fade";
export type ProductFadeSpeed = "none" | "short" | "medium" | "long" | "verylong";
export type ProductBackgroundColor = "transparent" | "grey" | "white" | "black" | "blue"   | "brandBlue" | "brandYellow";
export type ProductTextColor = "auto" | "dark" | "light" | "muted" | "accent" | "brandBlue" | "brandYellow";
export type ProductToggle = "yes" | "no";
export type ProductOnOff = "on" | "off";
export type ProductAutoplayInterval = "veryfast" | "fast" | "medium" | "slow";
export type ProductSlideGap = "none" | "small" | "medium" | "large";

type ProductCarouselProps = {
  products: Product[];
  heading?: string;
  aspectRatio?: ProductCardAspectRatio;
  orientation?: ProductCardOrientation;
  roundedCorners?: ProductCardRoundedCorners;
  bgColor?: ProductBackgroundColor;
  textColor?: ProductTextColor;
  cardStyle?: ProductCardStyle;
  itemsPerView?: ProductItemsPerView;
  maxItems?: ProductMaxItems;
  appear?: ProductFadeAppear;
  duration?: ProductFadeSpeed;
  delay?: ProductFadeSpeed;
  showArrows?: ProductToggle;
  showDots?: ProductToggle;
  autoplay?: ProductOnOff;
  autoplayInterval?: ProductAutoplayInterval;
  loop?: ProductOnOff;
  slideGap?: ProductSlideGap;
};

// Auto picks readable text based on background; explicit values override.
const TEXT_COLOR_CLASSES: Record<ProductTextColor, string> = {
  auto: "",
  dark: "!text-gray-900",
  light: "!text-white",
  muted: "!text-gray-500",
  accent: "!text-orange-600",
  brandBlue: "!text-brandBlue",
  brandYellow: "!text-brandYellow",
};

const AUTO_TEXT_FOR_BG: Record<ProductBackgroundColor, string> = {
  transparent: "text-gray-900",
  grey: "text-gray-900",
  white: "text-gray-900",
  blue: "text-gray-900",
  black: "text-white",
  brandBlue: "text-white",
  brandYellow: "text-gray-900",
};

function resolveTextClass(textColor: ProductTextColor, bgColor: ProductBackgroundColor) {
  return textColor === "auto" ? AUTO_TEXT_FOR_BG[bgColor] : TEXT_COLOR_CLASSES[textColor];
}

const BADGE_COLORS: Record<string, string> = {
  "HOT DEAL": "bg-red-500",
  "TOP SELLER": "bg-orange-500",
  "LIMITED TIME": "bg-purple-600",
  "BEST VALUE": "bg-green-600",
  "NEW": "bg-blue-600",
};

// Use the `!` important prefix so the chosen background overrides the
// default `bg-white` baked into CARD_STYLE_CLASSES (Tailwind utilities at
// the same specificity are resolved by source order in the generated CSS,
// not by className order, so plain `bg-blue-50` loses to `bg-white`).
const BACKGROUND_COLOR_CLASSES: Record<ProductBackgroundColor, string> = {
  transparent: "!bg-transparent",
  grey: "!bg-gray-100",
  white: "!bg-white",
  black: "!bg-black",
  blue: "!bg-blue-50",
  brandBlue: "!bg-brandBlue",
  brandYellow: "!bg-brandYellow",

};

const ASPECT_RATIO_CLASSES_LANDSCAPE: Record<ProductCardAspectRatio, string> = {
  square: "aspect-square",
  portrait: "aspect-[4/3]",
  photo: "aspect-[3/2]",
  monitor: "aspect-[4/3]",
  widescreen: "aspect-[16/9]",
};

const ASPECT_RATIO_CLASSES_PORTRAIT: Record<ProductCardAspectRatio, string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  photo: "aspect-[2/3]",
  monitor: "aspect-[3/4]",
  widescreen: "aspect-[9/16]",
};

const ROUNDED_CORNERS_CLASSES: Record<ProductCardRoundedCorners, string> = {
  none: "rounded-none",
  small: "rounded",
  medium: "rounded-lg",
  large: "rounded-2xl",
  huge: "rounded-[2rem]",
  full: "rounded-full",
};

const CARD_STYLE_CLASSES: Record<ProductCardStyle, string> = {
  default: "border border-gray-200 shadow-sm hover:shadow-md",
  compact: "border border-gray-200 shadow-sm hover:shadow-md",
  minimal: "",
  featured: "border border-orange-200 shadow-lg hover:shadow-xl",
};

const CARD_BODY_PADDING: Record<ProductCardStyle, string> = {
  default: "p-3 gap-1",
  compact: "p-2 gap-0.5",
  minimal: "p-2 gap-1",
  featured: "p-4 gap-1.5",
};

const ITEMS_PER_VIEW_COUNT: Record<ProductItemsPerView, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
};

const MAX_ITEMS_COUNT: Record<ProductMaxItems, number | undefined> = {
  all: undefined,
  four: 4,
  eight: 8,
  twelve: 12,
  sixteen: 16,
  twenty: 20,
};

const FADE_SECONDS: Record<ProductFadeSpeed, number> = {
  none: 0,
  short: 0.5,
  medium: 1,
  long: 1.5,
  verylong: 2,
};

const AUTOPLAY_INTERVAL_MS: Record<ProductAutoplayInterval, number> = {
  veryfast: 1500,
  fast: 3000,
  medium: 5000,
  slow: 7000,
};

const SLIDE_GAP_MAP: Record<ProductSlideGap, number> = {
  none: 0,
  small: 8,
  medium: 16,
  large: 32,
};

const SLIDE_GAP_PX = 16;

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

function ProductCard({
  product,
  aspectRatio = "square",
  orientation = "landscape",
  roundedCorners = "medium",
  cardStyle = "default",
  bgColor = "blue",
  textColor = "auto",
  fadeIn,
}: {
  product: Product;
  aspectRatio?: ProductCardAspectRatio;
  orientation?: ProductCardOrientation;
  roundedCorners?: ProductCardRoundedCorners;
  cardStyle?: ProductCardStyle;
  bgColor?: ProductBackgroundColor;
  textColor?: ProductTextColor;
  fadeIn?: { duration: number; delay: number } | false;
}) {
  const badgeColor = BADGE_COLORS[product.badge] ?? "bg-gray-700";
  const cardClasses = `${ROUNDED_CORNERS_CLASSES[roundedCorners]} ${CARD_STYLE_CLASSES[cardStyle]} 
  ${BACKGROUND_COLOR_CLASSES[bgColor]} 
 ${resolveTextClass(textColor, bgColor)} transition-shadow overflow-hidden flex flex-col h-full`;
  const aspectMap = orientation === "portrait" ? ASPECT_RATIO_CLASSES_PORTRAIT : ASPECT_RATIO_CLASSES_LANDSCAPE;
  const imageWrapperClasses = `relative w-full overflow-hidden ${BACKGROUND_COLOR_CLASSES[bgColor]} ${aspectMap[aspectRatio]}`;
  const bodyClasses = `flex flex-1 flex-col ${CARD_BODY_PADDING[cardStyle]}`;

  const inner = (
    <a href={product.url} className={cardClasses}>
      <div className={imageWrapperClasses}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain p-2"
        />
        <span className={`absolute top-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white ${badgeColor}`}>
          {product.badge}
        </span>
      </div>
      <div className={bodyClasses}>
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

  if (fadeIn && fadeIn.duration > 0) {
    return (
      <motion.div
        className="h-full"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: fadeIn.duration, delay: fadeIn.delay, ease: "easeOut" }}
      >
        {inner}
      </motion.div>
    );
  }
  return inner;
}

export default function ProductCarousel({
  products,
  heading,
  aspectRatio = "square",
  orientation = "landscape",
  roundedCorners = "medium",
  cardStyle = "default",
  itemsPerView = "four",
  maxItems = "all",
  appear = "none",
  duration = "medium",
  delay = "none",
  bgColor = "blue",
  textColor = "auto",
  showArrows = "yes",
  showDots = "yes",
  autoplay = "off",
  autoplayInterval = "medium",
  loop = "off",
  slideGap = "medium",
}: ProductCarouselProps) {
  const desiredPerView = ITEMS_PER_VIEW_COUNT[itemsPerView];
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxItemsCap = MAX_ITEMS_COUNT[maxItems];
  const visibleProducts = maxItemsCap ? products.slice(0, maxItemsCap) : products;
  const itemCount = visibleProducts.length;

  const fadeDuration = FADE_SECONDS[duration];
  const fadeBaseDelay = FADE_SECONDS[delay];
  const fadeEnabled = appear === "fade" && fadeDuration > 0;

  const gapPx = SLIDE_GAP_MAP[slideGap];
  const arrowsEnabled = showArrows === "yes";
  const dotsEnabled = showDots === "yes";
  const loopEnabled = loop === "on";

  // Measure the carousel's own container so the cards size to the parent
  // (e.g. a CMS column), not the viewport. Avoids overflow when placed
  // next to an image in a multi-column layout.
  useEffect(() => {
    const node = trackRef.current;
    if (!node || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    ro.observe(node);
    setContainerWidth(node.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  // Responsive cap on cards per view based on the container (not window),
  // so the layout adapts whether the carousel is full-width or in a column.
  const effectivePerView = (() => {
    if (containerWidth === 0) return desiredPerView;
    if (containerWidth < 360) return 1;
    if (containerWidth < 560) return Math.min(desiredPerView, 2);
    if (containerWidth < 820) return Math.min(desiredPerView, 3);
    return desiredPerView;
  })();

  const itemWidthPx =
    containerWidth > 0
      ? Math.max(
          120,
          (containerWidth - gapPx * (effectivePerView - 1)) / effectivePerView,
        )
      : 0;
  const stepPx = itemWidthPx + gapPx;
  const maxIndex = Math.max(0, itemCount - effectivePerView);
  const clampedIndex = Math.min(currentIndex, maxIndex);

  const handlePrev = () =>
    setCurrentIndex((i) => (loopEnabled && i <= 0 ? maxIndex : Math.max(0, i - 1)));
  const handleNext = () =>
    setCurrentIndex((i) => (loopEnabled && i >= maxIndex ? 0 : Math.min(maxIndex, i + 1)));

  // Autoplay: advance one step on an interval; loop wraps, otherwise stops at end.
  useEffect(() => {
    if (autoplay !== "on" || maxIndex === 0) return;
    const interval = AUTOPLAY_INTERVAL_MS[autoplayInterval];
    const id = setInterval(() => {
      setCurrentIndex((i) =>
        i >= maxIndex ? (loopEnabled ? 0 : maxIndex) : i + 1,
      );
    }, interval);
    return () => clearInterval(id);
  }, [autoplay, autoplayInterval, loopEnabled, maxIndex]);

  if (!itemCount) return null;

  return (
    <section className="w-full min-w-0 max-w-full overflow-hidden relative my-6 flex flex-col" style={{ marginLeft: "3%" }}>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-2xl font-extrabold text-gray-900 truncate">{heading ?? "\uD83D\uDD25 Hot This Week"}</h2>
        </div>

        {/* Nav buttons */}
        {arrowsEnabled && (
        <section role="navigation" className="flex gap-4 shrink-0">
          <button onClick={handlePrev} aria-label="Previous slide" disabled={!loopEnabled && clampedIndex === 0}>
            <svg
              width="48" height="49" viewBox="0 0 48 49" fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: "rotate(180deg)" }}
              className={clampedIndex === 0 ? "text-mischka dark:text-ghost-white" : "text-vulcan dark:text-light-grey"}
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

          <button onClick={handleNext} aria-label="Next slide" disabled={!loopEnabled && clampedIndex >= maxIndex}>
            <svg
              width="48" height="49" viewBox="0 0 48 49" fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={clampedIndex >= maxIndex ? "text-mischka dark:text-light-grey" : "text-vulcan dark:text-ghost-white"}
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
        )}
      </div>

      {/* Animated track — sized to its parent container, not the viewport */}
      <div  ref={trackRef} className={` ${BACKGROUND_COLOR_CLASSES[bgColor]} relative w-full overflow-hidden`}>
        <motion.div
          className="flex"
          style={{
            gap: `${gapPx}px`,
            x: -(stepPx * clampedIndex),
            transition: "0.5s",
          }}
        >
          {visibleProducts.map((product, idx) => (
            <div
              key={product.id}
              style={{
                flex: `0 0 ${itemWidthPx}px`,
                width: `${itemWidthPx}px`,
              }}
            >

              <ProductCard
                product={product}
                aspectRatio={aspectRatio}
                orientation={orientation}
                roundedCorners={roundedCorners}
                cardStyle={cardStyle}
                bgColor={bgColor}
                textColor={textColor}
                fadeIn={
                  fadeEnabled
                    ? { duration: fadeDuration, delay: fadeBaseDelay + idx * 0.05 }
                    : false
                }
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Indicator dots */}
      {dotsEnabled && (
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 w-2 rounded-full transition-colors ${i === clampedIndex ? "bg-orange-500" : "bg-gray-300"}`}
          />
        ))}
      </div>
      )}
    </section>
  );
}
