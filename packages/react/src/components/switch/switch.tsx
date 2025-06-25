import React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cx } from "../../lib"
import { Label } from "../label"

interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: string
  /**
   * Class name for the label element
   */
  labelClassName?: string
  /**
   * Class name for thumb element
   */
  thumbClassName?: string
}

const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(
  (
    {
      className,
      label,
      labelClassName,
      thumbClassName,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const Wrapper = label ? "div" : React.Fragment
    const wrapperClassName = label ? "flex items-center w-fit" : ""
    const _id = id ?? React.useId()
    return (
      <Wrapper {...(label ? { className: wrapperClassName } : {})}>
        {label && (
          <Label
            htmlFor={_id}
            className={cx(
              "mr-2 cursor-pointer",
              disabled && "text-muted-foreground cursor-not-allowed",
              labelClassName
            )}
          >
            {label}
          </Label>
        )}
        <SwitchPrimitive.Root
          ref={ref}
          id={_id}
          disabled={disabled}
          className={cx(
            "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 cursor-pointer items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        >
          <SwitchPrimitive.Thumb
            className={cx(
              "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0",
              thumbClassName
            )}
          />
        </SwitchPrimitive.Root>
      </Wrapper>
    )
  }
)

export { Switch, type SwitchProps }
