import React from "react"
import { cva } from "class-variance-authority"

import { cx } from "../../lib"
import { IconButton } from "../icon-button"
import {
  CircleAlertIcon,
  CircleCheckBigIcon,
  CloseIcon,
  TriangleAlertIcon,
} from "../icons"
import type { AlertClasses } from "./alert-classes"

const alertVariants = cva(
  "relative w-full rounded-lg px-4 py-[6px] text-sm flex",
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
        className: "bg-success/10 text-success [&>svg]:text-success ",
      },
      {
        variant: "standard",
        color: "warning",
        className:
          "bg-yellow-200/20 text-yellow-800 [&>svg]:text-yellow-800 dark:[&>svg]:text-yellow-400 dark:bg-yellow-900/50 dark:text-yellow-400",
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
        className: "border-success text-success",
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
   * Optional action to display. It renders after the message, at the end of the alert.
   */
  action?: React.ReactNode
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

  /**
   * Callback fired when the component requests to be closed.
   */
  onClose?: (event: React.MouseEvent) => void

  /**
   * Override or extend the styles applied to Alert component
   * and its subcomponents.
   */
  classes?: AlertClasses
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
      action,
      onClose,
      classes,
      ...props
    },
    ref
  ) => {
    let icon = iconProps
    if (icon === undefined) {
      icon = <CircleAlertIcon className="size-5" />
      if (color === "success") {
        icon = <CircleCheckBigIcon className="size-5" />
      } else if (color === "warning") {
        icon = <TriangleAlertIcon className="size-5" />
      }
    }
    return (
      <div
        ref={ref}
        className={cx(
          alertVariants({ color, variant }),
          classes?.root,
          className
        )}
        {...props}
      >
        {icon && (
          <div className={cx("mr-2 flex py-2", classes?.icon)}>{icon}</div>
        )}
        <div className={cx("py-2", classes?.content)}>{children}</div>
        {action != null ? (
          <div
            className={cx(
              "-mr-2 ml-auto flex items-start pt-1 pb-2",
              classes?.actionContainer
            )}
          >
            {action}
          </div>
        ) : null}
        {action == null && onClose ? (
          <div
            className={cx(
              "-mr-2 ml-auto flex items-start pt-1 pb-2",
              classes?.actionContainer
            )}
          >
            <IconButton
              onClick={onClose}
              size="sm"
              className={cx("text-current", classes?.closeIconButton)}
            >
              <CloseIcon className={classes?.closeIcon} />
            </IconButton>
          </div>
        ) : null}
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
  <p
    ref={ref}
    className={cx("peer text-base font-medium", className)}
    {...props}
  />
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
