"use client"

import Image from "next/image"
import { Button } from "./button"

interface ErrorMessageProps {
  title?: string
  message?: string
  onRetry?: () => void
  retryText?: string
}

export function ErrorMessage({
  title = "Something went wrong",
  message = "We couldn't load the content. Please try again.",
  onRetry,
  retryText = "Try Again",
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 px-4">
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
          <Image
            src="/svg/warning-red.svg"
            alt="Warning"
            width={32}
            height={32}
          />
        </div>
        <h3 className="text-lg font-semibold text-neutral-07">{title}</h3>
        <p className="text-sm text-neutral-04 text-center max-w-md">
          {message}
        </p>
      </div>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="mt-2 border-red text-primary-1 hover:bg-primary-1 hover:text-red"
        >
          {retryText}
        </Button>
      )}
    </div>
  )
}
