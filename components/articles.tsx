import { Button } from "@/components/ui/button"
import { articles, MockProducts } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const Articles = () => {
  return (
    <section className="flex flex-col items-start gap-12 py-10 lg:py-20">
      <div className="flex items-end justify-between w-full">
        <div>
          <h2 className="text-primary-1 text-[2.125rem] leading-9.5 font-medium tracking-[-0.0375rem] lg:text-[2.5rem] lg:leading-11 lg:tracking-[-0.025rem]">
            Articles
          </h2>
        </div>

        <div>
          <Link
            href="#"
            className="flex items-center gap-1 no-underline border-b border-neutral-07 w-fit lg:text-base lg:leading-7 lg:font-medium 2xl:text-base 2xl:leading-7 2xl:font-medium"
          >
            More Articles
            <Image
              src="/svg/arrow-right.svg"
              alt="arrow-right"
              width={24}
              height={24}
            />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 2xl:gap-8 w-full">
        {articles.map((article) => (
          <div key={article.id} className="flex flex-col shrink-0">
            <div className="flex flex-col justify-center items-start shrink-0 gap-3">
              <div className="overflow-hidden w-full 2xl:w-full">
                <img
                  src={article.img}
                  alt={article.title}
                  className="w-full h-full mb-4 mix-blend-darken"
                />
              </div>

              <div className="flex flex-col items-start self-stretch gap-1">
                <h3 className="text-neutral-07 body-2-semi">{article.title}</h3>
              </div>
              <Link
                href={`${article.url}`}
                className="flex items-center gap-1 no-underline border-b border-neutral-07 w-fit lg:text-base lg:leading-7 lg:font-medium 2xl:text-base 2xl:leading-7 2xl:font-medium"
              >
                Read More
                <Image
                  src="/svg/arrow-right.svg"
                  alt="arrow-right"
                  width={24}
                  height={24}
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Articles
