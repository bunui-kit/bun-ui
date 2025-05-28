"use client"

import React from "react"

import { cx } from "../../lib"
import { CheckIcon } from "../icons"
import {
  StepContext,
  StepperContext,
  useStepContext,
  useStepperContext,
} from "./stepper-context"

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  activeStep?: number
  /**
   * A separator element placed between each step.
   */
  connector?: React.ReactNode
}
const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      className,
      activeStep = 0,
      children,
      connector = <StepConnector />,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cx("flex items-center gap-2", className)}
        ref={ref}
        {...props}
      >
        {React.Children.map(children, (child, index) => (
          <StepperContext.Provider value={{ activeStep, connector }}>
            {React.cloneElement(child as React.ReactElement<StepProps>, {
              index,
            })}
          </StepperContext.Provider>
        ))}
      </div>
    )
  }
)

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Set the step as active.
   */
  active?: boolean
  /**
   * The position of the step, it is defaulted to the
   * index of the step in the Stepper.
   */
  index?: number
  /**
   * Mark the step as completed.
   */
  completed?: boolean
}

const Step = React.forwardRef<HTMLDivElement, StepProps>(
  (
    {
      className,
      children,
      index = 0,
      active: activeProp,
      completed: completedProp,
      ...props
    },
    ref
  ) => {
    let [active = false, completed = false] = [activeProp, completedProp]
    const { activeStep, connector } = useStepperContext()
    if (activeStep === index) {
      active = activeProp !== undefined ? activeProp : true
    } else if (activeStep > index) {
      completed = completedProp !== undefined ? completedProp : true
    }

    return (
      <StepContext.Provider value={{ active, completed, index }}>
        {index > 0 && connector}
        <div
          ref={ref}
          className={cx("flex items-center", className)}
          {...props}
        >
          <span>{children}</span>
        </div>
      </StepContext.Provider>
    )
  }
)

const StepLabel = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => {
  const { active, completed, index } = useStepContext()
  return (
    <span ref={ref} className={cx("flex items-center", className)} {...props}>
      <span
        className={cx(
          "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full p-1 text-xs",
          "bg-muted text-muted-foreground",
          (completed || active) && "bg-primary text-primary-foreground"
        )}
      >
        {completed ? <CheckIcon className="h-4 w-4" /> : index + 1}
      </span>
      <span className={cx("ml-2 text-sm font-medium", className)}>
        {children}
      </span>
    </span>
  )
})

const StepConnector = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cx("border-border flex-1 border-t border-solid", className)}
      {...props}
    />
  )
})

export { Stepper, Step, StepLabel, StepConnector }
