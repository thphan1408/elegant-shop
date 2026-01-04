"use client"

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query"
import {
  getFAQs,
  getFAQById,
  getFAQsByProduct,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  uploadFAQImage,
  uploadFAQFile,
  deleteFAQFile,
} from "@/services/faq.service"
import type {
  FAQ,
  CreateFAQData,
  UpdateFAQData,
  FAQListResponse,
  FAQFilters,
  UploadImageResponse,
  UploadFileResponse,
} from "@/types/faq"
import { queryKeys } from "@/lib/query-keys"

// Hook để fetch tất cả FAQs
export function useFAQs(
  filters?: FAQFilters,
  options?: Omit<
    UseQueryOptions<FAQListResponse, Error>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: queryKeys.faqs.list(filters),
    queryFn: () => getFAQs(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes - FAQs ít thay đổi
    ...options,
  })
}

// Hook để fetch FAQs by product ID
export function useFAQsByProduct(
  productId: string,
  options?: Omit<UseQueryOptions<FAQ[], Error>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: queryKeys.faqs.byProduct(productId),
    queryFn: () => getFAQsByProduct(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  })
}

// Hook để fetch FAQ by ID
export function useFAQ(
  id: string,
  options?: Omit<UseQueryOptions<FAQ | null, Error>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: queryKeys.faqs.detail(id),
    queryFn: () => getFAQById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  })
}

// Mutation: Create FAQ
export function useCreateFAQ(
  options?: UseMutationOptions<FAQ, Error, CreateFAQData>,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createFAQ,
    onSuccess: (data) => {
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.faqs.all,
      })
      if (data.productId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.faqs.byProduct(data.productId),
        })
      }
      queryClient.invalidateQueries({
        queryKey: queryKeys.faqs.detail(data.id),
      })
    },
    ...options,
  })
}

// Mutation: Update FAQ
export function useUpdateFAQ(
  options?: UseMutationOptions<
    FAQ,
    Error,
    { id: string; data: UpdateFAQData }
  >,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => updateFAQ(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.faqs.detail(data.id),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.faqs.all,
      })
      if (data.productId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.faqs.byProduct(data.productId),
        })
      }
    },
    ...options,
  })
}

// Mutation: Delete FAQ
export function useDeleteFAQ(
  options?: UseMutationOptions<void, Error, string>,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteFAQ,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.faqs.all,
      })
      queryClient.removeQueries({
        queryKey: queryKeys.faqs.detail(id),
      })
    },
    ...options,
  })
}

// Mutation: Upload image
export function useUploadFAQImage(
  options?: UseMutationOptions<
    UploadImageResponse,
    Error,
    File | FormData
  >,
) {
  return useMutation({
    mutationFn: uploadFAQImage,
    ...options,
  })
}

// Mutation: Upload file
export function useUploadFAQFile(
  options?: UseMutationOptions<
    UploadFileResponse,
    Error,
    File | FormData
  >,
) {
  return useMutation({
    mutationFn: uploadFAQFile,
    ...options,
  })
}

// Mutation: Delete file
export function useDeleteFAQFile(
  options?: UseMutationOptions<void, Error, string>,
) {
  return useMutation({
    mutationFn: deleteFAQFile,
    ...options,
  })
}



