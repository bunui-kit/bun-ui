"use client"

import React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"

import { cx } from "../../lib"
import { ChevronRightIcon } from "../icons"

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuSub = DropdownMenuPrimitive.Sub
const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.DropdownMenuItem
    {...props}
    ref={ref}
    className={cx(
      "focus:bg-primary focus:text-primary-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      "hover:not-disabled:cursor-pointer",
      className
    )}
  />
))

export interface DropdownMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> {
  /**
   * If true the menu will not be rendered in a portal.
   *
   */
  disablePortal?: boolean
}

const DropdownMenuContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(({ className, onSelect, disablePortal, ...props }, ref) => {
  let PortalWrapper:
    | typeof React.Fragment
    | typeof DropdownMenuPrimitive.Portal = DropdownMenuPortal
  if (disablePortal) {
    PortalWrapper = React.Fragment
  }
  return (
    <PortalWrapper>
      <DropdownMenuPrimitive.Content
        className={cx(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] origin-[--radix-dropdown-menu-content-transform-origin] overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className
        )}
        ref={ref}
        onSelect={onSelect}
        {...props}
      />
    </PortalWrapper>
  )
})

const DropdownMenuSubTrigger = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cx(
      "data-[highlighted]:data-[state=open]:bg-primary data-[highlighted]:data-[state=open]:text-primary-foreground data-[state=open]:bg-primary/30 flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      "hover:not-disabled:cursor-pointer",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))

export interface DropdownMenuSubContentProps
  extends React.ComponentPropsWithoutRef<
    typeof DropdownMenuPrimitive.SubContent
  > {
  /**
   * If true the menu will not be rendered in a portal.
   *
   */
  disablePortal?: boolean
}

const DropdownMenuSubContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>,
  DropdownMenuSubContentProps
>(({ className, disablePortal, ...props }, ref) => {
  let PortalWrapper:
    | typeof React.Fragment
    | typeof DropdownMenuPrimitive.Portal = DropdownMenuPortal
  if (disablePortal) {
    PortalWrapper = React.Fragment
  }
  return (
    <PortalWrapper>
      <DropdownMenuPrimitive.SubContent
        ref={ref}
        className={cx(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-[--radix-dropdown-menu-content-transform-origin] overflow-hidden rounded-md border p-1 shadow-lg",
          className
        )}
        {...props}
      />
    </PortalWrapper>
  )
})

export {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
}
