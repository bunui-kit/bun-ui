import React, { useId } from "react"

import { cx } from "../../lib/utils"
import { Label } from "../label"

/**
 * Props for the Input component.
 * Extends the native HTML input element props with additional customization options.
 */
export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  /**
   * The label text or element to display above the input.
   * If provided, the input will be wrapped in a container with the label.
   */
  label?: React.ReactNode

  /**
   * Additional CSS classes to apply to the label element.
   * Use this to customize the styling of the label independently from the input.
   */
  labelClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, labelClassName, id, ...props }, ref) => {
    const _id = id ?? useId()
    const Wrapper = label ? "div" : React.Fragment
    const wrapperClassName = label ? "flex flex-col gap-2" : ""
    return (
      <Wrapper {...(label ? { className: wrapperClassName } : {})}>
        {label && (
          <Label htmlFor={_id} className={labelClassName}>
            {label}
          </Label>
        )}
        <input
          id={_id}
          ref={ref}
          className={cx(
            "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          {...props}
        />
      </Wrapper>
    )
  }
)

Input.displayName = "Input"

export { Input }
