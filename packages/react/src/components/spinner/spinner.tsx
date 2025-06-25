import React from "react"
import { cva } from "class-variance-authority"

import { cx } from "../../lib"
import { LoaderCircleIcon } from "../icons"

const spinnerVariants = cva("inline-flex animate-spin", {
  variants: {
    size: {
      xs: "h-4 w-4 [&_svg]:h-4 [&_svg]:w-4",
      sm: "h-6 w-6 [&_svg]:h-6 [&_svg]:w-6",
      md: "h-8 w-8 [&_svg]:h-8 [&_svg]:w-8",
      lg: "h-10 w-10 [&_svg]:h-10 [&_svg]:w-10",
    },
    color: {
      neutral: "text-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
      destructive: "text-destructive",
      accent: "text-accent",
      current: "text-current",
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
  },
})

interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
  /**
   * Color of the spinner.
   * @default "primary"
   */
  color?:
    | "neutral"
    | "primary"
    | "secondary"
    | "destructive"
    | "accent"
    | "current"

  /**
   * Size of the spinner.
   *
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg"
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size = "md", className, color = "primary", ...props }, ref) => (
    <span
      ref={ref}
      role="progressbar"
      aria-label="Loading"
      className={cx(spinnerVariants({ size, color, className }))}
      {...props}
    >
      <LoaderCircleIcon />
    </span>
  )
)

export { Spinner, type SpinnerProps }
