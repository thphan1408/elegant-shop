import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import "./globals.css"

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
        <body className={`${inter.className} lg:px-40`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            headerr
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
