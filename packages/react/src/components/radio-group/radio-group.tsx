import React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cva } from "class-variance-authority"

import { cx } from "../../lib/utils"
import { CircleIcon } from "../icons"
import { Label } from "../label"

const radioGroupItemVariants = cva(
  "ring-offset-background focus-visible:ring-ring aspect-square h-4 w-4 cursor-pointer rounded-full border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      color: {
        primary:
          "border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        secondary:
          "border-secondary data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground",
        neutral:
          "border-foreground data-[state=checked]:bg-foreground data-[state=checked]:text-background",
      },
    },
    defaultVariants: {
      color: "primary",
    },
  }
)

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  /**
   * Additional CSS classes to apply to the label element.
   * Use this to customize the styling of the label independently from the RadioGroupItem.
   */
  labelClassName?: string

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean
  /**
   * Label for the RadioGroupItem.
   */
  label?: React.ReactNode
  /**
   * Color for the RadioGroupItem.
   *
   * @default "primary"
   */
  color?: "primary" | "secondary" | "neutral"
}

const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(
  (
    {
      className,
      value,
      label,
      labelClassName,
      color = "primary",
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const _id = id || React.useId()
    const Wrapper = label ? "div" : React.Fragment
    const wrapperClassName = label ? "flex items-center space-x-2" : ""
    return (
      <Wrapper {...(label ? { className: wrapperClassName } : {})}>
        <RadioGroupPrimitive.Item
          ref={ref}
          id={_id}
          value={value}
          disabled={disabled}
          {...props}
          className={cx(radioGroupItemVariants({ color, className }))}
        >
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
            <CircleIcon className="h-2.5 w-2.5 fill-current text-current" />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
        {label && (
          <Label
            htmlFor={_id}
            className={cx(
              "cursor-pointer",
              disabled && "cursor-not-allowed",
              labelClassName
            )}
          >
            {label}
          </Label>
        )}
      </Wrapper>
    )
  }
)

RadioGroupItem.displayName = "RadioGroupItem"

const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    {...props}
    className={cx("grid gap-2", className)}
    ref={ref}
  />
))

RadioGroup.displayName = "RadioGroup"

export { RadioGroup, RadioGroupItem }
