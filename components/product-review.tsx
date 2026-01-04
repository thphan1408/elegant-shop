"use client"
import React, { useState, useMemo } from "react"
import type { Product } from "@/types"
import { cn } from "@/lib/utils"
import { useReviewsByProduct } from "@/lib/hooks/use-reviews"
import { useFAQs } from "@/lib/hooks/use-faqs"
import { ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"

interface ProductReviewProps {
  product: Product
}

type TabId = "additional-info" | "questions" | "reviews"

interface TabConfig {
  id: TabId
  label: string
  value: string
  component: React.ComponentType<{ product: Product }>
}

// Tab Content Components - Có thể call API trong đây
const AdditionalInfoContent = ({ product }: { product: Product }) => {
  const additionalInfo = [
    { label: "Brand", value: product.brand },
    { label: "Material", value: product.material },
    {
      label: "Weight",
      value: product.weight ? `${product.weight} kg` : undefined,
    },
    { label: "Warranty", value: product.warranty },
    { label: "Measurement", value: product.measurement },
    { label: "Category", value: product.category },
  ].filter((item) => item.value) // Chỉ hiển thị các field có giá trị

  return (
    <div className="space-y-4 sm:space-y-6">
      {additionalInfo.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {additionalInfo.map((info, index) => (
            <div key={index} className="flex flex-col gap-1">
              <span className="text-xs sm:text-sm font-medium text-neutral-07">
                {info.label}
              </span>
              <span className="text-xs sm:text-sm text-neutral-05">
                {info.value}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm sm:text-base text-neutral-04">
          No additional information available.
        </div>
      )}
      {product.tags && product.tags.length > 0 && (
        <div className="flex flex-col gap-2 mt-4 sm:mt-6">
          <span className="text-xs sm:text-sm font-medium text-neutral-07">
            Tags
          </span>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 sm:px-3 py-1 bg-neutral-02 text-neutral-06 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const QuestionsContent = ({ product }: { product: Product }) => {
  const {
    data: faqsResponse,
    isLoading,
    error,
  } = useFAQs({
    category: "GENERAL",
    is_active: true,
    page: 1,
    limit: 100,
  })

  if (isLoading) {
    return (
      <div className="text-xs sm:text-sm text-neutral-04">
        Loading questions...
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-xs sm:text-sm text-red">
        Failed to load questions. Please try again later.
      </div>
    )
  }

  // Xử lý data: có thể là array trực tiếp hoặc object có property data
  const faqs = Array.isArray(faqsResponse)
    ? faqsResponse
    : faqsResponse?.data || []

  if (!faqs || faqs.length === 0) {
    return (
      <div className="text-xs sm:text-sm text-neutral-04">
        No questions available yet.
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="border-b border-neutral-03 pb-4 sm:pb-6 last:border-b-0"
        >
          <div className="flex gap-3 sm:gap-4">
            {/* Question Icon */}
            <div className="shrink-0 mt-0.5">
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-neutral-06">
                <Image
                  src="/svg/question-mark.svg"
                  alt="Question icon"
                  width={24}
                  height={24}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Question & Answer Content */}
            <div className="flex-1 flex flex-col gap-2 sm:gap-3">
              <h4 className="text-sm sm:text-base font-medium text-neutral-07">
                {faq.question}
              </h4>
              <div className="flex gap-2 sm:gap-3">
                <div className="shrink-0 mt-0.5">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-neutral-05 opacity-60">
                    <Image
                      src="/svg/message-circle.svg"
                      alt="Message icon"
                      width={20}
                      height={20}
                      className="w-full h-full"
                    />
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-neutral-05 flex-1">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const ReviewsContent = ({ product }: { product: Product }) => {
  const { data, isLoading, error } = useReviewsByProduct(product.id || "")

  if (isLoading) {
    return (
      <div className="text-xs sm:text-sm text-neutral-04">
        Loading reviews...
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-xs sm:text-sm text-red">
        Failed to load reviews. Please try again later.
      </div>
    )
  }

  if (!data || !data.data || data.data.length === 0) {
    return (
      <div className="text-xs sm:text-sm text-neutral-04">
        No reviews yet. Be the first to review this product!
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-xs sm:text-sm text-neutral-04">
        {data.total} review{data.total !== 1 ? "s" : ""}
      </div>
      {data.data.map((review) => (
        <div
          key={review.id}
          className="border-b border-neutral-03 pb-4 sm:pb-6"
        >
          <div className="flex items-start gap-2 sm:gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
                <div className="text-sm sm:text-base font-medium text-neutral-07">
                  {review.userName || "Anonymous"}
                </div>
                <div className="text-xs sm:text-sm text-neutral-04">
                  {new Date(review.createdAt).toLocaleDateString()}
                </div>
                {review.isVerifiedPurchase && (
                  <span className="text-xs text-green-600 bg-green-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                    Verified Purchase
                  </span>
                )}
              </div>
              <div className="mb-2 text-sm sm:text-base">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
              {review.title && (
                <h4 className="text-sm sm:text-base font-medium text-neutral-07 mb-1">
                  {review.title}
                </h4>
              )}
              <p className="text-xs sm:text-sm text-neutral-05">
                {review.content}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const tabs: TabConfig[] = [
  {
    id: "additional-info",
    label: "Additional Info",
    value: "additional-info",
    component: AdditionalInfoContent,
  },
  {
    id: "questions",
    label: "Questions",
    value: "questions",
    component: QuestionsContent,
  },
  {
    id: "reviews",
    label: "Reviews",
    value: "reviews",
    component: ReviewsContent,
  },
]

const ProductReview = ({ product }: ProductReviewProps) => {
  const [openTab, setOpenTab] = useState<string | null>("reviews")

  // Get reviews count for Reviews tab
  const { data: reviewsData } = useReviewsByProduct(product.id || "", {
    enabled: !!product.id,
  })

  const handleTabClick = (tabValue: string) => {
    // Toggle: nếu click vào tab đang mở thì đóng, nếu không thì mở tab mới
    setOpenTab(openTab === tabValue ? null : tabValue)
  }

  return (
    <section className="py-4 sm:py-6 md:py-9">
      <div className="container mx-auto px-4 sm:px-6 md:px-0">
        {/* Mobile/Tablet: Accordion dọc */}
        <div className="flex flex-col md:hidden gap-0">
          {tabs.map((tab) => {
            const label =
              tab.id === "reviews" && reviewsData?.total
                ? `${tab.label} (${reviewsData.total})`
                : tab.label
            const isOpen = openTab === tab.value
            const ContentComponent = tab.component

            return (
              <div key={tab.id} className="flex flex-col">
                <button
                  onClick={() => handleTabClick(tab.value)}
                  className={cn(
                    "p-0 m-0 text-neutral-04",
                    "text-base sm:text-lg font-normal leading-6 sm:leading-8 tracking-[-0.025rem]",
                    "bg-transparent rounded-none border-0 shadow-none",
                    "hover:text-primary-1 transition-colors",
                    "w-full",
                    "py-3",
                    "border-b border-neutral-03",
                    "flex items-center justify-between",
                    "text-left",
                    isOpen &&
                      "text-primary-1 font-medium border-b-2 border-primary-1",
                  )}
                >
                  <span>{label}</span>
                  <div className="ml-auto">
                    {isOpen ? (
                      <ChevronUp className="size-4 text-primary-1" />
                    ) : (
                      <ChevronDown className="size-4 text-neutral-04" />
                    )}
                  </div>
                </button>
                {isOpen && (
                  <div className="mt-4 sm:mt-6 pb-4 sm:pb-6">
                    <ContentComponent product={product} />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Desktop: Tabs ngang */}
        <div className="hidden md:block">
          <div className="relative">
            <div className="flex w-full gap-20 items-start justify-start border-b border-neutral-03">
              {tabs.map((tab) => {
                const label =
                  tab.id === "reviews" && reviewsData?.total
                    ? `${tab.label} (${reviewsData.total})`
                    : tab.label
                const isOpen = openTab === tab.value

                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.value)}
                    className={cn(
                      "p-0 m-0 text-neutral-04",
                      "text-lg font-normal leading-8 tracking-[-0.025rem]",
                      "bg-transparent rounded-none border-0 shadow-none",
                      "hover:text-primary-1 transition-colors",
                      "relative flex-none",
                      "border-b-2 border-transparent",
                      "-mb-px",
                      isOpen &&
                        "text-primary-1 font-medium border-b-2 border-primary-1",
                    )}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="mt-6">
            {tabs.map((tab) => {
              const isOpen = openTab === tab.value
              const ContentComponent = tab.component

              return (
                isOpen && (
                  <div key={tab.id}>
                    <ContentComponent product={product} />
                  </div>
                )
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductReview
