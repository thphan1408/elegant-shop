"use client"

import React, { useMemo } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  size?: "sm" | "md" | "lg"
  interactive?: boolean
  onRatingChange?: (rating: number) => void
  hoveredRating?: number
  onHover?: (rating: number) => void
  onMouseLeave?: () => void
  className?: string
}

const STAR_SIZES = {
  sm: { width: 16, height: 16 },
  md: { width: 20, height: 20 },
  lg: { width: 24, height: 24 },
}

// Memoized array for stars
const STAR_ARRAY = Array.from({ length: 5 })

export const StarRating = React.memo<StarRatingProps>(
  ({
    rating,
    size = "md",
    interactive = false,
    onRatingChange,
    hoveredRating = 0,
    onHover,
    onMouseLeave,
    className,
  }) => {
    const starSize = STAR_SIZES[size]
    const displayRating = hoveredRating > 0 ? hoveredRating : rating

    const stars = useMemo(
      () =>
        STAR_ARRAY.map((_, index) => {
          const starValue = index + 1
          const isSelected = starValue <= displayRating
          const isHovered = hoveredRating > 0 && starValue <= hoveredRating

          return (
            <button
              key={index}
              type={interactive ? "button" : undefined}
              onClick={() => interactive && onRatingChange?.(starValue)}
              onMouseEnter={() => interactive && onHover?.(starValue)}
              disabled={!interactive}
              className={cn(
                interactive &&
                  "hover:scale-110 transition-transform cursor-pointer",
                !interactive && "cursor-default",
                className,
              )}
            >
              <Image
                src="/svg/star.svg"
                alt="star"
                width={starSize.width}
                height={starSize.height}
                className={cn(
                  "transition-all duration-200",
                  isHovered
                    ? "opacity-100"
                    : isSelected
                    ? "opacity-100 brightness-0"
                    : "opacity-30 brightness-0",
                )}
                style={
                  isHovered
                    ? {
                        filter:
                          "brightness(0) saturate(100%) invert(77%) sepia(100%) saturate(2000%) hue-rotate(0deg)",
                      }
                    : isSelected
                    ? {
                        filter: "brightness(0)",
                      }
                    : undefined
                }
              />
            </button>
          )
        }),
      [displayRating, hoveredRating, interactive, onRatingChange, onHover, starSize, className],
    )

    return (
      <div className="flex gap-1" onMouseLeave={onMouseLeave}>
        {stars}
      </div>
    )
  },
)

StarRating.displayName = "StarRating"

