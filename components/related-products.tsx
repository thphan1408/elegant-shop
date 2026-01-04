"use client"

// components/related-products.tsx (Client Component với React Query)
import { useProductsByCategory } from "@/lib/hooks/use-products"
import { Product } from "@/types/product"
import Image from "next/image"
import Link from "next/link"

export default function RelatedProducts({
  categoryId,
}: {
  categoryId: string
}) {
  // Sử dụng React Query hook - data đã được prefetch từ server
  const {
    data: related = [],
    isLoading,
    error,
  } = useProductsByCategory(categoryId, {
    // Data đã được prefetch, chỉ fetch lại nếu stale
    refetchOnMount: false,
  })

  // Filter out current product nếu cần (có thể thêm prop currentProductId)
  const filtered = related

  if (isLoading) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="border p-4 rounded-lg animate-pulse">
              <div className="w-full h-40 bg-neutral-02 rounded mb-2" />
              <div className="h-4 bg-neutral-02 rounded w-3/4 mb-2" />
              <div className="h-5 bg-neutral-02 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error || filtered.length === 0) {
    return null // Don't show section if no related products
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-4">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.slice(0, 4).map((p: Product) => {
          if (!p.variants || p.variants.length === 0) {
            return null
          }

          return (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="border p-4 rounded-lg hover:shadow-lg transition-shadow"
            >
              <Image
                src={p.variants[0]?.image || "/img/placeholder.png"}
                alt={p.name}
                width={200}
                height={200}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-green-600">
                ${p.variants[0]?.price_sale ?? p.variants[0]?.price}
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
