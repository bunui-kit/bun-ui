import React from "react"
import { cva } from "class-variance-authority"

import { cx } from "../../lib"
import {
  CircleAlertIcon,
  CircleCheckBigIcon,
  TriangleAlertIcon,
} from "../icons"

/**
 * Alert variants configuration using class-variance-authority.
 * Defines the visual styles for different alert states and appearances.
 */
const alertVariants = cva(
  "relative w-full rounded-lg border border-border px-4 py-3 text-sm  [&>svg]:text-foreground flex",
  {
    variants: {
      variant: {
        neutral: "bg-background text-foreground",
        success:
          "bg-green-50 text-green-800 [&>svg]:text-green-800 dark:[&>svg]:text-green-400 dark:bg-green-900/50 dark:text-green-400",
        warning:
          "bg-yellow-50 text-yellow-800 [&>svg]:text-yellow-800 dark:[&>svg]:text-yellow-400 dark:bg-yellow-900/50 dark:text-yellow-400",
        error:
          "border-destructive text-destructive dark:bg-red-900/50 [&>svg]:text-destructive dark:text-red-400",
      },
      defaultVariants: {
        variant: "neutral",
      },
    },
  }
)

/**
 * Props for the Alert component.
 */
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional custom icon to display in the alert.
   * If not provided, a default icon will be shown based on the variant.
   */
  icon?: React.ReactNode

  /**
   * The visual style variant of the button.
   * @default "neutral"
   */
  variant?: "neutral" | "success" | "warning" | "error"
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
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, icon: iconProps, children, ...props }, ref) => {
    let icon = iconProps
    if (icon === undefined) {
      icon = <CircleAlertIcon className="h-4 w-4" />
      if (variant === "success") {
        icon = <CircleCheckBigIcon className="h-4 w-4" />
      } else if (variant === "warning") {
        icon = <TriangleAlertIcon className="h-4 w-4" />
      }
    }
    return (
      <div
        ref={ref}
        className={cx(alertVariants({ variant }), className)}
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
