import React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva } from "class-variance-authority"

import { cx } from "../../lib"

const avatarVariants = cva(
  "flex  shrink-0 overflow-hidden rounded-full select-none",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-14 w-14",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  /**
   * Size of the avatar.
   * @default "md"
   */
  size?: "sm" | "md" | "lg" | "xl"
}

const Avatar = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cx(
      avatarVariants({
        size,
        className,
      })
    )}
    {...props}
  />
))

const AvatarImage = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cx("aspect-square h-full w-full rounded-full", className)}
    {...props}
  />
))

const AvatarFallback = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cx(
      "bg-muted flex h-full w-full items-center justify-center rounded-full font-semibold",
      className
    )}
    {...props}
  />
))

export { Avatar, AvatarImage, AvatarFallback }
