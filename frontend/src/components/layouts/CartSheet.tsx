import { Button } from "@/components/ui/button";

import { cartItems } from "@/data/cart";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import CartItem from "../carts/CartItem";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Icons } from "../icons";

import { Link } from "react-router";
import { formatPrice } from "@/lib/utils";

export default function CartSheet() {
  const itemCount = 4;
  const amountTotal = 190;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          aria-label="open cart"
        >
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 size-6 justify-center rounded-full p-2.5"
          >
            {itemCount}
          </Badge>
          <Icons.cart className="size-4" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full md:max-w-lg">
        <SheetHeader className="mt-8 gap-0 p-0 text-center">
          <SheetTitle>Cart - {itemCount}</SheetTitle>
        </SheetHeader>
        <Separator />
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="h-[70vh] px-4">
              {cartItems.map((item) => (
                <CartItem cart={item} />
              ))}
            </ScrollArea>
            <div className="px-4">
              <Separator />
              <div className="mt-4 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span>Shipping </span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes </span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span>Total </span>
                  <span>{formatPrice(amountTotal.toFixed(2))}</span>
                </div>
              </div>
            </div>
            <SheetFooter className="pt-0">
              <SheetClose asChild>
                <Button type="submit" asChild>
                  <Link to="/checkout" aria-label="checkout" className="">
                    Continue to Checkout
                  </Link>
                </Button>
              </SheetClose>
            </SheetFooter>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center">
            <Icons.cart className="text-muted-foreground mb-4 size-16" />
            <div className="text-muted-foreground text-xl font-medium">
              Your Cart is empty
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
