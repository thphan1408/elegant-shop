"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthStore, useUser } from "@/store/auth-store"
import {
  User,
  Settings,
  Lock,
  Package,
  Truck,
  LogOut,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react"
import { logout as logoutApi } from "@/services/auth.service"

type MenuItem = {
  href: string
  label: string
  icon: LucideIcon
}

const PROFILE_ITEMS: MenuItem[] = [
  { href: "/profile", label: "Profile", icon: User },
  { href: "/change-info", label: "Change Info", icon: Settings },
  { href: "/change-password", label: "Change Password", icon: Lock },
]

const ORDER_ITEMS: MenuItem[] = [
  { href: "/orders", label: "My Orders", icon: Package },
  { href: "/shipping", label: "Shipping Address", icon: Truck },
]

export function UserMenu() {
  const router = useRouter()
  const user = useUser()
  const { logout } = useAuthStore()

  const handleLogout = async () => {
    try {
      await logoutApi()
    } catch (error) {
      // Even if API call fails, clear local state
    } finally {
      logout()
      router.push("/")
      router.refresh()
    }
  }

  if (!user) return null

  const isAdmin = user.role === "ADMIN"
  const isModerator = user.role === "MODERATOR"
  const isStaff = isAdmin || isModerator
  const showOrderItems = !isStaff

  const renderMenuItem = (item: MenuItem) => {
    const Icon = item.icon
    return (
      <DropdownMenuItem key={item.href} asChild>
        <Link
          href={item.href}
          className="flex items-center cursor-pointer w-full"
        >
          <Icon className="mr-2 h-4 w-4" />
          <span>{item.label}</span>
        </Link>
      </DropdownMenuItem>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center justify-center hover:opacity-70 transition-opacity"
          aria-label="User menu"
        >
          <Image
            src="/svg/user-circle.svg"
            width={24}
            height={24}
            alt="User"
            className="cursor-pointer"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.name || user.username || "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Profile section */}
        {PROFILE_ITEMS.map(renderMenuItem)}

        {/* Admin Dashboard */}
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard"
                className="flex items-center cursor-pointer w-full"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}

        {/* Orders section - only for regular users */}
        {showOrderItems && (
          <>
            <DropdownMenuSeparator />
            {ORDER_ITEMS.map(renderMenuItem)}
          </>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
