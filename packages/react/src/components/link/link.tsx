import React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cx } from "../../lib"

const linkVariants = cva("cursor-pointer underline-offset-2", {
  variants: {
    color: {
      primary: "text-primary decoration-primary/50 hover:decoration-primary",
      secondary:
        "text-secondary decoration-secondary/50 hover:decoration-secondary",
      neutral:
        "text-foreground decoration-foreground/50 hover:decoration-foreground",
      destructive:
        "text-destructive decoration-destructive/50 hover:decoration-destructive",
    },
    underline: {
      always: "underline",
      none: "no-underline",
      hover: "hover:underline",
    },
  },
  defaultVariants: {
    color: "primary",
    underline: "always",
  },
})

interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "color">,
    VariantProps<typeof linkVariants> {
  /**
   * Change the default rendered element for the one passed as a child,
   * merging their props and behavior.
   * @default false
   */
  asChild?: boolean
  /**
   *
   * When the link should have an underline.
   * @default "always"
   */
  underline?: "always" | "none" | "hover"

  /**
   * Color of the link.
   * @default "primary"
   */
  color?: "primary" | "secondary" | "neutral" | "destructive"
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, asChild, underline, color, ...props }, ref) => {
    const Comp = asChild ? Slot : "a"

    return (
      <Comp
        ref={ref}
        className={cx(linkVariants({ underline, color, className }), className)}
        {...props}
      />
    )
  }
)

export { Link, type LinkProps }
