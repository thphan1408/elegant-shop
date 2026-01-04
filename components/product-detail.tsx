"use client" // Client Component

import { useState, useCallback, useEffect, useMemo, useRef } from "react"
import { useCartStore } from "@/store/cart-store"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import type { Product } from "@/types"
import { useProduct } from "@/lib/hooks/use-products"
import { useParams } from "next/navigation"
import Link from "next/link"
import { cleanupExpiredSales } from "@/services/product.service"
import { useQueryClient } from "@tanstack/react-query"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ProductDetailProps {
  product: Product // Product từ server - fallback nếu React Query chưa có data
}

export default function ProductDetail({
  product: initialProduct,
}: ProductDetailProps) {
  const params = useParams()
  const productId = params?.id as string
  const queryClient = useQueryClient()

  // Sử dụng React Query để lấy product từ cache (đã được prefetch từ server)
  // Nếu cache có data thì dùng, không thì fallback về initialProduct
  const { data: cachedProduct, refetch } = useProduct(productId, {
    initialData: initialProduct, // Sử dụng data từ server làm initial data
    refetchOnMount: false, // Không refetch nếu đã có trong cache
  })

  // Ưu tiên dùng cached product, fallback về initialProduct
  const product = cachedProduct || initialProduct

  const [selectedVariant, setSelectedVariant] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const hasCalledCleanupRef = useRef(false) // Flag to prevent multiple API calls
  const addItem = useCartStore((state) => state.addItem)

  // Helper function to check if image is external URL
  const isExternalUrl = useCallback((url: string) => {
    return url.startsWith("http")
  }, [])

  // Memoize stars array to avoid recreating on every render
  const starsArray = useMemo(() => Array.from({ length: 5 }), [])

  // Memoize category URL to avoid recalculating
  const categoryUrl = useMemo(
    () => `/shop?category=${encodeURIComponent(product.category)}`,
    [product.category],
  )

  // Memoize countdown timer items
  const countdownItems = useMemo(
    () => [
      { value: timeLeft.days, label: "Days" },
      { value: timeLeft.hours, label: "Hours" },
      { value: timeLeft.minutes, label: "Minutes" },
      { value: timeLeft.seconds, label: "Seconds" },
    ],
    [timeLeft],
  )

  // Memoize sale end date to avoid recalculation
  const saleEndDate = useMemo(() => {
    if (!product?.sale_end_date) return null
    const date = new Date(product.sale_end_date)
    return isNaN(date.getTime()) ? null : date
  }, [product?.sale_end_date])

  // Countdown timer - Use sale_end_date from product API
  useEffect(() => {
    if (!saleEndDate) {
      // Reset timer if no sale_end_date
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      hasCalledCleanupRef.current = false // Reset flag when no sale
      return
    }

    // Reset flag when sale_end_date changes
    hasCalledCleanupRef.current = false

    const updateTimer = async () => {
      const now = new Date().getTime()
      const distance = saleEndDate.getTime() - now

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })

        // Call cleanup API when sale expires (only once)
        if (!hasCalledCleanupRef.current) {
          hasCalledCleanupRef.current = true
          try {
            await cleanupExpiredSales()
            // Refetch product data to get updated prices
            await refetch()
            // Also invalidate related queries to update product lists
            queryClient.invalidateQueries({ queryKey: ["products"] })
          } catch (error) {
            // Reset flag on error so it can retry
            hasCalledCleanupRef.current = false
          }
        }
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [saleEndDate, refetch, queryClient])

  // Collect images for selected variant - prioritize selected variant images
  const productImages = useMemo(() => {
    if (!product || !product.variants || product.variants.length === 0) {
      return []
    }

    const currentVariantData = product.variants[selectedVariant]
    const images: string[] = []

    // Priority 1: Add selected variant's main image first
    if (
      currentVariantData?.image &&
      typeof currentVariantData.image === "string"
    ) {
      images.push(currentVariantData.image)
    }

    // Priority 2: Add selected variant's additional images
    if (
      currentVariantData?.images &&
      Array.isArray(currentVariantData.images) &&
      currentVariantData.images.length > 0
    ) {
      const validImages = currentVariantData.images.filter(
        (img) => img && typeof img === "string",
      )
      images.push(...validImages)
    }

    // Priority 3: Add product-level images
    if (
      product.images &&
      Array.isArray(product.images) &&
      product.images.length > 0
    ) {
      const productImages = product.images.filter(
        (img) => img && typeof img === "string",
      )
      images.push(...productImages)
    }

    // Priority 4: Add other variants' images as fallback
    product.variants.forEach((variant, index) => {
      if (index !== selectedVariant) {
        if (variant?.image && typeof variant.image === "string") {
          images.push(variant.image)
        }
        if (
          variant?.images &&
          Array.isArray(variant.images) &&
          variant.images.length > 0
        ) {
          const validImages = variant.images.filter(
            (img) => img && typeof img === "string",
          )
          images.push(...validImages)
        }
      }
    })

    // Remove duplicates while preserving order
    const uniqueImages = Array.from(new Set(images))

    // Fallback: if no images found, use first variant image
    if (uniqueImages.length === 0 && product.variants[0]?.image) {
      return [product.variants[0].image]
    }

    return uniqueImages
  }, [product, selectedVariant])

  // Sync carousel with selected image
  useEffect(() => {
    if (!carouselApi) return
    carouselApi.scrollTo(selectedImageIndex)
  }, [selectedImageIndex, carouselApi])

  // Update selected image when carousel changes - memoized callback
  const handleCarouselSelect = useCallback(() => {
    if (carouselApi) {
      setSelectedImageIndex(carouselApi.selectedScrollSnap())
    }
  }, [carouselApi])

  useEffect(() => {
    if (!carouselApi) return

    carouselApi.on("select", handleCarouselSelect)

    return () => {
      carouselApi.off("select", handleCarouselSelect)
    }
  }, [carouselApi, handleCarouselSelect])

  // Safety check for variants
  if (!product?.variants || product?.variants.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyState
          title="Product Unavailable"
          message="This product currently has no available variants. Please check back later or browse other products."
          icon={
            <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center">
              <Image
                src="/svg/warning-yellow.svg"
                alt="Warning"
                width={32}
                height={32}
              />
            </div>
          }
        />
      </div>
    )
  }

  // Memoize current variant to avoid recalculation
  const currentVariant = useMemo(() => {
    return product?.variants[selectedVariant]
  }, [product?.variants, selectedVariant])

  // Memoize stars evaluation
  const starsEvaluation = useMemo(() => {
    return Math.floor(product?.stars_evaluation || product?.stars_evaluate || 0)
  }, [product?.stars_evaluation, product?.stars_evaluate])

  // Memoize price calculation
  const priceDisplay = useMemo(() => {
    if (!currentVariant) return null
    return {
      salePrice: currentVariant.price_sale,
      originalPrice: currentVariant.price,
      hasSale: !!currentVariant.price_sale,
    }
  }, [currentVariant])

  // Optimize event handlers with useCallback
  const handleAddToCart = useCallback(() => {
    if (!currentVariant || !product?.id) {
      return
    }

    addItem({
      productId: product.id,
      name: product.name,
      color: currentVariant.color,
      colorHex: currentVariant.colorHex,
      price: currentVariant.price_sale ?? currentVariant.price,
      originalPrice: currentVariant.price_sale
        ? currentVariant.price
        : undefined,
      quantity: quantity,
      image: currentVariant.image,
      sku: currentVariant.sku,
      stock: currentVariant.quantity,
    })
  }, [currentVariant, product, quantity, addItem])

  const handleQuantityChange = useCallback(
    (newQuantity: number) => {
      if (
        currentVariant &&
        newQuantity >= 1 &&
        newQuantity <= currentVariant.quantity
      ) {
        setQuantity(newQuantity)
      }
    },
    [currentVariant],
  )

  const handleImageSelect = useCallback((index: number) => {
    setSelectedImageIndex(index)
  }, [])

  // Handle color variant selection
  const handleVariantSelect = useCallback((index: number) => {
    setSelectedVariant(index)
    setSelectedImageIndex(0) // Reset to first image when variant changes
    setQuantity(1) // Reset quantity when variant changes
  }, [])

  // Handle quantity input change
  const handleQuantityInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value)
      if (!isNaN(value) && value > 0) {
        handleQuantityChange(value)
      }
    },
    [handleQuantityChange],
  )

  return (
    <section className="flex flex-col items-start pt-4 md:pt-6 gap-4 md:gap-6 bg-white px-4 md:px-6 lg:px-0">
      <div className="w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={categoryUrl}>{product.category}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="truncate max-w-[200px] md:max-w-none">
                {product.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="w-full flex flex-col lg:flex-row items-start gap-4 md:gap-6 lg:gap-15.75">
        {/* Product Image Gallery */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          {/* Main Image with Carousel */}
          <div className="relative w-full lg:h-full overflow-hidden group">
            {/* Promotional Badges */}
            <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10 flex flex-col gap-2">
              {product.status && product.status !== "NONE" && (
                <div className="px-2.5 py-1 md:px-3 bg-white rounded-lg shadow-sm">
                  <span className="text-[10px] md:text-xs font-semibold uppercase text-neutral-07">
                    {product.status}
                  </span>
                </div>
              )}
              {product.discount && product.discount > 0 && (
                <div className="px-2.5 py-1 md:px-3 bg-green rounded-lg shadow-sm">
                  <span className="text-[10px] md:text-xs font-semibold uppercase text-white">
                    -{product.discount}%
                  </span>
                </div>
              )}
            </div>

            {/* Carousel for Main Image */}
            {productImages.length > 0 ? (
              productImages.length > 1 ? (
                <Carousel setApi={setCarouselApi} className="w-full h-full">
                  <CarouselContent className="h-full">
                    {productImages.map((image, index) => (
                      <CarouselItem key={index} className="h-full">
                        <div className="relative w-full h-full">
                          {isExternalUrl(image) ? (
                            <img
                              src={image}
                              alt={`${product.name} - Image ${index + 1}`}
                              className="w-full h-full object-contain mix-blend-darken"
                              loading={index === 0 ? "eager" : "lazy"}
                            />
                          ) : (
                            <Image
                              src={image}
                              alt={`${product.name} - Image ${index + 1}`}
                              fill
                              className="object-contain"
                              priority={index === 0}
                            />
                          )}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2 md:left-4 bg-white/90 hover:bg-white border-neutral-03 shadow-lg size-8 md:size-10 text-neutral-07 hover:text-primary-1 [&_svg]:text-neutral-07 hover:[&_svg]:text-primary-1 hover:[&_svg]:stroke-primary-1" />
                  <CarouselNext className="right-2 md:right-4 bg-white/90 hover:bg-white border-neutral-03 shadow-lg size-8 md:size-10 text-neutral-07 hover:text-primary-1 [&_svg]:text-neutral-07 hover:[&_svg]:text-primary-1 hover:[&_svg]:stroke-primary-1" />
                </Carousel>
              ) : (
                <div className="relative w-full h-full">
                  {productImages[0] && isExternalUrl(productImages[0]) ? (
                    <img
                      src={productImages[0]}
                      alt={product.name}
                      className="w-full h-full mix-blend-darken"
                    />
                  ) : (
                    productImages[0] && (
                      <Image
                        src={productImages[0]}
                        alt={product.name}
                        fill
                        className="object-contain"
                        priority
                      />
                    )
                  )}
                </div>
              )
            ) : (
              <div className="relative w-full h-full flex items-center justify-center bg-neutral-02">
                <p className="text-neutral-04">No image available</p>
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {productImages.length > 1 && (
            <div className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide">
              {productImages.map((image, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => handleImageSelect(index)}
                  className={`relative shrink-0 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 p-0 overflow-hidden transition-all border ${
                    selectedImageIndex === index
                      ? "border-primary-1 ring"
                      : "border-transparent hover:border-neutral-04"
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  {isExternalUrl(image) ? (
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  )}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-start gap-3 md:gap-4 pb-4 md:pb-6 border-b border-neutral-03">
            <div className="flex items-center gap-2.5">
              <div className="flex justify-center items-start gap-0.5">
                {starsArray.map((_, index) => (
                  <Image
                    key={index}
                    src="/svg/star.svg"
                    alt="star"
                    width={16}
                    height={16}
                    className={
                      index < starsEvaluation ? "opacity-100" : "opacity-30"
                    }
                  />
                ))}
              </div>
              <span className="text-neutral-07 caption-2">
                {product.rating_count || 0} review
                {product.rating_count !== 1 ? "s" : ""}
              </span>
            </div>

            <div>
              <h3 className="text-neutral-07 text-lg md:text-heading-4 font-semibold md:font-normal">
                {product.name}
              </h3>
            </div>

            <div>
              <p className="text-neutral-04 text-sm md:body-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {priceDisplay && (
              <div className="flex items-center gap-3">
                {priceDisplay.hasSale ? (
                  <>
                    <div className="text-neutral-07 headline-6 tracking-[-0.0375rem]">
                      ${priceDisplay.salePrice!.toFixed(2)}
                    </div>
                    <div className="text-neutral-04 headline-7 line-through">
                      ${priceDisplay.originalPrice.toFixed(2)}
                    </div>
                  </>
                ) : (
                  <div className="text-neutral-07 headline-6 tracking-[-0.0375rem]">
                    ${priceDisplay.originalPrice.toFixed(2)}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Countdown Timer - Only show if sale_end_date exists */}
          {saleEndDate && (
            <div className="flex flex-col items-start gap-2 md:gap-3 py-4 md:py-6 border-b border-neutral-03 w-full">
              <div>
                <span className="text-neutral-05 text-sm md:body-2">
                  Offer expires in:
                </span>
              </div>
              <div className="flex items-center gap-2 md:gap-3 w-full justify-start md:justify-start">
                {countdownItems.map(({ value, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <div className="flex items-center justify-center bg-neutral-02 px-3 py-2.5 md:px-4 md:py-3 min-w-[60px] md:min-w-[70px] rounded">
                      <div className="text-neutral-07 text-xl md:text-2xl lg:text-3xl font-bold leading-none">
                        {String(value).padStart(2, "0")}
                      </div>
                    </div>
                    <div className="text-neutral-04 text-xs">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col items-start gap-4 md:gap-6 py-4 md:py-6 w-full">
            <div className="flex flex-col items-start gap-2 w-full">
              <div>
                <h4 className="text-neutral-04 text-sm md:text-base font-semibold leading-6.5">
                  Measurements
                </h4>
              </div>

              <div>
                <p className="text-black text-lg md:text-xl font-normal leading-7 md:leading-8">
                  {product.measurement}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-3 md:gap-4 w-full">
              <div className="flex flex-col items-start gap-2 w-full">
                <div className="flex items-center gap-1">
                  <h4 className="text-neutral-04 text-sm md:text-base font-semibold leading-6.5">
                    Choose Color
                  </h4>

                  <div>
                    <Image
                      src="/svg/direction-right.svg"
                      alt="direction-right"
                      width={20}
                      height={20}
                      className="text-neutral-04 md:w-6 md:h-6"
                    />
                  </div>
                </div>

                <div className="relative w-full">
                  <Select
                    value={String(selectedVariant)}
                    onValueChange={(value) =>
                      handleVariantSelect(Number(value))
                    }
                  >
                    <SelectTrigger className="w-full text-black text-lg md:text-xl font-normal leading-7 md:leading-8 bg-transparent border-0 border-b border-neutral-03 rounded-none pb-2 px-0 pr-8 h-auto shadow-none focus:ring-0 focus:ring-offset-0 focus:border-primary-1 hover:border-primary-1/50 transition-colors [&>svg]:hidden">
                      <SelectValue>
                        {product.variants[selectedVariant]?.color}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {product.variants.map((variant, index) => (
                        <SelectItem
                          key={variant.id || index}
                          value={String(index)}
                        >
                          {variant.color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="absolute right-0 bottom-2 pointer-events-none">
                    <Image
                      src="/svg/direction-right.svg"
                      alt="dropdown arrow"
                      width={20}
                      height={20}
                      className="rotate-90 md:w-6 md:h-6"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-4 flex-wrap">
                {product.variants.map((variant, index) => {
                  const isSelected = index === selectedVariant
                  return (
                    <Button
                      key={variant.id || index}
                      onClick={() => handleVariantSelect(index)}
                      variant="outline"
                      className={`relative shrink-0 w-16 h-16 md:w-18 md:h-18 p-0 rounded-lg overflow-hidden transition-all border-neutral-07 ${
                        isSelected ? "border-primary-1" : "border-neutral-07"
                      }`}
                      aria-label={`Select ${variant.color} color`}
                      title={variant.color}
                    >
                      {variant.image &&
                        (isExternalUrl(variant.image) ? (
                          <img
                            src={variant.image}
                            alt={`${product.name} - ${variant.color}`}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <Image
                            src={variant.image}
                            alt={`${product.name} - ${variant.color}`}
                            fill
                            className="object-cover"
                          />
                        ))}
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Product Quantity, Wishlist, Add to Cart */}
          <div className="flex flex-col items-start gap-3 md:gap-4 py-6 md:py-8 border-b border-neutral-03 w-full">
            <div className="flex flex-col sm:flex-row items-stretch gap-4 md:gap-6 w-full">
              <div className="flex justify-center items-center gap-2.5 bg-[#F5F5F5] rounded-[0.5rem] px-3 md:px-4 py-2.5 md:py-3 shrink-0 w-full sm:w-auto">
                <Button
                  variant="ghost"
                  className="p-0 w-4 h-4 disabled:opacity-30 hover:bg-transparent"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Image
                    src="/svg/minus.svg"
                    width={16}
                    height={16}
                    alt="Decrease quantity"
                    className="text-neutral-07"
                  />
                </Button>

                <Input
                  type="number"
                  min={1}
                  max={currentVariant?.quantity || 1}
                  value={quantity}
                  onChange={handleQuantityInputChange}
                  className="w-8 text-center text-sm font-medium leading-5 text-neutral-07 border-0 border-b-0 p-0 bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none focus:ring-0 focus-visible:ring-0"
                />

                <Button
                  variant="ghost"
                  className="p-0 w-4 h-4 disabled:opacity-30 hover:bg-transparent"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={
                    !currentVariant || quantity >= currentVariant.quantity
                  }
                >
                  <Image
                    src="/svg/add.svg"
                    width={16}
                    height={16}
                    alt="Increase quantity"
                    className="text-neutral-07"
                  />
                </Button>
              </div>
              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="w-full sm:flex-1 flex justify-center items-center gap-2 px-6 md:px-10 py-2.5 hover:bg-transparent border-neutral-07 border rounded-[0.5rem] no-underline h-full min-h-[48px] sm:min-h-0"
              >
                <Image
                  src="/svg/heart.svg"
                  alt="wishlist"
                  width={20}
                  height={20}
                  className="md:w-6 md:h-6"
                />
                <span className="text-neutral-07 text-base md:text-lg font-medium leading-7 md:leading-8 tracking-[-0.025rem]">
                  Wishlist
                </span>
              </Link>
            </div>
            <div className="w-full">
              {/* Add to Cart */}
              <Button
                onClick={handleAddToCart}
                className="w-full bg-neutral-07 text-neutral-01 py-3 md:py-2 px-6 rounded-lg mb-2 hover:bg-neutral-06 transition-colors flex items-center justify-center gap-2 text-sm md:text-base font-medium"
              >
                Add to cart
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 py-4 md:py-6 w-full">
            <div className="flex items-start gap-3 md:gap-4 w-full">
              <span className="text-neutral-04 text-xs font-normal leading-5 min-w-[70px] md:min-w-[80px]">
                SKU
              </span>
              <span className="text-neutral-07 text-xs font-normal leading-5 wrap-break-word">
                {currentVariant?.sku}
              </span>
            </div>

            <div className="flex items-start gap-3 md:gap-4 w-full">
              <span className="text-neutral-04 text-xs font-normal leading-5 min-w-[70px] md:min-w-[80px]">
                Category
              </span>
              <span className="text-neutral-07 text-xs font-normal leading-5 wrap-break-word">
                {product.category}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
