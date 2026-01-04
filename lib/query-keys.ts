// Query keys for React Query - centralized để tránh duplicate và dễ maintain
export const queryKeys = {
  products: {
    all: ["products"] as const,
    lists: () => [...queryKeys.products.all, "list"] as const,
    list: (filters?: Record<string, any>) =>
      [...queryKeys.products.lists(), filters] as const,
    details: () => [...queryKeys.products.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.products.details(), id] as const,
    byCategory: (categoryId: string) =>
      [...queryKeys.products.all, "category", categoryId] as const,
  },
  reviews: {
    all: ["reviews"] as const,
    lists: () => [...queryKeys.reviews.all, "list"] as const,
    list: (filters?: Record<string, any>) =>
      [...queryKeys.reviews.lists(), filters] as const,
    details: () => [...queryKeys.reviews.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.reviews.details(), id] as const,
    byProduct: (productId: string) =>
      [...queryKeys.reviews.all, "product", productId] as const,
    byUser: (userId: string) =>
      [...queryKeys.reviews.all, "user", userId] as const,
    userCount: (userId: string) =>
      [...queryKeys.reviews.byUser(userId), "count"] as const,
    reactions: (id: string) =>
      [...queryKeys.reviews.detail(id), "reactions"] as const,
    replies: (reviewId: string) =>
      [...queryKeys.reviews.detail(reviewId), "replies"] as const,
  },
  faqs: {
    all: ["faqs"] as const,
    lists: () => [...queryKeys.faqs.all, "list"] as const,
    list: (filters?: Record<string, any>) =>
      [...queryKeys.faqs.lists(), filters] as const,
    details: () => [...queryKeys.faqs.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.faqs.details(), id] as const,
    byProduct: (productId: string) =>
      [...queryKeys.faqs.all, "product", productId] as const,
  },
} as const
