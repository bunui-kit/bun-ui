import React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cx } from "../../lib"

const iconButtonVariants = cva(
  "select-none inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer disabled:[&_*]:pointer-events-none",
  {
    variants: {
      color: {
        primary: "text-primary hover:not-disabled:bg-primary/10",
        secondary: "text-secondary hover:not-disabled:bg-secondary/10",
        destructive: "text-destructive hover:not-disabled:bg-destructive/10",
        accent: "text-accent hover:not-disabled:bg-accent/10",
        neutral: "text-foreground hover:not-disabled:bg-foreground/10",
        success: "text-success hover:not-disabled:bg-success/10",
      },
      size: {
        xs: "p-1.5 size-6.5 text-xs [&_svg]:size-[1rem]",
        sm: "p-1.5 size-7 text-xs [&_svg]:size-[1.125rem]",
        md: "p-2 size-8 [&_svg]:size-5",
        lg: "p-2 size-9 text-base [&_svg]:size-5.5",
      },
    },
    defaultVariants: {
      color: "neutral",
      size: "md",
    },
  }
)

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  /**
   * Color of the IconButton.
   */
  color?:
    | "primary"
    | "secondary"
    | "destructive"
    | "accent"
    | "neutral"
    | "success"
  /**
   * Size of the IconButton.
   */
  size?: "xs" | "sm" | "md" | "lg"

  /**
   * If true, the props of the button will be applied to the child element.
   */
  asChild?: boolean
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size = "md", color = "neutral", asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        // This ovverrides the button styles applied by buttonVariants for different sizes.
        // The icon button should be square
        className={cx(iconButtonVariants({ size, color, className }))}
        {...props}
      />
    )
  }
)

export { IconButton }
