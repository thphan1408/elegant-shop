import { MockProducts } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const ArrivalsProduct = () => {
  return (
    <section className="flex flex-col items-start gap-12 py-8 lg:py-12">
      <div className="flex items-end justify-between w-full">
        <div>
          <h2 className="lg:text-heading-4 text-primary-1 headline-5">
            New <br /> Arrivals
          </h2>
        </div>

        <div>
          <Link
            href="#"
            className="hidden lg:flex items-center gap-1 no-underline border-b border-neutral-07 w-fit lg:text-base lg:leading-7 lg:font-medium 2xl:text-base 2xl:leading-7 2xl:font-medium"
          >
            More Products
            <Image
              src="/svg/arrow-right.svg"
              alt="arrow-right"
              width={24}
              height={24}
            />
          </Link>
        </div>
      </div>

      <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-custom pb-12">
        <div className="flex items-start gap-6 2xl:gap-8">
          {MockProducts.map((product) => (
            <div
              key={product.id}
              className="lg:w-[calc(25%-1.125rem)] 2xl:w-[calc(25%-1.5rem)] flex flex-col shrink-0 group"
            >
              <Link
                href={`/products/${product.id}`}
                className="relative no-underline"
              >
                <div className="flex flex-col justify-center items-start shrink-0 gap-3">
                  <div className="relative overflow-hidden 2xl:w-full">
                    <img
                      src={product.variants[0].image}
                      alt={product.name}
                      className="w-full h-auto mb-4 mix-blend-darken"
                    />

                    {/* Buttons appear on hover */}
                    <div className="absolute inset-x-0 bottom-4 opacity-100 mx-4 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="w-full bg-neutral-07 text-neutral-01 py-2 px-6 rounded-lg mb-2 hover:bg-neutral-07 transition-colors flex items-center justify-center gap-2 btn-s">
                        Add to cart
                      </button>
                    </div>

                    {/* Wishlist button in top right corner */}
                    <button className="absolute flex justify-center items-center gap-2.5 top-4 right-4 bg-white p-1.5 rounded-full opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-neutral-01">
                      <Image
                        src="/svg/heart-white.svg"
                        alt="wishlist"
                        width={20}
                        height={20}
                        className="brightness-0"
                      />
                    </button>
                  </div>

                  <div className="flex flex-col items-start self-stretch gap-1">
                    <div className="flex justify-center items-start gap-0.5 ">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Image
                          key={index}
                          src="/svg/star.svg"
                          alt="star"
                          width={16}
                          height={16}
                          className={
                            index < Math.floor(product.stars_evaluate)
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        />
                      ))}
                    </div>

                    <h3 className="text-neutral-07 body-2-semi">
                      {product.name}
                    </h3>

                    <div className="flex flex-start items-center gap-3 ">
                      {product.variants[0].price_sale ? (
                        <>
                          <p className="caption-1-semi text-neutral-07">
                            ${product.variants[0].price_sale.toFixed(2)}
                          </p>
                          <p className="text-neutral-04 caption-1 line-through">
                            ${product.variants[0].price.toFixed(2)}
                          </p>
                        </>
                      ) : (
                        <p className="caption-1-semi text-neutral-07">
                          ${product.variants[0].price.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 left-4 inline-flex flex-col items-start gap-1">
                  {product.status && (
                    <div className="flex items-center justify-center py-1 px-3.5 bg-white rounded-lg">
                      <span className="hairline-1 uppercase">
                        {product.status}
                      </span>
                    </div>
                  )}
                  {product.discount && (
                    <div className="flex items-center justify-center py-1 px-3.5 bg-green rounded-lg">
                      <span className="hairline-1 uppercase text-neutral-01">
                        -{product.discount}%
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:hidden">
        <Link
          href="#"
          className="flex items-center gap-1 no-underline border-b border-neutral-07 w-fit text-sm leading-6 font-medium"
        >
          More Products
          <Image
            src="/svg/arrow-right.svg"
            alt="arrow-right"
            width={16}
            height={16}
          />
        </Link>
      </div>
    </section>
  )
}

export default ArrivalsProduct
