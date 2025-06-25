import { cva } from "class-variance-authority"

import { cx } from "../../lib"

const skeletonVariants = cva(
  "animate-pulse bg-primary/20 max-w-content h-[1.2rem]",
  {
    variants: {
      variant: {
        circular: "rounded-full",
        rectangular: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "circular",
    },
  }
)

/**
 * Props for the Skeleton component.
 * Used to create loading placeholders with animated pulse effects.
 */
interface SkeletonProps {
  /**
   * The width of the skeleton element.
   * Can be a CSS value (string) or number (interpreted as pixels).
   */
  width?: string | number

  /**
   * The height of the skeleton element.
   * Can be a CSS value (string) or number (interpreted as pixels).
   */
  height?: string | number

  /**
   * Additional CSS classes to apply to the skeleton element.
   * Use this to customize the styling beyond the built-in variants.
   */
  className?: string

  /**
   * The visual variant of the skeleton.
   * Controls the shape and border radius of the skeleton element.
   *
   * @default "rectangular"
   */
  variant?: "circular" | "rectangular"
}

const Skeleton = ({
  width,
  height,
  className,
  variant = "rectangular",
}: SkeletonProps) => {
  return (
    <div
      className={cx(skeletonVariants({ className, variant }))}
      style={{ width, height }}
    />
  )
}

export { Skeleton, type SkeletonProps }
