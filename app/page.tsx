import { HeroCarousel } from "@/components/hero-carousel"
import { CategoryCard } from "@/components/category-card"
import {
  carouselImages,
  carouselImagesMobile,
  categories,
  services,
} from "@/lib/data"
import ArrivalsProduct from "@/components/arrivals-product"
import Image from "next/image"
import Link from "next/link"
import Articles from "@/components/articles"
import NewsletterForm from "@/app/newsletter-form"

// 🔄 TODO: When you have backend API, replace imports above with:
// const carouselImages = await fetch('/api/carousel-images').then(r => r.json())
// const categories = await fetch('/api/categories').then(r => r.json())
// And remove "use client" to make this a Server Component for better SEO

export default function Home() {
  return (
    <>
      <section className="mb-10">
        <HeroCarousel
          images={carouselImages}
          imagesMobile={carouselImagesMobile}
        />

        <div className="flex flex-col md:flex-row justify-center gap-4 md:items-center md:justify-between md:gap-6 lg:flex-row lg:items-center lg:justify-between xl:gap-8 2xl:items-center lg:gap-6 2xl:gap-16">
          <div className="md:flex-1 md:max-w-[400px] lg:w-160.75 xl:flex-1 xl:max-w-[500px] 2xl:flex-1 2xl:max-w-[550px]">
            <h1 className="text-neutral-07 text-[2rem] leading-11 font-medium md:text-[2.125rem] md:leading-9.5 xl:text-[3.375rem] xl:leading-14.5 xl:font-semibold 2xl:text-[3rem] 2xl:leading-18 2xl:font-medium">
              Simply Unique<span className="text-neutral-04">/</span>
              <br />
              Simply Better<span className="text-neutral-04">.</span>
            </h1>
          </div>

          <div className="md:flex-1 md:max-w-[350px] xl:flex-1 xl:max-w-[450px] 2xl:flex-none 2xl:w-[500px]">
            <p className="text-neutral-04 caption-1 md:text-sm md:leading-normal xl:text-base xl:leading-relaxed 2xl:text-sm 2xl:leading-relaxed">
              <span className="text-neutral-05 caption-1-semi md:font-semibold xl:font-semibold 2xl:font-semibold">
                3legant
              </span>{" "}
              is a gift & decorations store based in HCMC, Vietnam. Est since
              2019.
            </p>
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-2 lg:grid-rows-2 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </section>

      <ArrivalsProduct />

      <section>
        <div className="grid grid-cols-2 grid-rows-2 gap-x-2 gap-y-6 lg:grid-cols-4 lg:grid-rows-1 lg:gap-6 py-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="px-4 py-8 flex flex-col items-start gap-4 bg-neutral-02 lg:px-8 lg:py-12 "
            >
              <div>
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={48}
                  height={48}
                />
              </div>

              <div className="flex flex-col items-start gap-2">
                <p className="text-neutral-07 text-sm leading-5.5 font-semibold lg:text-xl lg:leading-7 lg:font-medium">
                  {service.title}
                </p>
                <p className="text-neutral-04 text-sm leading-5.5 font-normal lg:leading-6">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="bg-neutral-02 -mx-8 lg:-mx-40 grid grid-cols-1 grid-cols-auto
      lg:grid-cols-2"
      >
        <div>
          <img
            src="/img/banner.png"
            alt="article"
            className="w-full h-full 2xl:min-w-full"
          />
        </div>
        <div className="mx-8 lg:mx-0 lg:pl-18 lg:mr-40 py-35 flex flex-col items-start justify-center gap-6">
          <div className="flex flex-col lg:items-start gap-4">
            <p className="text-blue text-base font-bold leading-4 uppercase">
              SALE UP TO 35% OFF
            </p>
            <p className="text-neutral-07 text-[2.125rem] font-medium leading-9.5 tracking-[-0.0375rem] lg:text-[2.5rem] lg:leading-11 lg:tracking-[-0.025rem]">
              HUNDREDS of New lower prices!
            </p>
            <p className="text-base font-normal leading-6.5 lg:text-xl lg:leading-8">
              It's more affordable than ever to give every room in your home a
              stylish makeover
            </p>
          </div>
          <div>
            <Link
              href={"/#"}
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
      </section>

      <Articles />

      <NewsletterForm />
    </>
  )
}
