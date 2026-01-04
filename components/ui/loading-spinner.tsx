"use client"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  text?: string
  fullWidth?: boolean
}

export function LoadingSpinner({
  size = "md",
  text,
  fullWidth = false,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${
        fullWidth ? "w-full py-12" : "py-8"
      }`}
    >
      <div
        className={`${sizeClasses[size]} border-4 border-neutral-02 border-t-primary-1 rounded-full animate-spin`}
      />
      {text && (
        <p className="text-neutral-04 text-sm font-medium">{text}</p>
      )}
    </div>
  )
}

