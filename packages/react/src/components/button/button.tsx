import React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cx } from "../../lib/utils"

const buttonVariants = cva(
  "select-none inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer disabled:[&_*]:pointer-events-none",
  {
    variants: {
      variant: {
        contained: "",
        outlined: "border bg-background",
        text: "",
      },
      color: {
        primary: "",
        secondary: "",
        destructive: "",
        accent: "",
        neutral: "",
        success: "",
      },
      size: {
        sm: "px-3 py-1",
        md: "px-4 py-2",
        lg: "px-6 py-2 text-base",
        icon: "h-10 w-10",
      },
    },
    compoundVariants: [
      {
        variant: "contained",
        color: "neutral",
        className:
          "bg-foreground text-background hover:not-disabled:bg-foreground/90",
      },
      {
        variant: "contained",
        color: "primary",
        className:
          "bg-primary text-primary-foreground hover:not-disabled:bg-primary/90",
      },
      {
        variant: "contained",
        color: "secondary",
        className:
          "bg-secondary text-secondary-foreground hover:not-disabled:bg-secondary/90",
      },
      {
        variant: "contained",
        color: "destructive",
        className:
          "bg-destructive text-destructive-foreground hover:not-disabled:bg-destructive/90",
      },
      {
        variant: "contained",
        color: "accent",
        className:
          "bg-accent text-accent-foreground hover:not-disabled:bg-accent/90",
      },
      {
        variant: "outlined",
        color: "neutral",
        className:
          "border-foreground/80 hover:not-disabled:border-foreground hover:not-disabled:text-foreground text-foreground/80",
      },
      {
        variant: "contained",
        color: "success",
        className:
          "bg-success text-success-foreground hover:not-disabled:bg-success/90",
      },
      {
        variant: "outlined",
        color: "primary",
        className:
          "border-primary/80 hover:not-disabled:border-primary hover:not-disabled:text-primary text-primary/80",
      },
      {
        variant: "outlined",
        color: "secondary",
        className:
          "border-secondary hover:not-disabled:border-secondary/90 hover:not-disabled:text-secondary/90 text-secondary",
      },
      {
        variant: "outlined",
        color: "destructive",
        className:
          "border-destructive/80 hover:not-disabled:border-destructive hover:not-disabled:text-destructive text-destructive/80",
      },
      {
        variant: "outlined",
        color: "accent",
        className:
          "border-accent/80 hover:not-disabled:border-accent hover:not-disabled:text-accent text-accent/80",
      },
      {
        variant: "outlined",
        color: "success",
        className:
          "border-success/80 hover:not-disabled:border-success hover:not-disabled:text-success text-success/80",
      },
      {
        variant: "text",
        color: "neutral",
        className: "text-foreground hover:not-disabled:bg-foreground/10",
      },
      {
        variant: "text",
        color: "primary",
        className: "text-primary hover:not-disabled:bg-primary/10",
      },
      {
        variant: "text",
        color: "secondary",
        className: "text-secondary hover:not-disabled:bg-secondary/10",
      },
      {
        variant: "text",
        color: "destructive",
        className: "text-destructive hover:not-disabled:bg-destructive/10",
      },
      {
        variant: "text",
        color: "accent",
        className: "text-accent hover:not-disabled:bg-accent/10",
      },
      {
        variant: "text",
        color: "success",
        className: "text-success hover:not-disabled:bg-success/10",
      },
    ],
    defaultVariants: {
      variant: "contained",
      color: "primary",
      size: "md",
    },
  }
)

/**
 * Props for the Button component.
 * @interface ButtonProps
 * @extends {Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">}
 */
export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  /**
   * Whether to render the button as a child component using Radix UI's Slot.
   * @default false
   */
  asChild?: boolean
  /**
   * The color scheme of the button.
   * @default "primary"
   */
  color?:
    | "primary"
    | "secondary"
    | "destructive"
    | "accent"
    | "neutral"
    | "success"
  /**
   * The visual style variant of the button.
   * @default "contained"
   */
  variant?: "contained" | "outlined" | "text"
  /**
   * Size of the button.
   * @default "md"
   *
   * The "icon" size is deprecated. Use the `IconButton` component
   * with `size="sm" | "md" | "lg"` for icon-only buttons.
   */
  size?: "sm" | "md" | "lg" | "icon"
}

/**
 * A versatile button component that supports different variants, colors, and sizes.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Button>Click me</Button>
 *
 * // With variant and color
 * <Button variant="outlined" color="primary">Outlined Button</Button>
 *
 * // With size
 * <Button size="lg">Large Button</Button>
 * ```
 *
 * Demos:
 *   - [Button](https://bun-ui.com/docs/components/button)
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, variant, size, className, color, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={cx(buttonVariants({ variant, size, className, color }))}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
