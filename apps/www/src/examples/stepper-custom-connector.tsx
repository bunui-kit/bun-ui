"use client"

import React from "react"
import { Button, Step, StepConnector, StepLabel, Stepper } from "@bun-ui/react"

export const StepperCustomConnector = () => {
  const [activeStep, setActiveStep] = React.useState(1)
  return (
    <div className="w-full">
      <Stepper
        activeStep={activeStep}
        connector={
          <StepConnector className="h-0.5 border-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        }
      >
        <Step>
          <StepLabel>Application</StepLabel>
        </Step>
        <Step>
          <StepLabel>Interview</StepLabel>
        </Step>
        <Step>
          <StepLabel>Offer</StepLabel>
        </Step>
      </Stepper>

      <div className="mt-4 flex gap-4">
        <Button onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}>
          Previous
        </Button>
        <Button onClick={() => setActiveStep((prev) => Math.min(prev + 1, 3))}>
          Next
        </Button>
      </div>
    </div>
  )
}
