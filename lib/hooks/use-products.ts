"use client"

import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import {
  getProducts,
  getProductById,
  getProductsByCategory,
} from "@/services/product.service"
import type { Product } from "@/types/product"
import { queryKeys } from "@/lib/query-keys"

// Hook để fetch tất cả products
export function useProducts(
  params?: Record<string, any>,
  options?: Omit<UseQueryOptions<Product[], Error>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: queryKeys.products.list(params),
    queryFn: () => getProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes - products list không thay đổi thường xuyên
    ...options,
  })
}

// Hook để fetch product by ID
export function useProduct(
  id: string,
  options?: Omit<
    UseQueryOptions<Product | null, Error>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => getProductById(id),
    enabled: !!id, // Chỉ fetch khi có id
    staleTime: 10 * 60 * 1000, // 10 minutes - product detail ít thay đổi hơn
    ...options,
  })
}

// Hook để fetch products by category
export function useProductsByCategory(
  categoryId: string,
  options?: Omit<UseQueryOptions<Product[], Error>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: queryKeys.products.byCategory(categoryId),
    queryFn: () => getProductsByCategory(categoryId),
    enabled: !!categoryId, // Chỉ fetch khi có categoryId
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  })
}
