import {
  getProductById,
  getProductsByCategory,
} from "@/services/product.service"
import ProductDetail from "@/components/product-detail"
import RelatedProducts from "@/components/related-products"
import { notFound } from "next/navigation"
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query"
import { queryKeys } from "@/lib/query-keys"
import ProductReview from "@/components/product-review"
import NewsletterForm from "@/app/newsletter-form"

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  try {
    // Prefetch product data và hydrate vào React Query cache
    const queryClient = new QueryClient()

    const product = await getProductById(id)
    if (!product) {
      notFound()
    }

    // Prefetch product vào cache để client component có thể sử dụng ngay
    await queryClient.prefetchQuery({
      queryKey: queryKeys.products.detail(id),
      queryFn: () => Promise.resolve(product),
      staleTime: 10 * 60 * 1000,
    })

    // Prefetch related products (chạy song song để tối ưu)
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: queryKeys.products.byCategory(product.category),
        queryFn: () => getProductsByCategory(product.category),
        staleTime: 5 * 60 * 1000,
      }),
    ])

    const dehydratedState = dehydrate(queryClient)

    return (
      <HydrationBoundary state={dehydratedState}>
        <ProductDetail product={product} />
        <ProductReview product={product} />
        <RelatedProducts categoryId={product.category} />
        <NewsletterForm/>
      </HydrationBoundary>
    )
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-neutral-07">
            Error loading product
          </h2>
          <p className="text-sm text-neutral-04 text-center max-w-md">
            We couldn't load this product. Please try again later or go back to
            browse other products.
          </p>
          <a
            href="/"
            className="mt-4 px-6 py-2 bg-primary-1 text-white rounded-lg hover:bg-primary-2 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    )
  }
}
