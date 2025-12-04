import { create } from "zustand"
import { persist } from "zustand/middleware"

export type CartItem = {
  id: string
  productId: string
  name: string
  color: string
  colorHex?: string
  price: number
  originalPrice?: number
  quantity: number
  image: string
  sku: string
  stock: number // Số lượng tồn kho tối đa
}

type CartState = {
  items: CartItem[]
  isOpen: boolean
}

type CartActions = {
  addItem: (item: Omit<CartItem, "id">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  incrementQuantity: (id: string) => void
  decrementQuantity: (id: string) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
}

type CartStore = CartState & CartActions

// Helper to generate unique cart item id
const generateCartItemId = (productId: string, color: string, sku: string) => {
  return `${productId}-${color}-${sku}`
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const id = generateCartItemId(item.productId, item.color, item.sku)
        const existingItem = get().items.find((i) => i.id === id)

        if (existingItem) {
          // Check stock limit before increasing quantity
          const newQuantity = existingItem.quantity + item.quantity
          const finalQuantity = Math.min(newQuantity, item.stock)

          set((state) => ({
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity: finalQuantity } : i,
            ),
            isOpen: true,
          }))
        } else {
          // Add new item (respect stock limit)
          const finalQuantity = Math.min(item.quantity, item.stock)
          set((state) => ({
            items: [...state.items, { ...item, id, quantity: finalQuantity }],
            isOpen: true,
          }))
        }
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }))
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        const item = get().items.find((i) => i.id === id)
        if (!item) return

        // Giới hạn quantity không vượt quá stock
        const finalQuantity = Math.min(quantity, item.stock)

        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: finalQuantity } : i,
          ),
        }))
      },

      incrementQuantity: (id) => {
        const item = get().items.find((i) => i.id === id)
        if (!item) return

        // Không tăng nếu đã đạt stock limit
        if (item.quantity >= item.stock) return

        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        }))
      },

      decrementQuantity: (id) => {
        const item = get().items.find((i) => i.id === id)
        if (item && item.quantity <= 1) {
          get().removeItem(id)
          return
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
          ),
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "cart-storage", // Key in localStorage
      version: 2, // Tăng version để force clear cart cũ không có stock đúng
      partialize: (state) => ({ items: state.items }), // Only persist items, not isOpen
      migrate: (persistedState: unknown, version: number) => {
        // Clear cart khi upgrade từ version cũ
        if (version < 2) {
          return { items: [] }
        }
        return persistedState as { items: CartItem[] }
      },
    },
  ),
)

// Selectors for computed values
export const useCartItemsCount = () =>
  useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0),
  )

export const useCartSubtotal = () =>
  useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
  )

export const useCartTotal = () =>
  useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
  )
