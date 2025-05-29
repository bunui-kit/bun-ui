"use client"

import * as React from "react"

import { cx } from "../../lib"
import { CheckIcon } from "../icons"
import type {
  StepClasses,
  StepConnectorClasses,
  StepLabelClasses,
  StepperClasses,
} from "./stepper-classes"
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
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: StepperClasses
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      className,
      activeStep = 0,
      children,
      connector = <StepConnector />,
      classes,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cx(
          "flex w-full items-center gap-2",
          classes?.root,
          className
        )}
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
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: StepClasses
}

const Step = React.forwardRef<HTMLDivElement, StepProps>(
  (
    {
      className,
      children,
      classes,
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
          className={cx("flex items-center", classes?.root, className)}
          {...props}
        >
          {children}
        </div>
      </StepContext.Provider>
    )
  }
)

interface StepLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: StepLabelClasses
}

const StepLabel = React.forwardRef<HTMLSpanElement, StepLabelProps>(
  ({ className, children, classes, ...props }, ref) => {
    const { active, completed, index } = useStepContext()
    return (
      <span
        ref={ref}
        className={cx("flex items-center", classes?.root, className)}
        {...props}
      >
        <span
          className={cx(
            "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full p-1 text-xs",
            "bg-muted text-muted-foreground",
            (completed || active) && "bg-primary text-primary-foreground",
            classes?.iconContainer
          )}
        >
          {completed ? <CheckIcon className="h-4 w-4" /> : index + 1}
        </span>
        <p
          className={cx(
            "ml-2 text-sm font-medium",
            classes?.label,
            active && classes?.active,
            completed && classes?.completed
          )}
        >
          {children}
        </p>
      </span>
    )
  }
)

interface StepperConnectorProps extends React.HTMLAttributes<HTMLDivElement> {
  classes?: StepConnectorClasses
}

const StepConnector = React.forwardRef<HTMLDivElement, StepperConnectorProps>(
  ({ className, classes, ...props }, ref) => {
    const { active, completed } = useStepContext()

    return (
      <div
        ref={ref}
        className={cx(
          "border-border flex-1 border-t border-solid",
          classes?.root,
          active && classes?.active,
          completed && classes?.completed,
          className
        )}
        {...props}
      />
    )
  }
)

export { Stepper, Step, StepLabel, StepConnector }
