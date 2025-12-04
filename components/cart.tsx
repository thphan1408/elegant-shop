"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  useCartStore,
  useCartItemsCount,
  useCartSubtotal,
  useCartTotal,
} from "@/store/cart-store"

const Cart = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    incrementQuantity,
    decrementQuantity,
    updateQuantity,
  } = useCartStore()

  const itemsCount = useCartItemsCount()
  const subtotal = useCartSubtotal()
  const total = useCartTotal()

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="w-[92%] md:w-[55%] lg:w-[28%] 2xl:w-[20%] p-0 flex flex-col"
      >
        {/* Sheet header */}
        <SheetHeader className="p-6 pb-0">
          <div className="flex items-center justify-between w-full">
            <SheetTitle className="text-[1.75rem] font-medium leading-8.5 tracking-[-0.0375rem] text-primary-1">
              Cart{itemsCount > 0 && ` (${itemsCount})`}
            </SheetTitle>
            <SheetClose asChild>
              <Button
                variant="ghost"
                className="p-0 w-6 h-6 hover:bg-transparent"
              >
                <Image
                  src="/svg/close.svg"
                  width={24}
                  height={24}
                  alt="Close"
                />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        {/* Sheet content - Scrollable area for cart items */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full px-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Image
                  src="/svg/shopping-bag.svg"
                  width={48}
                  height={48}
                  alt="Empty cart"
                  className="opacity-30 mb-4"
                />
                <p className="text-neutral-04 body-2">Your cart is empty</p>
                <Link
                  href="/shop"
                  className="mt-4 text-primary-1 underline body-2-semi"
                  onClick={closeCart}
                >
                  Continue shopping
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 py-6 border-b border-neutral-03"
                >
                  <div className="flex items-center gap-4 h-24">
                    <div className="bg-neutral-02 w-20 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="mix-blend-darken"
                      />
                    </div>

                    <div className="flex flex-col justify-center items-start shrink-0 gap-2">
                      <div className="flex justify-between items-center w-full gap-4">
                        <p className="text-sm font-semibold leading-5.5">
                          {item.name}
                        </p>
                        <p className="text-sm font-semibold leading-5.5">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex justify-between items-center w-full gap-4">
                        <h4 className="text-xs font-normal leading-5">
                          Color: {item.color}
                        </h4>
                        <Button
                          variant="ghost"
                          className="p-0 w-6 h-6 hover:bg-transparent"
                          onClick={() => removeItem(item.id)}
                        >
                          <Image
                            src="/svg/close.svg"
                            width={24}
                            height={24}
                            alt={`Remove ${item.name}`}
                          />
                        </Button>
                      </div>

                      <div className="flex justify-center items-center gap-3 self-stretch border w-24 h-8 py-3 px-2 border-neutral-04 rounded-lg">
                        <Button
                          variant="ghost"
                          className="p-0 w-4 h-4 hover:bg-transparent"
                          onClick={() => decrementQuantity(item.id)}
                        >
                          <Image
                            src="/svg/minus.svg"
                            width={16}
                            height={16}
                            alt="Decrease quantity"
                          />
                        </Button>

                        <Input
                          type="number"
                          min={1}
                          max={item.stock}
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value)
                            if (!isNaN(value) && value > 0) {
                              updateQuantity(item.id, value)
                            }
                          }}
                          className="w-8 text-center text-xs font-semibold leading-5 text-black/90 border-0 border-b-0 p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />

                        <Button
                          variant="ghost"
                          className="p-0 w-4 h-4 hover:bg-transparent disabled:opacity-30"
                          onClick={() => incrementQuantity(item.id)}
                          disabled={item.quantity >= item.stock}
                        >
                          <Image
                            src="/svg/add.svg"
                            width={16}
                            height={16}
                            alt="Increase quantity"
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </ScrollArea>
        </div>

        {/* Sheet footer */}
        <SheetFooter className="flex flex-col justify-between self-stretch">
          <div className="flex items-center justify-between py-3.25 border-b border-neutral-03">
            <p className="text-neutral-07">Subtotal</p>
            <p className="text-neutral-07">${subtotal.toFixed(2)}</p>
          </div>

          <div className="flex items-center justify-between py-3.25">
            <p className="text-heading-7 text-neutral-07">Total</p>
            <p className="text-heading-7 text-neutral-07">
              ${total.toFixed(2)}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Link
              href="/checkout"
              className="w-full text-center bg-primary-1 text-white text-lg leading-8 font-medium no-underline py-2.5 px-6.5 rounded-[0.375rem] hover:bg-primary-2 transition-colors"
              onClick={closeCart}
            >
              Checkout
            </Link>

            <Link
              href="/cart"
              className="underline text-center"
              onClick={closeCart}
            >
              View Cart
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default Cart
