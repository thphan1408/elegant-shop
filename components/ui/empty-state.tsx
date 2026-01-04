"use client"

import Image from "next/image"

interface EmptyStateProps {
  title?: string
  message?: string
  icon?: React.ReactNode
}

export function EmptyState({
  title = "No items found",
  message = "There are no items to display at the moment.",
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 px-4">
      {icon || (
        <div className="w-16 h-16 rounded-full bg-neutral-02 flex items-center justify-center">
          <Image src="/svg/inbox.svg" alt="Empty" width={32} height={32} />
        </div>
      )}
      <h3 className="text-lg font-semibold text-neutral-07">{title}</h3>
      <p className="text-sm text-neutral-04 text-center max-w-md">{message}</p>
    </div>
  )
}
