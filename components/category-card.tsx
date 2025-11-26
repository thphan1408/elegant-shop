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
        className={`hidden lg:block ${imageClassName}`}
      />
      <img
        src={imageMobile}
        alt={title}
        className={`block w-full lg:hidden ${imageClassName}`}
      />

      <div
        className={`absolute ${
          position === "top" ? "lg:top-12 top-8" : "bottom-8"
        } lg:left-12 left-8 flex flex-col gap-3`}
      >
        <h3 className="lg:headline-5 headline-6 text-neutral-07">{title}</h3>
        <Link
          href={href}
          className="flex items-center gap-1 text-sm leading-6 font-medium lg:text-base lg:leading-7 no-underline border-b border-neutral-07 w-fit"
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
