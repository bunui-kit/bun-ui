import React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva } from "class-variance-authority"

import { cx } from "../../lib"

const progressVariants = cva(
  "relative h-2 w-full overflow-hidden rounded-full",
  {
    variants: {
      color: {
        primary: "bg-primary/20 [&_div[data-state]]:bg-primary",
        secondary: "bg-secondary/20 [&_div[data-state]]:bg-secondary",
        accent: "bg-accent/20 [&_div[data-state]]:bg-accent",
        neutral: "bg-foreground/20 [&_div[data-state]]:bg-foreground",
      },
    },
    defaultVariants: {
      color: "primary",
    },
  }
)

interface ProgressProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    "color"
  > {
  /**
   * Color of the progress bar.
   * @default "primary"
   */
  color?: "primary" | "secondary" | "accent" | "neutral"
}

const Progress = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, color, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cx(progressVariants({ color, className }))}
    value={value}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full transition-transform"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))

export { Progress, type ProgressProps }
