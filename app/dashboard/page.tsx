"use client"

import { useIsAdmin, useIsAuthenticated } from "@/store/auth-store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const isAuthenticated = useIsAuthenticated()
  const isAdmin = useIsAdmin()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/sign-in?redirect=/dashboard")
    } else if (!isAdmin) {
      router.push("/")
    }
  }, [isAuthenticated, isAdmin, router])

  if (!isAuthenticated || !isAdmin) {
    return null
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-0 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-neutral-03 p-6">
          <h2 className="text-lg font-semibold mb-2">Total Products</h2>
          <p className="text-3xl font-bold text-primary-1">0</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-neutral-03 p-6">
          <h2 className="text-lg font-semibold mb-2">Total Orders</h2>
          <p className="text-3xl font-bold text-primary-1">0</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-neutral-03 p-6">
          <h2 className="text-lg font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold text-primary-1">0</p>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-sm border border-neutral-03 p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 bg-primary-1 text-white rounded-lg hover:bg-primary-2 transition-colors">
            Add Product
          </button>
          <button className="px-4 py-2 bg-primary-1 text-white rounded-lg hover:bg-primary-2 transition-colors">
            View Orders
          </button>
          <button className="px-4 py-2 bg-primary-1 text-white rounded-lg hover:bg-primary-2 transition-colors">
            Manage Users
          </button>
        </div>
      </div>
    </div>
  )
}

