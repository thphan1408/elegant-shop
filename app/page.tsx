import { HeroCarousel } from "@/components/hero-carousel"
import { CategoryCard } from "@/components/category-card"
import { carouselImages, carouselImagesMobile, categories } from "@/lib/data"
import ArrivalsProduct from "@/components/arrivals-product"

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

        <div className="flex flex-col justify-center gap-4 lg:flex-row lg:items-center lg:justify-between 2xl:items-center lg:gap-6 2xl:gap-16">
          <div className="lg:w-160.75 2xl:flex-1 2xl:max-w-[550px]">
            <h1 className="text-neutral-07 headline-4 2xl:text-[4rem] 2xl:leading-18 2xl:font-medium">
              Simply Unique<span className="text-neutral-04">/</span>
              <br />
              Simply Better<span className="text-neutral-04">.</span>
            </h1>
          </div>

          <div className="2xl:flex-none 2xl:w-[500px]">
            <p className="text-neutral-04 caption-1 2xl:text-sm 2xl:leading-relaxed">
              <span className="text-neutral-05 caption-1-semi 2xl:font-semibold">
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
          <CategoryCard key={category.title} {...category} />
        ))}
      </section>

      <ArrivalsProduct />
    </>
  )
}
