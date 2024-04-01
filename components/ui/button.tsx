import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        sidebarLink: "w-full flex justify-start items-center gap-x-2 px-4 py-2.5 rounded-lg text-slate-500 text-sm font-medium transition-all duration-300 hover:bg-slate-100 hover:text-slate-700",
        activeSidebarLink: "w-full flex justify-start items-center gap-x-2 px-4 py-2.5 bg-indigo-100 rounded-lg text-indigo-500 text-sm font-medium relative before:absolute before:w-2 before:h-full before:-right-5 before:bg-indigo-500 before:rounded-full",
        sidebarSubLink: "w-full flex justify-start items-center gap-x-2 pl-4 py-2.5 rounded-lg text-slate-500 text-sm transition-all duration-300 hover:bg-slate-100 hover:text-slate-700",
        activeSidebarSubLink: "w-full flex justify-start items-center gap-x-2 pl-4 py-2.5 bg-slate-100 rounded-lg text-slate-700 text-sm",
        none: ""
      },
      size: {
        default: "",
        sm: "",
        lg: "",
        icon: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
