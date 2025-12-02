"use client"

import { useCallback, useEffect, useState } from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"

type HeroCarouselProps = {
  images: { id: string; url: string }[]
  imagesMobile: { id: string; url: string }[]
}

export function HeroCarousel({ images, imagesMobile }: HeroCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const scrollTo = useCallback(
    (index: number) => api && api.scrollTo(index),
    [api],
  )

  return (
    <div className="mb-8">
      {/* Desktop Carousel */}
      <Carousel
        setApi={setApi}
        className="w-full relative hidden md:block"
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
      >
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id}>
              <div className="relative w-full">
                <img
                  src={image.url}
                  alt={`Carousel image`}
                  className="w-full"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 text-neutral-07 hover:text-primary-1 border-0 shadow-lg 2xl:left-8 2xl:w-14 2xl:h-14" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 text-neutral-07 hover:text-primary-1 border-0 shadow-lg 2xl:right-8 2xl:w-14 2xl:h-14" />
      </Carousel>

      {/* Mobile Carousel */}
      <Carousel
        setApi={setApi}
        className="w-full relative md:hidden"
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
      >
        <CarouselContent>
          {imagesMobile.map((image) => (
            <CarouselItem key={image.id}>
              <div className="relative w-full">
                <img
                  src={image.url}
                  alt={`Carousel mobile image`}
                  className="w-full"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Dots for Mobile */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <Button
              key={`dot-${index}`}
              variant="ghost"
              size="icon"
              onClick={() => scrollTo(index)}
              className={`p-0! min-w-0! min-h-0! h-2 rounded-full transition-all ${
                index === current
                  ? "w-8 bg-white hover:bg-white"
                  : "w-2 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  )
}
