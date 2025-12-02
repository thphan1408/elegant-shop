"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import React, { useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import MobileMenu from "@/components/mobile-ui/mobile-menu"
import Cart from "@/components/mobile-ui/mobile-cart"

const menuItems = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/shop",
    label: "Shop",
  },
  {
    href: "/blog",
    label: "Blog",
  },
  {
    href: "/contact",
    label: "Contact Us",
  },
]

const Header = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isSearchClosing, setIsSearchClosing] = useState(false)

  // Handle Escape key to close search
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        handleSearchClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isSearchOpen])

  // Handle search close with animation
  const handleSearchClose = () => {
    setIsSearchClosing(true)
    setTimeout(() => {
      setIsSearchOpen(false)
      setIsSearchClosing(false)
    }, 300) // Match animation duration
  }

  return (
    <>
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-neutral-01 flex md:hidden items-center justify-between py-4 px-8">
        <div className="flex items-center gap-1">
          <Button
            variant={"ghost"}
            className="hover:bg-transparent p-0 w-6 h-6"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Image
              src="/svg/menu-line-horizontal.svg"
              width={24}
              height={24}
              alt="Menu"
            />
          </Button>
          <h1 className="text-heading-10 text-primary-1">
            <Link href="/" className="no-underline">
              3legant<span className="text-neutral-04 text-heading-10">.</span>
            </Link>
          </h1>
        </div>

        <div className="">
          <Button
            variant={"ghost"}
            className="hover:bg-transparent p-0 flex items-center gap-1"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <Image
              src="/svg/shopping-bag.svg"
              width={24}
              height={24}
              alt="Cart"
            />
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary-1 text-heading-9 text-white">
              0
            </span>
          </Button>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="sticky top-0 z-50 bg-neutral-01 hidden md:flex items-center justify-between py-4 px-8 lg:px-40">
        <div>
          <Link href="/" className="no-underline">
            <h1 className="text-heading-8 text-primary-1">
              3legant<span className="text-neutral-04 text-heading-8">.</span>
            </h1>
          </Link>
        </div>

        <div>
          <nav>
            <ul className="flex gap-10">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "no-underline text-sm leading-6 font-medium text-neutral-04 relative pb-1 transition-colors inline-block hover-underline-animation",
                        isActive
                          ? "text-primary-1 font-semibold active-underline"
                          : "text-neutral-04 hover:text-primary-1",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
        <div>
          <ul className="flex gap-4 justify-end items-center">
            <li>
              <Button
                variant={"ghost"}
                className="hover:bg-transparent p-0"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Image
                  src={isSearchOpen ? "/svg/close.svg" : "/svg/search.svg"}
                  width={24}
                  height={24}
                  alt={isSearchOpen ? "Close" : "Search"}
                />
              </Button>
            </li>
            <li>
              <Link href="/sign-in">
                <Image
                  src="/svg/user-circle.svg"
                  width={24}
                  height={24}
                  alt="User"
                />
              </Link>
            </li>
            <li className="flex items-center gap-1">
              <Button
                variant={"ghost"}
                className="hover:bg-transparent p-0"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <Image
                  src="/svg/shopping-bag.svg"
                  width={24}
                  height={24}
                  alt="Cart"
                />
              </Button>
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary-1 text-heading-9 text-white">
                0
              </span>
            </li>
          </ul>
        </div>
      </header>

      {/* Desktop Search Overlay - Floating Card Style */}
      {(isSearchOpen || isSearchClosing) && (
        <div
          className={`hidden md:block fixed top-20 left-0 right-0 z-50 w-full max-w-2xl mx-auto px-4 ${
            isSearchClosing ? "animate-search-out" : "animate-search-in"
          }`}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-neutral-02 overflow-hidden backdrop-blur-sm">
            {/* Search Input Section */}
            <div className="relative p-6">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                  <Image
                    src="/svg/search.svg"
                    width={20}
                    height={20}
                    alt="Search"
                    className="text-neutral-04"
                  />
                </div>
                <Input
                  placeholder="Search products, categories..."
                  className="w-full pl-12 pr-12 py-4 text-lg border-0 bg-neutral-01 focus:bg-white focus:ring-2 focus:ring-primary-1/10 focus:outline-none transition-all rounded-xl"
                  autoFocus
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSearchClose}
                    className="text-neutral-04 hover:text-primary-1 p-1 hover:bg-neutral-01 rounded-lg transition-colors"
                  >
                    <Image
                      src="/svg/close.svg"
                      width={16}
                      height={16}
                      alt="Close"
                    />
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Suggestions */}
            <div className="border-t border-neutral-02 p-4">
              <p className="text-sm text-neutral-04 mb-3 font-medium">
                Popular searches
              </p>
              <div className="flex flex-wrap gap-2">
                {["Furniture", "Decoration", "Lighting", "Storage"].map(
                  (term) => (
                    <Button
                      key={term}
                      variant="ghost"
                      className="px-3 py-1.5 text-sm bg-neutral-01 hover:bg-neutral-02 text-neutral-04 rounded-lg transition-colors"
                    >
                      {term}
                    </Button>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay Background */}
      {isSearchOpen && (
        <div
          className="hidden md:block fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={handleSearchClose}
        />
      )}

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      <MobileMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        pathname={pathname}
      />

      <Cart
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        pathname={pathname}
      />
    </>
  )
}

export default Header
