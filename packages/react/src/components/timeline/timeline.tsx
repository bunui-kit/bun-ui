import React from "react"

import { cx } from "../../lib"

const Timeline = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul className={cx("p-2", className)} ref={ref} {...props} />
))

const TimelineItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    className={cx("flex min-h-[50px] gap-x-2", className)}
    ref={ref}
    {...props}
  />
))

const TimelineSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cx("flex flex-col items-center", className)}
    ref={ref}
    {...props}
  />
))

const TimelineIndicator = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    className={cx(
      "bg-foreground/20 min-h-4 min-w-4 shrink-0 grow-0 rounded-full p-2",
      className
    )}
    ref={ref}
    {...props}
  />
))

const TimelineConnector = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    className={cx("bg-border h-full w-[2px]", className)}
    ref={ref}
    {...props}
  />
))

const TimelineContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cx("mb-4 flex flex-1 flex-col gap-2", className)}
    ref={ref}
    {...props}
  />
))

const TimelineTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <p className={cx("text-sm font-medium", className)} ref={ref} {...props} />
))

const TimelineDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <p
    className={cx("text-muted-foreground text-xs", className)}
    ref={ref}
    {...props}
  />
))

export {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineIndicator,
  TimelineContent,
  TimelineConnector,
  TimelineTitle,
  TimelineDescription,
}
