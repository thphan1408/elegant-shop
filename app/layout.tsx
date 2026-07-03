import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { QueryProvider } from "@/components/query-provider"
import { Toaster } from "@/components/ui/sonner"
import { Inter } from "next/font/google"
import "./globals.css"
import LayoutWrapper from "@/components/layout-wrapper"

const inter = Inter({ subsets: ["vietnamese"] })
export const metadata: Metadata = {
  title: "3legant.",
  description: "3legant. ecommerce website",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            forcedTheme="light"
            disableTransitionOnChange
          >
            <QueryProvider>
              <LayoutWrapper>{children}</LayoutWrapper>
              <Toaster position="bottom-right" />
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
