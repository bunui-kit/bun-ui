"use client"

import React from "react"
import * as SelectPrimitives from "@radix-ui/react-select"

import { cx } from "../../lib/utils"
import { CheckIcon, ChevronDownIcon } from "../icons"
import { Label } from "../label"

interface SelectProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitives.Root> {
  placeholder?: React.ReactNode
  className?: string
  /**
   * The label for the select input.
   **/
  label?: React.ReactNode
  /**
   * The position of the menu. Default is "popper".
   **/
  menuPosition?: "item-aligned" | "popper"

  /**
   * Render the selected value.
   **/
  renderValue?: (value?: string) => React.ReactNode
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
      ...props
    },
    ref
  ) => (
    <div className="flex w-full flex-col gap-2">
      {label && <Label>{label}</Label>}
      <SelectPrimitives.Root value={value} {...props}>
        <SelectPrimitives.Trigger
          ref={ref}
          className={cx(
            "focus:ring-ring bg-background data-[placeholder]:text-muted-foreground border-input ring-offset-background flex h-10 w-full cursor-pointer items-center justify-between rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        >
          {renderValue ? (
            <SelectPrimitives.Value placeholder={placeholder}>
              {renderValue(value)}
            </SelectPrimitives.Value>
          ) : (
            <SelectPrimitives.Value placeholder={placeholder} />
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
                "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
            )}
          >
            <SelectPrimitives.Viewport
              className={cx(
                "p-1",
                menuPosition === "popper" &&
                  "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
              )}
            >
              {children}
            </SelectPrimitives.Viewport>
          </SelectPrimitives.Content>
        </SelectPrimitives.Portal>
      </SelectPrimitives.Root>
    </div>
  )
)

export interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitives.Item> {
  selectItemTextClassName?: string
}

const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitives.Item>,
  SelectItemProps
>(({ className, children, value, selectItemTextClassName, ...props }, ref) => (
  <SelectPrimitives.Item
    ref={ref}
    className={cx(
      "data-[highlighted]:bg-primary/20 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground relative flex w-full cursor-pointer items-center rounded-sm py-1 pr-6 pl-2 text-sm outline-none select-none",
      "data-[disabled]:text-muted-foreground data-[disabled]:cursor-not-allowed",
      className
    )}
    value={value}
    {...props}
  >
    <SelectPrimitives.ItemText className={cx(selectItemTextClassName)}>
      {children}
    </SelectPrimitives.ItemText>
    <SelectPrimitives.ItemIndicator className="absolute right-1 flex items-center justify-center">
      <CheckIcon className="h-3 w-3" />
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
