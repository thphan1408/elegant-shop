import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { de } from "zod/locales"

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

interface MobileMenuProps {
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
  pathname: string
}

const MobileMenu = ({
  isMenuOpen,
  setIsMenuOpen,
  pathname,
}: MobileMenuProps) => {
  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-50 bg-white transition-transform duration-600 in-ease-out",
        "flex flex-col justify-between items-center shrink-0",
        "w-[92%] h-screen p-6",
        isMenuOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      {/* Menu Header */}
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-heading-8 text-primary-1">
            3legant<span className="text-neutral-04">.</span>
          </h2>
          <Button
            variant="ghost"
            className="p-0 w-6 h-6"
            onClick={() => setIsMenuOpen(false)}
          >
            <Image src="/svg/close.svg" width={24} height={24} alt="Close" />
          </Button>
        </div>

        <div className="relative w-full">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
            <Image src="/svg/search.svg" width={20} height={20} alt="Search" />
          </div>
          <Input
            placeholder="Search"
            className="w-full pl-12 pr-4 py-3 border border-neutral-04 rounded-lg bg-white focus:border-primary-1 focus:ring-0 focus:outline-none"
          />
        </div>

        {/* Menu Items */}
        <nav className="flex-1 flex flex-col justify-center w-full">
          <ul className="space-y-4">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li
                  key={item.href}
                  className="h-10 border-b border-neutral-03 pb-2"
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "block text-heading-6 transition-colors",
                      isActive
                        ? "text-primary-1 font-semibold"
                        : "text-neutral-04 hover:text-primary-1",
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      {/* Menu Footer */}
      <div className="w-full space-y-4">
        <div className="flex-1 flex flex-col justify-center w-full">
          <ul className="space-y-4">
            <li>
              <Link
                href="/cart"
                className="flex items-center justify-between gap-2 no-underline"
              >
                <p className="text-lg leading-8 font-medium text-neutral-04">
                  Cart
                </p>
                <div className="flex items-center gap-1">
                  <Image
                    src="/svg/shopping-bag.svg"
                    width={24}
                    height={24}
                    alt="Cart"
                  />
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary-1 text-heading-9 text-white">
                    0
                  </span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="/wishlist"
                className="flex items-center justify-between gap-2 no-underline"
              >
                <p className="text-lg leading-8 font-medium text-neutral-04">
                  Wishlist
                </p>
                <div className="flex items-center gap-1">
                  <Image
                    src="/svg/heart.svg"
                    width={24}
                    height={24}
                    alt="User"
                  />
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary-1 text-heading-9 text-white">
                    0
                  </span>
                </div>
              </Link>
            </li>
          </ul>
        </div>

        <Link
          href="/sign-in"
          className="w-full inline-block text-center bg-primary-1 text-white text-lg leading-8 font-medium no-underline py-2.5 px-6.5 rounded-[0.375rem] hover:bg-primary-2 transition-colors"
        >
          Sign In
        </Link>

        <div className="flex items-start gap-6">
          <Link
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/svg/instagram.svg"
              width={24}
              height={24}
              alt="Instagram"
            />
          </Link>

          <Link
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4"
          >
            <Image
              src="/svg/facebook.svg"
              width={24}
              height={24}
              alt="Facebook"
            />
          </Link>

          <Link
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4"
          >
            <Image
              src="/svg/youtube.svg"
              width={24}
              height={24}
              alt="YouTube"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
