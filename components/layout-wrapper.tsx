"use client"

import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import Header from "@/components/header"
import { cn } from "@/lib/utils"
import Footer from "@/components/footer"

interface LayoutWrapperProps {
  children: ReactNode
  className?: string
  headerClassName?: string
  contentClassName?: string
}

export default function LayoutWrapper({
  children,
  className,
}: LayoutWrapperProps) {
  const pathname = usePathname()
  const isAuthPage =
    pathname?.startsWith("/sign-") || pathname?.includes("auth")

  if (isAuthPage) {
    // Auth pages: No header/footer, no padding
    return <div className={className}>{children}</div>
  }

  // Regular pages: With header/footer and padding
  return (
    <>
      <div className={cn("px-8 lg:px-40", className)}>
        <Header />
        <div>{children}</div>
      </div>
        <Footer />
    </>
  )
}
