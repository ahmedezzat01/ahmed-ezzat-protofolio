"use client"
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const liquidbuttonVariants = cva(
  "inline-flex items-center transition-colors justify-center cursor-pointer gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-[#b01e28] text-white hover:bg-[#8b1520] hover:scale-105 duration-300 transition shadow-[0_0_15px_rgba(176,30,40,0.4)] hover:shadow-[0_0_25px_rgba(176,30,40,0.6)]",
        destructive: "bg-[#b01e28] text-white hover:bg-[#8b1520] shadow-[0_0_15px_rgba(176,30,40,0.4)]",
        outline: "border-2 border-[#b01e28] text-[#df2531] bg-transparent hover:bg-[#df2531]/10",
        secondary: "bg-[#df2531]/10 text-[#df2531] hover:bg-[#df2531]/20",
        ghost: "text-[#df2531] hover:bg-[#df2531]/10",
        link: "text-[#df2531] underline-offset-4 hover:underline",
        glass: "bg-[#df2531]/8 text-white backdrop-blur-sm border border-[#df2531]/20 hover:bg-[#df2531]/15 hover:border-[#df2531]/40 hover:scale-105 duration-300 transition shadow-[0_4px_30px_rgba(223,37,49,0.15)] hover:shadow-[0_4px_40px_rgba(223,37,49,0.3)]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 text-xs gap-1.5 px-4",
        lg: "h-10 px-6",
        xl: "h-12 px-8",
        xxl: "h-14 px-10",
        icon: "size-9",
      },
    },
    defaultVariants: { variant: "default", size: "xl" },
  }
)

function LiquidButton({ className, variant, size, asChild = false, children, ...props }: React.ComponentProps<"button"> & VariantProps<typeof liquidbuttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp data-slot="button" className={cn(liquidbuttonVariants({ variant, size, className }))} {...props}>
      {children}
    </Comp>
  )
}

export { LiquidButton, liquidbuttonVariants }
