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

        <div className="flex flex-col md:flex-row justify-center gap-4 md:items-center md:justify-between md:gap-6 lg:flex-row lg:items-center lg:justify-between xl:gap-8 2xl:items-center lg:gap-6 2xl:gap-16">
          <div className="md:flex-1 md:max-w-[400px] lg:w-160.75 xl:flex-1 xl:max-w-[500px] 2xl:flex-1 2xl:max-w-[550px]">
            <h1 className="text-neutral-07 headline-4 md:text-heading-5 xl:text-heading-3 2xl:text-[4rem] 2xl:leading-18 2xl:font-medium">
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
          <CategoryCard key={category.title} {...category} />
        ))}
      </section>

      <ArrivalsProduct />
    </>
  )
}
