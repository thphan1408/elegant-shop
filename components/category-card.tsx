import Image from "next/image"
import Link from "next/link"
import type { Category } from "@/lib/data"

type CategoryCardProps = Category

export function CategoryCard({
  title,
  image,
  imageMobile,
  href,
  position,
  imageClassName = "",
  containerClassName = "",
}: CategoryCardProps) {
  return (
    <div
      className={`bg-neutral-02 relative leading-none overflow-hidden ${containerClassName}`}
    >
      <img
        src={image}
        alt={title}
        className={`hidden md:block lg:block ${imageClassName}`}
      />
      <img
        src={imageMobile}
        alt={title}
        className={`block w-full md:hidden lg:hidden ${imageClassName}`}
      />

      <div
        className={`absolute ${
          position === "top"
            ? "md:top-10 lg:top-12 xl:top-12 top-8"
            : "md:bottom-8 lg:bottom-8 xl:bottom-10 bottom-8"
        } md:left-10 lg:left-8 xl:left-8 left-8 flex flex-col gap-3`}
      >
        <h3 className="text-neutral-07 text-[1.75rem] leading-8.5 font-medium tracking-[-0.0375rem] lg:text-[2.125rem] lg:leading-9.5">
          {title}
        </h3>
        <Link
          href={href}
          className="flex items-center gap-1 text-sm leading-6 font-medium md:text-base md:leading-7 lg:text-base lg:leading-7 xl:text-lg xl:leading-8 no-underline border-b border-neutral-07 w-fit"
        >
          Shop Now
          <Image
            src="/svg/arrow-right.svg"
            alt="Arrow Right"
            width={20}
            height={20}
          />
        </Link>
      </div>
    </div>
  )
}
