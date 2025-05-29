"use client"

import React from "react"
import { Button, Step, StepLabel, Stepper } from "@bun-ui/react"

export const StepperBasic = () => {
  const [activeStep, setActiveStep] = React.useState(0)
  return (
    <div className="w-full">
      <Stepper activeStep={activeStep} className="w-full">
        <Step>
          <StepLabel>Cart</StepLabel>
        </Step>
        <Step>
          <StepLabel>Shipping</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <div className="mt-5 flex items-center gap-4">
        <Button
          size="sm"
          onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
        >
          Previous
        </Button>
        <Button
          size="sm"
          onClick={() => setActiveStep((prev) => Math.min(3, prev + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
