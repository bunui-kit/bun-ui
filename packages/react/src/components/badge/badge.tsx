import React from "react"
import { cva } from "class-variance-authority"

import { cx } from "../../lib"

const badgeVariants = cva(
  "rounded-sm border select-none inline-flex items-center",
  {
    variants: {
      color: {
        primary: "border-primary",
        secondary: "border-secondary",
        accent: "border-accent",
        neutral: "border-foreground/10",
        destructive: "border-destructive",
      },
      variant: {
        filled: "",
        outlined: "",
      },
      size: {
        sm: "text-[0.625rem] px-1 py-0.5",
        md: "text-xs p-1.5 py-0.5",
        lg: "text-sm p-2 py-0.5 ",
      },
    },
    compoundVariants: [
      {
        variant: "outlined",
        color: "primary",
        class: "text-primary",
      },
      {
        variant: "outlined",
        color: "secondary",
        class: "text-secondary",
      },
      {
        variant: "outlined",
        color: "neutral",
        class: "text-foreground",
      },
      {
        variant: "outlined",
        color: "destructive",
        class: "text-destructive",
      },
      {
        variant: "outlined",
        color: "accent",
        class: "text-accent",
      },
      {
        variant: "filled",
        color: "primary",
        class: "text-primary-foreground bg-primary",
      },
      {
        variant: "filled",
        color: "secondary",
        class: "text-secondary-foreground bg-secondary",
      },
      {
        variant: "filled",
        color: "neutral",
        class: "bg-foreground/20 text-foreground",
      },
      {
        variant: "filled",
        color: "destructive",
        class: "text-destructive-foreground bg-destructive",
      },
      {
        variant: "filled",
        color: "accent",
        class: "text-accent-foreground bg-accent",
      },
    ],
    defaultVariants: {
      color: "primary",
      size: "md",
      variant: "filled",
    },
  }
)
interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
  /**
   * Color variant of the badge.
   * @default "primary"
   */
  color?: "primary" | "secondary" | "destructive" | "accent" | "neutral"
  /**
   * Variant of the badge.
   * @default "filled"
   */
  variant?: "filled" | "outlined"
  /**
   * Size of the badge.
   * @default "md"
   */
  size?: "sm" | "md" | "lg"
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { className, color = "primary", size = "md", variant = "filled", ...props },
    ref
  ) => (
    <span
      ref={ref}
      className={cx(badgeVariants({ color, size, variant, className }))}
      {...props}
    />
  )
)

export { Badge, badgeVariants, type BadgeProps }
