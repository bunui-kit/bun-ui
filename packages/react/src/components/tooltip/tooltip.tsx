"use client"

import React, { useState } from "react"
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  type FlipOptions,
  type OffsetOptions,
  type Placement,
  type ShiftOptions,
} from "@floating-ui/react"

import { cx } from "../../lib"

interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "content"> {
  /**
   * Tooltip reference element.
   */
  children: React.ReactNode
  /**
   * Classname applied to the tooltip element.
   */
  className?: string
  /**
   * The content of the tooltip.
   **/
  content: React.ReactNode
  /**
   * The delay before the tooltip appears, in milliseconds.
   * @default 500
   **/
  openDelay?: number

  /**
   * The delay before the tooltip disappears, in milliseconds.
   * @default 0
   **/
  closeDelay?: number
  /**
   * The placement of the tooltip.
   * @default "top"
   **/
  placement?: Placement
  /**
   * Whether to show the tooltip on click instead of hover.
   * @default false
   **/
  clickOnly?: boolean
  /**
   * Whether to show the tooltip on focus.
   *
   * @default true
   **/
  focusable?: boolean

  /**
   * The offset of the tooltip from the reference element.
   *
   *
   * [Flip API](https://floating-ui.com/docs/flip)
   *
   * @default 5
   */
  offset?: OffsetOptions

  /**
   * The shift options for the tooltip to keep it within the viewport.
   *
   * [Shift API](https://floating-ui.com/docs/shift)
   **/
  shift?: ShiftOptions

  /**
   * Flip options for the tooltip to keep it within the viewport.
   *
   * [Flip API](https://floating-ui.com/docs/flip)
   */

  flip?: FlipOptions
}

/** A tooltip component that displays additional
 * information when hovering over or focusing on an element.
 * Built on top of Floating UI
 *
 **/
const Tooltip = ({
  content,
  children,
  placement = "top",
  openDelay = 500,
  closeDelay = 0,
  clickOnly = false,
  focusable = true,
  offset: offsetProp = 5,
  shift: shiftProp = { padding: 5 },
  flip: flipProp,
  className,
  ...props
}: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    placement,
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(offsetProp), flip(flipProp), shift(shiftProp)],
    whileElementsMounted: autoUpdate,
  })

  const hover = useHover(context, {
    delay: {
      open: openDelay,
      close: closeDelay,
    },
    enabled: !clickOnly,
  })

  const focus = useFocus(context, {
    enabled: focusable,
  })

  const dismiss = useDismiss(context)
  const role = useRole(context)

  const click = useClick(context, {
    enabled: clickOnly,
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
    click,
  ])

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      <FloatingPortal>
        {isOpen && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className={cx(
              "bg-popover text-popover-foregroundrounded-md z-50 rounded-sm px-1.5 py-1 text-xs shadow-lg",
              className
            )}
            {...getFloatingProps()}
            {...props}
          >
            {content}
          </div>
        )}
      </FloatingPortal>
    </>
  )
}

export { Tooltip, type TooltipProps }
