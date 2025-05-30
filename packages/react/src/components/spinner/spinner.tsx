import React from "react"
import { cva, type VariantProps } from "class-variance-authority"

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
    color: "neutral",
  },
})

type SpinnerProps = Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> &
  VariantProps<typeof spinnerVariants> & {
    /**
     * Color of the spinner.
     * @default "info"
     */
    color?: VariantProps<typeof spinnerVariants>["color"]
  }

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size, className, color, ...props }, ref) => (
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

export { Spinner, spinnerVariants }
