"use client"

import React from "react"
import { Command as CommandPrimitive } from "cmdk"

import { cx } from "../../lib"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../dialog"
import { SearchIcon } from "../icons"
import type { CommandMenuDialogClasses } from "./command-menu-classes"

/**
 * Command Menu component that provides a command palette interface.
 * Built on top of cmdk, it offers a searchable command menu with keyboard navigation.
 *
 * @example
 * ```tsx
 * <CommandMenu>
 *   <CommandMenuInput placeholder="Search..." />
 *   <CommandMenuList>
 *     <CommandMenuItem>Item 1</CommandMenuItem>
 *     <CommandMenuItem>Item 2</CommandMenuItem>
 *   </CommandMenuList>
 * </CommandMenu>
 * ```
 *
 * demos:
 * - [CommandMenu](https://bun-ui.com/docs/components/command-menu)
 */
const CommandMenu = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cx(
      "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
      className
    )}
    {...props}
  />
))

/**
 * Props for the CommandMenuDialog component.
 * Extends the Dialog component props and adds command menu specific properties.
 */
export interface CommandMenuDialogProps
  extends React.ComponentProps<typeof Dialog> {
  /**
   * The title of the dialog.
   * This will be displayed at the top of the command menu.
   */
  title?: string

  /**
   * The description of the dialog.
   * This will be displayed below the title to provide additional context.
   */
  description?: string

  /**
   * Props to pass to the CommandMenu component.
   * Use this to customize the behavior of the underlying command menu.
   */
  commandMenuProps?: React.ComponentProps<typeof CommandMenu>

  /**
   * Overrides or extends the styles of different parts of the command menu dialog.
   */
  classes?: CommandMenuDialogClasses
}

/**
 * A dialog component that wraps the CommandMenu.
 * Provides a modal interface for the command menu with title and description.
 *
 * @example
 * ```tsx
 * <CommandMenuDialog title="Search" description="Search through your items">
 *   <CommandMenuInput placeholder="Search..." />
 *   <CommandMenuList>
 *     <CommandMenuItem>Item 1</CommandMenuItem>
 *   </CommandMenuList>
 * </CommandMenuDialog>
 * ```
 */
const CommandMenuDialog = ({
  children,
  title,
  description,
  commandMenuProps,
  classes,
  ...props
}: CommandMenuDialogProps) => (
  <Dialog {...props}>
    <DialogTitle className={classes?.title}>{title}</DialogTitle>
    <DialogDescription className={classes?.description}>
      {description}
    </DialogDescription>
    <DialogContent className={cx("overflow-hidden p-0", classes?.content)}>
      <CommandMenu
        {...commandMenuProps}
        className={cx(
          "[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3",
          classes?.commandMenu,
          commandMenuProps?.className
        )}
      >
        {children}
      </CommandMenu>
    </DialogContent>
  </Dialog>
)

/**
 * Input component for the command menu.
 * Provides a searchable input field with an optional search icon.
 *
 * @example
 * ```tsx
 * <CommandMenuInput placeholder="Search..." />
 * ```
 */
const CommandMenuInput = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cx(
        "placeholder:text-muted-foreground flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))

/**
 * List component that contains the command menu items.
 * Provides scrolling and empty state handling.
 *
 * @example
 * ```tsx
 * <CommandMenuList>
 *   <CommandMenuEmpty>No results found.</CommandMenuEmpty>
 *   <CommandMenuItem>Item 1</CommandMenuItem>
 * </CommandMenuList>
 * ```
 */
const CommandMenuList = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cx("max-h-[300px] overflow-x-hidden overflow-y-auto", className)}
    {...props}
  />
))

/**
 * Empty state component for the command menu.
 * Displayed when no items match the search criteria.
 *
 * @example
 * ```tsx
 * <CommandMenuEmpty>No results found.</CommandMenuEmpty>
 * ```
 */
const CommandMenuEmpty = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
))

/**
 * Group component for organizing command menu items.
 * Provides a heading and groups related items together.
 *
 * @example
 * ```tsx
 * <CommandMenuGroup heading="Actions">
 *   <CommandMenuItem>Item 1</CommandMenuItem>
 *   <CommandMenuItem>Item 2</CommandMenuItem>
 * </CommandMenuGroup>
 * ```
 */
const CommandMenuGroup = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cx(
      "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
      className
    )}
    {...props}
  />
))

/**
 * Individual item component for the command menu.
 * Can be selected and triggered with keyboard or mouse.
 *
 * @example
 * ```tsx
 * <CommandMenuItem onSelect={() => console.log('Selected')}>
 *   Item 1
 * </CommandMenuItem>
 * ```
 */
const CommandMenuItem = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    className={cx(
      "data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground not-data-[selected=true]:[&_svg]:text-muted-foreground relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-current",
      "cursor-pointer disabled:cursor-not-allowed",
      className
    )}
    {...props}
    ref={ref}
  />
))

export {
  CommandMenu,
  CommandMenuDialog,
  CommandMenuInput,
  CommandMenuList,
  CommandMenuEmpty,
  CommandMenuGroup,
  CommandMenuItem,
}
