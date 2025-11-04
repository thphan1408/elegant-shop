import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full body-2 text-neutral-04 file:text-foreground placeholder:text-neutral-04 selection:bg-primary selection:text-primary-foreground bg-transparent border-0 border-b border-neutral-03 min-w-0 px-0 pb-2 leading-normal shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0",
        "aria-invalid:border-destructive aria-invalid:ring-0",
        className
      )}
      {...props}
    />
  )
}

export { Input }
