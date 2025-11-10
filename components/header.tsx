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
    <div className="relative">
      {/* Mobile Header */}
      <header className="flex md:hidden items-center justify-between py-4">
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
      <header className="hidden md:flex items-center justify-between py-4">
        <div>
          <h1 className="text-heading-8 text-primary-1">
            3legant<span className="text-neutral-04 text-heading-8">.</span>
          </h1>
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
                        "no-underline btn-xs text-neutral-04 relative pb-1 transition-colors inline-block hover-underline-animation",
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

      {/* Desktop Search Overlay */}
      {(isSearchOpen || isSearchClosing) && (
        <div
          className={`hidden md:block absolute top-full left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
            isSearchClosing
              ? "animate-out slide-out-to-top opacity-0"
              : "animate-in slide-in-from-top opacity-100"
          }`}
        >
          <div className="relative w-full mx-auto">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
              <Image
                src="/svg/search.svg"
                width={24}
                height={24}
                alt="Search"
              />
            </div>
            <Input
              placeholder="Search"
              className="w-full pl-12 pr-4 py-3 text-lg border-0 rounded-xl bg-neutral-01 focus:bg-white focus:ring-2 focus:ring-primary-1/20 focus:outline-none shadow-sm transition-all"
              autoFocus
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSearchClose}
                className="text-neutral-04 p-0 hover:bg-transparent"
              >
                <Image
                  src="/svg/close.svg"
                  width={24}
                  height={24}
                  alt="Close"
                />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay Background */}
      {isSearchOpen && (
        <div
          className="hidden md:block fixed inset-0 bg-black/10 z-40"
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
    </div>
  )
}

export default Header
