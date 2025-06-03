import React from "react"
import { cva } from "class-variance-authority"

import { cx } from "../../lib"
import {
  CircleAlertIcon,
  CircleCheckBigIcon,
  TriangleAlertIcon,
} from "../icons"

const alertVariants = cva(
  "relative w-full rounded-lg px-4 py-3 text-sm  flex",
  {
    variants: {
      color: {
        info: "",
        success: "",
        warning: "",
        error: "",
      },
      variant: {
        filled: "",
        outlined: "border",
        standard: "",
      },
    },
    compoundVariants: [
      {
        variant: "standard",
        color: "info",
        className: "bg-foreground/10 text-foreground",
      },
      {
        variant: "standard",
        color: "success",
        className:
          "bg-success/10 text-success-foreground [&>svg]:text-success-forground ",
      },
      {
        variant: "standard",
        color: "warning",
        className:
          "bg-yellow-50/10 text-yellow-800 [&>svg]:text-yellow-800 dark:[&>svg]:text-yellow-400 dark:bg-yellow-900/50 dark:text-yellow-400",
      },
      {
        variant: "standard",
        color: "error",
        className:
          "bg-destructive/10 text-destructive [&>svg]:text-destructive",
      },
      {
        variant: "filled",
        color: "info",
        className: "bg-foreground text-background",
      },
      {
        variant: "filled",
        color: "success",
        className: "bg-success text-success-foreground",
      },
      {
        variant: "filled",
        color: "warning",
        className:
          "bg-yellow-200 text-yellow-800 [&>svg]:text-yellow-800 dark:[&>svg]:text-yellow-400 dark:bg-yellow-900 dark:text-yellow-400",
      },
      {
        variant: "filled",
        color: "error",
        className: "bg-destructive text-destructive-foreground",
      },

      {
        variant: "outlined",
        color: "info",
        className: "border-foreground/50 text-foreground",
      },
      {
        variant: "outlined",
        color: "success",
        className: "border-success text-success-foreground",
      },
      {
        variant: "outlined",
        color: "warning",
        className:
          "border-yellow-600 text-yellow-800 dark:border-yellow-800 dark:text-yellow-500 dark:border-yellow-500",
      },
      {
        variant: "outlined",
        color: "error",
        className: "border-destructive text-destructive",
      },
    ],
    defaultVariants: {
      color: "info",
      variant: "standard",
    },
  }
)

/**
 * Props for the Alert component.
 */
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional custom icon to display in the alert.
   * If not provided, a default icon will be shown based on `color` prop.
   */
  icon?: React.ReactNode

  /**
   * The visual style variant of the button.
   * @default "neutral"
   *
   * When color="warning", a warning icon will be shown.
   * When color="success", a check icon will be shown.
   *
   * Use `icon` prop to override the default icon.
   */
  color?: "info" | "success" | "warning" | "error"

  /**
   * Variant of the alert.
   * @default "standard"
   */
  variant?: "filled" | "outlined" | "standard"
}

/**
 * Alert component for displaying important messages to users.
 * Supports different variants for various types of alerts (default, success, warning, error).
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Alert>This is an alert message</Alert>
 *
 * // With variant
 * <Alert variant="success">Operation completed successfully!</Alert>
 *
 * // With custom icon
 * <Alert icon={<CustomIcon />}>Custom alert with icon</Alert>
 * ```
 *
 * Demos:
 *   - [Alert](https://bun-ui.com/docs/components/alert)
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      color = "info",
      variant = "standard",
      icon: iconProps,
      children,
      ...props
    },
    ref
  ) => {
    let icon = iconProps
    if (icon === undefined) {
      icon = <CircleAlertIcon className="h-4 w-4" />
      if (color === "success") {
        icon = <CircleCheckBigIcon className="h-4 w-4" />
      } else if (color === "warning") {
        icon = <TriangleAlertIcon className="h-4 w-4" />
      }
    }
    return (
      <div
        ref={ref}
        className={cx(alertVariants({ color, variant, className }))}
        {...props}
      >
        {icon && <div className="mt-[2px] mr-2 self-start">{icon}</div>}
        <div>{children}</div>
      </div>
    )
  }
)

/**
 * Title component for the Alert.
 * Used to display a prominent heading within the alert.
 */
const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <h5 ref={ref} className={cx("peer font-medium", className)} {...props} />
))

/**
 * Description component for the Alert.
 * Used to display additional details or context within the alert.
 */
const AlertDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cx("text-sm peer-last:mt-1", className)}
    {...props}
  />
))

export { Alert, AlertTitle, AlertDescription }
