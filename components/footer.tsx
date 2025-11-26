import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

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

const Footer = () => {
  const pathname = usePathname()

  return (
    <div className="bg-primary-1 ">
      <div className="px-8 lg:px-40 ">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between pt-20 pb-8 gap-8 lg:gap-0">
          <div className="flex flex-col lg:flex-row lg:items-center lg:divide-x lg:divide-y-0 divide-[#6C7275] gap-4 lg:gap-0">
            <div className="lg:pr-8 text-center lg:text-left">
              <h1 className="text-heading-8 text-white">
                3legant<span className="text-neutral-04 text-heading-8">.</span>
              </h1>
            </div>

            <div className="lg:pl-8 text-neutral-03 caption-1 text-center lg:text-left pt-4 lg:pt-0">
              <div className="border-t lg:border-t-0 border-[#6C7275] max-w-[50px] lg:max-w-none mx-auto lg:mx-0 mb-4 lg:mb-0"></div>
              <p>Gift & Decoration Store</p>
            </div>
          </div>

          <div>
            <nav>
              <ul className="flex flex-col lg:flex-row gap-4 lg:gap-10 text-center lg:text-left">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "no-underline text-sm leading-6 font-medium text-neutral-01 relative pb-1 transition-colors inline-block hover-underline-animation",
                          isActive
                            ? "text-neutral-01 font-semibold active-underline"
                            : "text-neutral-01 hover:text-primary-1",
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
        </div>

        <div className="flex flex-col-reverse lg:flex-row lg:justify-between border-t border-neutral-06 pt-8 pb-4 gap-6 lg:gap-0">
          <div className="flex flex-col-reverse lg:flex-row lg:items-center gap-4 lg:gap-7 text-center lg:text-left">
            <p className="caption-2 text-neutral-03">
              Copyright © 2023 3legant. All rights reserved
            </p>

            <div className="flex gap-4 items-center justify-center">
              <Link
                href="/privacy-policy"
                className="caption-2-bold text-neutral-01 no-underline"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms-of-use"
                className="caption-2-bold text-neutral-01 no-underline"
              >
                Terms of Use
              </Link>
            </div>
          </div>

          <div className="flex gap-6 justify-center lg:justify-end">
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
                className="filter brightness-0 invert"
              />
            </Link>

            <Link
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/svg/facebook.svg"
                width={24}
                height={24}
                alt="Facebook"
                className="filter brightness-0 invert"
              />
            </Link>

            <Link
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/svg/youtube.svg"
                width={24}
                height={24}
                alt="YouTube"
                className="filter brightness-0 invert"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
