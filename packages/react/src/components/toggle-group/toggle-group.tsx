import React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import type { VariantProps } from "class-variance-authority"

import { cx } from "../../lib"
import { toggleVariants } from "../toggle"

type ToggleGroupProps =
  | (Omit<ToggleGroupPrimitive.ToggleGroupSingleProps, "type"> & {
      type?: "single"
    })
  | (Omit<ToggleGroupPrimitive.ToggleGroupMultipleProps, "type"> & {
      type: "multiple"
    })

const ToggleGroup = React.forwardRef<
  React.ComponentRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupProps & VariantProps<typeof toggleVariants>
>(({ className, children, size, type = "single", ...props }, ref) => {
  const getChildren = () => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const element = child as React.ReactElement<
          VariantProps<typeof toggleVariants> & { className?: string }
        >
        return React.cloneElement(element, {
          size: element.props.size ?? size,
        })
      }
      return child
    })
  }

  if (type === "single") {
    return (
      <ToggleGroupPrimitive.Root
        ref={ref}
        className={cx("flex items-center justify-center gap-1", className)}
        {...(props as ToggleGroupPrimitive.ToggleGroupSingleProps)}
        type="single"
      >
        {getChildren()}
      </ToggleGroupPrimitive.Root>
    )
  }
  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cx("flex items-center justify-center gap-1", className)}
      {...(props as ToggleGroupPrimitive.ToggleGroupMultipleProps)}
      type="multiple"
    >
      {getChildren()}
    </ToggleGroupPrimitive.Root>
  )
})

interface ToggleGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>,
    VariantProps<typeof toggleVariants> {}

const ToggleGroupItem = React.forwardRef<
  React.ComponentRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(({ className, size, ...props }, ref) => {
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cx(toggleVariants({ className, size }))}
      {...props}
    />
  )
})

export { ToggleGroup, ToggleGroupItem }
