import React from "react"
import * as SelectPrimitives from "@radix-ui/react-select"

import { cx } from "../../lib/utils"
import { CheckIcon, ChevronDownIcon } from "../icons"
import { Label } from "../label"
import type { SelectClasses, SelectItemClasses } from "./select-classes"

/**
 * Props for the Select component.
 */
interface SelectProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitives.Root> {
  /**
   * The placeholder text to show when no value is selected.
   */
  placeholder?: React.ReactNode

  /**
   * Additional CSS class name for the select trigger.
   */
  className?: string

  /**
   * The label for the select input.
   */
  label?: React.ReactNode

  /**
   * The position of the menu relative to the trigger.
   * @default "popper"
   */
  menuPosition?: "item-aligned" | "popper"

  /**
   * Custom render function for the selected value.
   * Useful for complex value displays or when you need to show additional information.
   */
  renderValue?: (value?: string) => React.ReactNode

  /**
   * The value of the select input.
   */
  value?: string

  /**
   * The default value of the select input.
   */
  defaultValue?: string

  /**
   * Callback fired when the value changes.
   */
  onValueChange?: (value: string) => void

  /**
   * Custom classes for styling different parts of the select component.
   */
  classes?: SelectClasses
}

const Select = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitives.Root>,
  SelectProps
>(
  (
    {
      className,
      placeholder,
      children,
      value,
      menuPosition = "popper",
      label,
      renderValue,
      classes,
      ...props
    },
    ref
  ) => {
    const Wrapper = label ? "div" : React.Fragment
    return (
      <Wrapper
        {...(label
          ? {
              className: cx("flex flex-col items-start", classes?.container),
            }
          : {})}
      >
        {label && <Label className={cx("mb-2", classes?.label)}>{label}</Label>}
        <SelectPrimitives.Root value={value} {...props}>
          <SelectPrimitives.Trigger
            ref={ref}
            className={cx(
              "focus:ring-ring bg-background data-[placeholder]:text-muted-foreground border-input ring-offset-background flex h-10 min-w-[130px] cursor-pointer items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              classes?.trigger,
              className
            )}
          >
            {renderValue ? (
              <SelectPrimitives.Value
                className={classes?.value}
                placeholder={placeholder}
              >
                {renderValue(value)}
              </SelectPrimitives.Value>
            ) : (
              <SelectPrimitives.Value
                className={classes?.value}
                placeholder={placeholder}
              />
            )}
            <SelectPrimitives.Icon>
              <ChevronDownIcon className="h-4 w-4" />
            </SelectPrimitives.Icon>
          </SelectPrimitives.Trigger>

          <SelectPrimitives.Portal>
            <SelectPrimitives.Content
              position={menuPosition}
              className={cx(
                "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] origin-[--radix-select-content-transform-origin] overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
                menuPosition === "popper" &&
                  "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
                classes?.content
              )}
            >
              <SelectPrimitives.Viewport
                className={cx(
                  "p-1",
                  menuPosition === "popper" &&
                    "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
                  classes?.viewport
                )}
              >
                {children}
              </SelectPrimitives.Viewport>
            </SelectPrimitives.Content>
          </SelectPrimitives.Portal>
        </SelectPrimitives.Root>
      </Wrapper>
    )
  }
)

export interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitives.Item> {
  classes?: SelectItemClasses
}

const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitives.Item>,
  SelectItemProps
>(({ className, children, value, classes, ...props }, ref) => (
  <SelectPrimitives.Item
    ref={ref}
    className={cx(
      "relative flex w-full cursor-pointer items-center rounded-sm py-1 pr-6 pl-2 text-sm outline-none select-none",
      "data-[highlighted]:bg-primary/20",
      "data-[disabled]:text-muted-foreground data-[disabled]:cursor-not-allowed",
      classes?.root,
      className
    )}
    value={value}
    {...props}
  >
    <SelectPrimitives.ItemText className={classes?.text}>
      {children}
    </SelectPrimitives.ItemText>
    <SelectPrimitives.ItemIndicator
      className={cx(
        "absolute right-1 flex items-center justify-center",
        classes?.indicator
      )}
    >
      <CheckIcon className={cx("h-3 w-3", classes?.icon)} />
    </SelectPrimitives.ItemIndicator>
  </SelectPrimitives.Item>
))

const SelectLabel = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitives.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitives.Label
    ref={ref}
    className={cx("py-1 pl-5 text-sm font-semibold", className)}
    {...props}
  />
))
const SelectGroup = SelectPrimitives.Group

export { Select, SelectItem, type SelectProps, SelectGroup, SelectLabel }
