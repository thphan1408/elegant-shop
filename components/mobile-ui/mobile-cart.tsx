import { Button } from "@/components/ui/button"
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
import { cartItems } from "@/lib/data"

interface CartProps {
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
}

const Cart = ({ isCartOpen, setIsCartOpen }: CartProps) => {
  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent
        side="right"
        className="w-[92%] md:w-[55%] lg:w-[28%] 2xl:w-[20%] p-0 flex flex-col"
      >
        {/* Sheet header */}
        <SheetHeader className="p-6 pb-0">
          <div className="flex items-center justify-between w-full">
            <SheetTitle className="text-heading-8 text-primary-1">
              Cart
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
            <div className="flex flex-col gap-4 py-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="bg-neutral-02 flex justify-center items-center w-28 h-28 shrink-0">
                    <Image
                      src={item.image}
                      width={100}
                      height={100}
                      alt={item.name}
                      className="mix-blend-darken object-contain w-full h-full"
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <div className="flex justify-between">
                      <p>{item.name}</p>
                      <p>${item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex justify-between items-center mt-2 mb-4">
                      <h4>Color: {item.color}</h4>
                      <Button
                        variant="ghost"
                        className="p-0 w-6 h-6 hover:bg-transparent"
                      >
                        <Image
                          src="/svg/close.svg"
                          width={24}
                          height={24}
                          alt={`Remove ${item.name}`}
                        />
                      </Button>
                    </div>

                    <div className="flex justify-center items-center gap-3 self-stretch border w-20 h-8 py-3 px-2 border-neutral-04 rounded-lg">
                      <Button
                        variant="ghost"
                        className="p-0 w-6 h-6 hover:bg-transparent"
                      >
                        <Image
                          src="/svg/minus.svg"
                          width={24}
                          height={24}
                          alt="Decrease quantity"
                        />
                      </Button>

                      <p>{item.quantity}</p>

                      <Button
                        variant="ghost"
                        className="p-0 w-6 h-6 hover:bg-transparent"
                      >
                        <Image
                          src="/svg/add.svg"
                          width={24}
                          height={24}
                          alt="Increase quantity"
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Sheet footer */}
        <SheetFooter className="p-6 pt-4 flex-col gap-4">
          <div className="flex flex-col justify-center w-full">
            <ul className="space-y-4">
              <li>
                <div className="flex items-center justify-between gap-2 no-underline">
                  <p className="body-2 text-neutral-07">Subtotal</p>
                  <p className="body-2-semi text-neutral-07">$99.00</p>
                </div>
              </li>
              <li>
                <div className="flex items-center justify-between gap-2 no-underline">
                  <p className="text-heading-7 text-neutral-07">Total</p>
                  <p className="text-heading-7 text-neutral-07">$99.00</p>
                </div>
              </li>
            </ul>
          </div>

          <Link
            href="/checkout"
            className="w-full text-center bg-primary-1 text-white text-lg leading-8 font-medium no-underline py-2.5 px-6.5 rounded-[0.375rem] hover:bg-primary-2 transition-colors"
          >
            Checkout
          </Link>

          <Link href="/cart" className="underline text-center">
            View Cart
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default Cart
