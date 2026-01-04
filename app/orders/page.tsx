"use client"

import { useIsAuthenticated } from "@/store/auth-store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Image from "next/image"

export default function OrdersPage() {
  const isAuthenticated = useIsAuthenticated()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/sign-in?redirect=/orders")
    }
  }, [isAuthenticated, router])

  // TODO: Fetch orders from API
  const orders: any[] = []

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-0 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-neutral-03 p-8 sm:p-12 text-center">
          <Image
            src="/svg/inbox.svg"
            alt="No orders"
            width={64}
            height={64}
            className="mx-auto mb-4 opacity-50"
          />
          <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
          <p className="text-neutral-05 mb-6">
            You haven't placed any orders yet. Start shopping to see your orders
            here.
          </p>
          <a
            href="/shop"
            className="inline-block bg-primary-1 text-white px-6 py-2 rounded-lg hover:bg-primary-2 transition-colors"
          >
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-sm border border-neutral-03 p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                  <p className="text-sm text-neutral-05">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="border-t border-neutral-03 pt-4">
                <p className="text-lg font-semibold">
                  Total: ${order.total.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

