import type { LayoutProps } from "@remkoj/optimizely-cms-react"
import type DefaultContentCarouselStyles from "./DefaultContentCarousel.opti-style.json"

export type DefaultContentCarouselProps = LayoutProps<typeof DefaultContentCarouselStyles>

export type ContentCarouselLayoutProps = DefaultContentCarouselProps

export function isDefaultContentCarouselProps(props?: ContentCarouselLayoutProps | null): props is DefaultContentCarouselProps {
  return props?.template === "DefaultContentCarousel"
}
