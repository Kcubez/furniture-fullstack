import { Link } from "react-router";
import type { MainNavItem } from "@/types";
import { Icons } from "../icons";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "../ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";

interface MainNavigationProps {
  items?: MainNavItem[];
}

export default function MobileNavigation({ items }: MainNavigationProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const query = "(min-width: 1024px)";

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setIsDesktop(event.matches);
    }
    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    return () => result.removeEventListener("change", onChange);
  }, [query]);

  if (isDesktop) {
    return null; // Don't render the mobile navigation on desktop
  }

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="ml-4 size-5">
            <Icons.menu aria-hidden="true" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pl-4">
          <SheetClose asChild>
            <Link to="/" className="flex items-center pt-8">
              <Icons.logo className="mr-2 size-4" />
              <span className="text-sm font-bold">{siteConfig.name}</span>
              <span className="sr-only">Home</span>
            </Link>
          </SheetClose>
          <ScrollArea className="h-[calc(100vh-8rem)] pb-8">
            <Accordion
              type="single"
              collapsible
              className="w-full pt-0 pr-4.5"
              defaultValue="item-1"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>{items?.[0].title}</AccordionTrigger>
                <AccordionContent>
                  {items?.[0].card?.map((item) => (
                    <SheetClose key={item.title} asChild>
                      <Link
                        to={String(item.href)}
                        className="hover:bg-muted text-foreground/70 block px-4 py-2 text-sm"
                      >
                        {item.title}
                      </Link>
                    </SheetClose>
                  ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2"></AccordionItem>
            </Accordion>
            <div className="mt-4 flex flex-col space-y-2">
              {items?.[0].menu?.map((item) => (
                <SheetClose key={item.title} asChild>
                  <Link
                    to={String(item.href)}
                    className="hover:bg-muted py-2 text-sm"
                  >
                    {item.title}
                  </Link>
                </SheetClose>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
