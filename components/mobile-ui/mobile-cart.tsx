import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

interface CartProps {
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  pathname: string
}

const Cart = ({ isCartOpen, setIsCartOpen }: CartProps) => {
  return (
    <div
      className={cn(
        "fixed top-0 right-0 z-50 bg-white transition-transform duration-600 in-ease-out",
        "flex flex-col justify-between items-center shrink-0",
        "w-[92%] md:w-[55%] lg:w-[28%] h-screen p-6",
        isCartOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-heading-8 text-primary-1">Cart</h2>
          <Button
            variant="ghost"
            className="p-0 w-6 h-6"
            onClick={() => setIsCartOpen(false)}
          >
            <Image src="/svg/close.svg" width={24} height={24} alt="Close" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <div className="w-73.75 flex gap-4">
          <div className="bg-neutral-02 flex justify-center items-center w-28 h-28">
            <Image
              src="/img/table7.jpg"
              width={100}
              height={100}
              alt="Cart"
              className="mix-blend-darken object-contain w-full h-full"
            />
          </div>

          <div className="flex flex-col w-full">
            <div className="flex justify-between">
              <p>Tray Table</p>
              <p>$50.00</p>
            </div>

            <div className="flex justify-between items-center mt-2 mb-4">
              <h4>Color: Black</h4>
              <Button
                variant={"ghost"}
                className="p-0 w-6 h-6 hover:bg-transparent"
              >
                <Image
                  src="/svg/close.svg"
                  width={24}
                  height={24}
                  alt="Color: Black"
                />
              </Button>
            </div>

            <div className="flex justify-center items-center gap-3 self-stretch border w-20 h-8 py-3 px-2 border-neutral-04 rounded-lg">
              <Button
                variant={"ghost"}
                className="p-0 w-6 h-6 hover:bg-transparent"
              >
                <Image
                  src="/svg/minus.svg"
                  width={24}
                  height={24}
                  alt="Remove Tray Table"
                />
              </Button>

              <p>2</p>

              <Button
                variant={"ghost"}
                className="p-0 w-6 h-6 hover:bg-transparent"
              >
                <Image
                  src="/svg/add.svg"
                  width={24}
                  height={24}
                  alt="Remove Color: Black"
                />
              </Button>
            </div>
          </div>
        </div>

        <div className="w-73.75 flex gap-4">
          <div className="bg-neutral-02 flex justify-center items-center w-28 h-28">
            <Image
              src="/img/table7.jpg"
              width={100}
              height={100}
              alt="Cart"
              className="mix-blend-darken object-contain w-full h-full"
            />
          </div>

          <div className="flex flex-col w-full">
            <div className="flex justify-between">
              <p>Tray Table</p>
              <p>$50.00</p>
            </div>

            <div className="flex justify-between items-center mt-2 mb-4">
              <h4>Color: Black</h4>
              <Button
                variant={"ghost"}
                className="p-0 w-6 h-6 hover:bg-transparent"
              >
                <Image
                  src="/svg/close.svg"
                  width={24}
                  height={24}
                  alt="Color: Black"
                />
              </Button>
            </div>

            <div className="flex justify-center items-center gap-3 self-stretch border w-20 h-8 py-3 px-2 border-neutral-04 rounded-lg">
              <Button
                variant={"ghost"}
                className="p-0 w-6 h-6 hover:bg-transparent"
              >
                <Image
                  src="/svg/minus.svg"
                  width={24}
                  height={24}
                  alt="Remove Tray Table"
                />
              </Button>

              <p>2</p>

              <Button
                variant={"ghost"}
                className="p-0 w-6 h-6 hover:bg-transparent"
              >
                <Image
                  src="/svg/add.svg"
                  width={24}
                  height={24}
                  alt="Remove Color: Black"
                />
              </Button>
            </div>
          </div>
        </div>

        <div className="w-73.75 flex gap-4">
          <div className="bg-neutral-02 flex justify-center items-center w-28 h-28">
            <Image
              src="/img/table7.jpg"
              width={100}
              height={100}
              alt="Cart"
              className="mix-blend-darken object-contain w-full h-full"
            />
          </div>

          <div className="flex flex-col w-full">
            <div className="flex justify-between">
              <p>Tray Table</p>
              <p>$50.00</p>
            </div>

            <div className="flex justify-between items-center mt-2 mb-4">
              <h4>Color: Black</h4>
              <Button
                variant={"ghost"}
                className="p-0 w-6 h-6 hover:bg-transparent"
              >
                <Image
                  src="/svg/close.svg"
                  width={24}
                  height={24}
                  alt="Color: Black"
                />
              </Button>
            </div>

            <div className="flex justify-center items-center gap-3 self-stretch border w-20 h-8 py-3 px-2 border-neutral-04 rounded-lg">
              <Button
                variant={"ghost"}
                className="p-0 w-6 h-6 hover:bg-transparent"
              >
                <Image
                  src="/svg/minus.svg"
                  width={24}
                  height={24}
                  alt="Remove Tray Table"
                />
              </Button>

              <p>2</p>

              <Button
                variant={"ghost"}
                className="p-0 w-6 h-6 hover:bg-transparent"
              >
                <Image
                  src="/svg/add.svg"
                  width={24}
                  height={24}
                  alt="Remove Color: Black"
                />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full justify-end items-center">
        <div className="flex-1 flex flex-col justify-center w-full">
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
          className="w-full text-center bg-primary-1 text-white btn-m no-underline py-2.5 px-6.5 rounded-[0.375rem] hover:bg-primary-2 transition-colors"
        >
          Checkout
        </Link>

        <Link href="/cart" className="underline">
          View Cart
        </Link>
      </div>
    </div>
  )
}

export default Cart
