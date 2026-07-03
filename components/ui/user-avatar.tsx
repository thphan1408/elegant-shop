"use client"

import React from "react"
import Image from "next/image"
import { isValidImageUrl } from "@/lib/utils/review-utils"

interface UserAvatarProps {
  avatar?: string | null
  name: string
  size?: number
  className?: string
}

export const UserAvatar = React.memo<UserAvatarProps>(
  ({ avatar, name, size = 48, className }) => {
    const displayName = name || "Anonymous"
    const initials = displayName[0]?.toUpperCase() || "A"
    const isValidAvatar = avatar && isValidImageUrl(avatar)

    if (isValidAvatar) {
      return (
        <div
          className={`rounded-full overflow-hidden ${className || ""}`}
          style={{ width: size, height: size }}
        >
          <Image
            src={avatar}
            alt={displayName}
            width={size}
            height={size}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to initials if image fails to load
              const target = e.target as HTMLImageElement
              target.style.display = "none"
              const parent = target.parentElement
              if (parent) {
                parent.innerHTML = `<div class="w-full h-full rounded-full bg-neutral-02 flex items-center justify-center text-neutral-06 font-medium" style="width: ${size}px; height: ${size}px;">${initials}</div>`
              }
            }}
          />
        </div>
      )
    }

    return (
      <div
        className={`rounded-full bg-neutral-02 flex items-center justify-center text-neutral-06 font-medium ${
          className || ""
        }`}
        style={{ width: size, height: size }}
      >
        {initials}
      </div>
    )
  },
)

UserAvatar.displayName = "UserAvatar"
