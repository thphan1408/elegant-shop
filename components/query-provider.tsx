"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes - tăng thời gian cache mặc định
            gcTime: 10 * 60 * 1000, // 10 minutes (trước đây là cacheTime)
            refetchOnWindowFocus: false, // Tắt refetch khi focus window
            refetchOnMount: false, // Không refetch khi component mount nếu data còn fresh
            retry: 1, // Giảm số lần retry để tránh spam API
            retryDelay: 1000, // Delay 1s giữa các lần retry
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
