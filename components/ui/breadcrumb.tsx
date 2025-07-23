import React, { JSX } from "react";
import Link from "next/link";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils"; // Assuming you have this utility for Tailwind CSS class merging
import { Slot } from "@radix-ui/react-slot";

// --- Type Definitions for better type safety ---
interface BreadcrumbItemProps {
  label: string;
  href?: string;
  isCurrent?: boolean; // To mark the current page
}

interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  items: BreadcrumbItemProps[];
  maxItems?: number; // For responsiveness: how many items to show before truncating on smaller screens
}

// --- Breadcrumb Sub-components (with corrected types and responsive styles) ---

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    // ASOSIY O'ZGARTIRISH: Telefonlarda vertikal (flex-col), katta ekranlarda gorizontal (sm:flex-row)
    // va responsiv gap, matn o'lchami
    className={cn(
      "flex flex-col sm:flex-row", // Mobil: vertikal, Desktop: gorizontal
      "flex-wrap items-start sm:items-center", // items-start vertikalda chapga tekislaydi
      "gap-1.5 sm:gap-2.5", // Mobil: kamroq bo'shliq, Desktop: ko'proq bo'shliq
      "break-words text-xs sm:text-sm text-muted-foreground", // Matn o'lchami responsive
      className
    )}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    // ASOSIY O'ZGARTIRISH: Telefonlarda w-full, katta ekranlarda inline-flex
    // Vertikalda padding, gorizontalda yo'q (gap yordamida)
    className={cn(
      "flex items-center", // Doimiy
      "w-full sm:w-auto", // Mobil: butun kenglik, Desktop: avto kenglik
      "py-0.5 sm:py-0", // Mobil: vertikal padding, Desktop: padding yo'q
      className
    )}
    {...props}
  />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  {
    asChild?: boolean;
  } & React.ComponentPropsWithoutRef<"a">
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link" // A11y uchun link rolini saqlaymiz, lekin disabled
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"li">): JSX.Element => (
  <li
    role="presentation"
    aria-hidden="true"
    // ASOSIY O'ZGARTIRISH: Telefonlarda chap margin, katta ekranlarda normal margin
    // Ikonka hajmi responsive
    className={cn(
      "[&>svg]:w-3 [&>svg]:h-3 sm:[&>svg]:w-3.5 sm:[&>svg]:h-3.5", // Ikonka hajmi
      "ml-1.5 sm:ml-0", // Mobil: chap margin, Desktop: margin yo'q (gap ishlagani uchun)
      className
    )}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">): JSX.Element => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

// --- Main `Breadcrumb` Component (Handles dynamic rendering and responsiveness) ---

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, maxItems = 4, className, ...props }, ref) => {
    // Ellipsis logikasini faqat gorizontal holatda ishlatamiz
    // Telefonlarda ellipsis kerak emas, chunki vertikal bo'ladi
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640; // sm breakpoint
    const showEllipsis = !isMobile && items.length > maxItems; // Faqat desktopda va itemlar ko'p bo'lsa
    const itemsToRender = showEllipsis
      ? [items[0], ...items.slice(items.length - maxItems + 1)] // Birinchi va oxirgi itemlar
      : items;

    return (
      <nav
        ref={ref}
        aria-label="breadcrumb"
        // Umumiy nav elementining paddingi, agar kerak bo'lsa
        className={cn("mb-6 px-4 sm:px-0", className)} // Mobil: px-4, Desktop: paddingni olib tashlash (yoki layoutga qarab berish)
        {...props}
      >
        <BreadcrumbList>
          {itemsToRender.map((item, index) => {
            const isLast = index === itemsToRender.length - 1;
            const isFirst = index === 0;

            // Ellipsisni o'rtaga joylashtirish
            const renderEllipsis =
              showEllipsis && index === 1 && itemsToRender.length > 2;

            return (
              <React.Fragment key={item.label + index}>
                {!isMobile &&
                  !isFirst &&
                  !renderEllipsis && ( // Desktopda separator
                    <BreadcrumbSeparator />
                  )}

                {isMobile &&
                  !isFirst && // Mobil holatda separator
                  // Telefonlarda separator BreadcrumbItem ichida bo'lmasligi kerak
                  // Bu yerda <BreadcrumbSeparator /> ni alohida item sifatida berishimiz kerak
                  // Yoki BreadcrumbItem ichidagi ikonkani qaytarishimiz kerak.
                  // Keling, telefonlarda ham ChevronRight ni BreadcrumbItem ichida saqlaymiz.
                  // Yoki uni Listning o'zida render qilamiz.
                  // Eng yaxshi variant: Listni flex-col qilib, har bir Item ga pastdan margin berish.
                  // Lekin hozirgi rasmdagi vertikalda ikonka har biridan oldin turibdi.
                  // Demak, bu ikonka har doim Item ichida bo'lishi kerak.
                  null // Hozircha bu yerda separator yo'q, pastda qo'shamiz
                }

                {renderEllipsis ? (
                  <BreadcrumbItem>
                    <BreadcrumbEllipsis />
                  </BreadcrumbItem>
                ) : (
                  <BreadcrumbItem>
                    {/* Telefonlarda va desktopda ham separator ikonka item ichida */}
                    {index > 0 &&
                      isMobile && ( // Faqat mobil vertikalda, birinchisidan keyin
                        <ChevronRight className="h-3 w-3 mr-1.5 text-gray-400" />
                      )}
                    {isLast || item.isCurrent ? (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={item.href || "#"}>{item.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                )}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </nav>
    );
  }
);

Breadcrumb.displayName = "Breadcrumb";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
