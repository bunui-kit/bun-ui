import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

import { cx } from "../../lib"
import { ChevronDownIcon } from "../icons"

/**
 * Root component for the Accordion.
 * Provides the context and structure for the accordion items.
 */
const Accordion = AccordionPrimitive.Root
Accordion.displayName = "Accordion"

/**
 * Individual accordion item component.
 * Contains the trigger and content for a single accordion section.
 */
const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cx("border-border outline-ring/50 border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

/**
 * The trigger button that toggles the accordion item's content.
 * Includes a chevron icon that rotates based on the item's state.
 */
const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cx(
        "flex flex-1 items-center justify-between py-4 font-medium underline-offset-2 transition-all disabled:cursor-not-allowed disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        "hover:not-disabled:cursor-pointer hover:not-disabled:underline",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = "AccordionTrigger"

/**
 * The content section of an accordion item.
 * Contains the expandable content that is shown/hidden when the trigger is clicked.
 */
const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm transition-all"
    {...props}
  >
    <div className={cx("pt-0 pb-4", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
