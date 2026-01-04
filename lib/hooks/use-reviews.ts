"use client"

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query"
import {
  getReviews,
  getReviewById,
  getReviewCountByUser,
  createOrUpdateReview,
  updateReview,
  deleteReview,
  reactToReview,
  removeReactionFromReview,
  getReviewReactions,
  createReply,
  getReplies,
  updateReply,
  deleteReply,
} from "@/services/review.service"
import type {
  Review,
  CreateReviewData,
  UpdateReviewData,
  ReviewReactionData,
  CreateReplyData,
  UpdateReplyData,
  ReviewListResponse,
  ReviewFilters,
  ReviewReply,
} from "@/types/review"
import { queryKeys } from "@/lib/query-keys"

// Hook để fetch tất cả reviews
export function useReviews(
  filters?: ReviewFilters,
  options?: Omit<
    UseQueryOptions<ReviewListResponse, Error>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: queryKeys.reviews.list(filters),
    queryFn: () => getReviews(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
    ...options,
  })
}

// Hook để fetch reviews by product ID
export function useReviewsByProduct(
  productId: string,
  options?: Omit<
    UseQueryOptions<ReviewListResponse, Error>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: queryKeys.reviews.byProduct(productId),
    queryFn: () => getReviews({ productId }),
    enabled: !!productId,
    staleTime: 2 * 60 * 1000,
    ...options,
  })
}

// Hook để fetch review by ID
export function useReview(
  id: string,
  options?: Omit<UseQueryOptions<Review | null, Error>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: queryKeys.reviews.detail(id),
    queryFn: () => getReviewById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  })
}

// Hook để fetch review count by user
export function useReviewCountByUser(
  userId: string,
  options?: Omit<UseQueryOptions<number, Error>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: queryKeys.reviews.userCount(userId),
    queryFn: () => getReviewCountByUser(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    ...options,
  })
}

// Hook để fetch reactions for a review
export function useReviewReactions(
  reviewId: string,
  options?: Omit<
    UseQueryOptions<
      { likes: number; dislikes: number; helpful: number },
      Error
    >,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: queryKeys.reviews.reactions(reviewId),
    queryFn: () => getReviewReactions(reviewId),
    enabled: !!reviewId,
    staleTime: 1 * 60 * 1000, // 1 minute - reactions change frequently
    ...options,
  })
}

// Hook để fetch replies for a review
export function useReplies(
  reviewId: string,
  options?: Omit<UseQueryOptions<ReviewReply[], Error>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: queryKeys.reviews.replies(reviewId),
    queryFn: () => getReplies(reviewId),
    enabled: !!reviewId,
    staleTime: 2 * 60 * 1000,
    ...options,
  })
}

// Mutation: Create or update review
export function useCreateOrUpdateReview(
  options?: UseMutationOptions<Review, Error, CreateReviewData>,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createOrUpdateReview,
    onSuccess: (data) => {
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.all,
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.byProduct(data.productId),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.detail(data.id),
      })
    },
    ...options,
  })
}

// Mutation: Update review
export function useUpdateReview(
  options?: UseMutationOptions<
    Review,
    Error,
    { id: string; data: UpdateReviewData }
  >,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => updateReview(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.detail(data.id),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.byProduct(data.productId),
      })
    },
    ...options,
  })
}

// Mutation: Delete review
export function useDeleteReview(
  options?: UseMutationOptions<void, Error, string>,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteReview,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.all,
      })
      queryClient.removeQueries({
        queryKey: queryKeys.reviews.detail(id),
      })
    },
    ...options,
  })
}

// Mutation: React to review
export function useReactToReview(
  options?: UseMutationOptions<
    void,
    Error,
    { id: string; data: ReviewReactionData }
  >,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => reactToReview(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.reactions(variables.id),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.detail(variables.id),
      })
    },
    ...options,
  })
}

// Mutation: Remove reaction
export function useRemoveReaction(
  options?: UseMutationOptions<void, Error, string>,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: removeReactionFromReview,
    onSuccess: (_, reviewId) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.reactions(reviewId),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.detail(reviewId),
      })
    },
    ...options,
  })
}

// Mutation: Create reply
export function useCreateReply(
  options?: UseMutationOptions<
    ReviewReply,
    Error,
    { reviewId: string; data: CreateReplyData }
  >,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ reviewId, data }) => createReply(reviewId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.replies(variables.reviewId),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.detail(variables.reviewId),
      })
    },
    ...options,
  })
}

// Mutation: Update reply
export function useUpdateReply(
  options?: UseMutationOptions<
    ReviewReply,
    Error,
    { replyId: string; data: UpdateReplyData }
  >,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ replyId, data }) => updateReply(replyId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.replies(data.reviewId),
      })
    },
    ...options,
  })
}

// Mutation: Delete reply
export function useDeleteReply(
  options?: UseMutationOptions<
    void,
    Error,
    { replyId: string; reviewId: string }
  >,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ replyId }) => deleteReply(replyId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.replies(variables.reviewId),
      })
    },
    ...options,
  })
}
