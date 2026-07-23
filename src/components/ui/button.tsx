import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]",
        outline: "border-border bg-background hover:bg-muted hover:text-foreground dark:bg-transparent dark:hover:bg-input/30",
        ghost: "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50",
        soft: "bg-primary/10 text-primary hover:bg-primary/20",
        danger: "bg-danger text-danger-foreground hover:bg-danger/90",
        success: "bg-success text-success-foreground hover:bg-success/90",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90",
        link: "text-primary underline-offset-4 hover:underline",
        icon: "hover:bg-muted hover:text-foreground", // specific for icon-only button behavior
      },
      size: {
        xs: "h-6 px-2.5 text-xs gap-1 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 px-3 text-xs gap-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        md: "h-9 px-4 gap-2 [&_svg:not([class*='size-'])]:size-4",
        lg: "h-10 px-6 gap-2 text-base [&_svg:not([class*='size-'])]:size-5",
        xl: "h-12 px-8 gap-2.5 text-lg [&_svg:not([class*='size-'])]:size-6",
        icon: "size-9",
      },
      shape: {
        default: "rounded-md",
        square: "rounded-none",
        circle: "rounded-full",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      shape: "default",
    },
  }
)

export interface ButtonProps extends React.ComponentProps<typeof ButtonPrimitive>, VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, ...props }, ref) => {
    return (
      <ButtonPrimitive
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, shape, className }))}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

