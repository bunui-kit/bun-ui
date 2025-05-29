"use client"

import React from "react"
import { Button, Step, StepConnector, StepLabel, Stepper } from "@bun-ui/react"

export const StepperCustomStyling = () => {
  const [activeStep, setActiveStep] = React.useState(0)
  return (
    <div className="w-full">
      <Stepper
        activeStep={activeStep}
        className="gap-8"
        connector={
          <StepConnector
            classes={{
              root: "h-0.5 border-0 bg-gray-200",
              active: "bg-gradient-to-r from-rose-500 to-orange-400",
              completed:
                "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
            }}
          />
        }
      >
        <Step classes={{ root: "flex-1 relative" }}>
          <StepLabel
            classes={{
              root: "flex flex-col items-center relative",
              label: "text-sm font-medium",
              active: "text-rose-500",
              completed: "text-blue-500",
              iconContainer:
                "mb-3 bg-white rounded-full p-3 w-12 h-12 flex items-center justify-center shadow-sm relative z-10",
            }}
          >
            Account
          </StepLabel>
        </Step>
        <Step classes={{ root: "flex-1 relative" }}>
          <StepLabel
            classes={{
              root: "flex flex-col items-center relative",
              label: "text-sm font-medium",
              active: "text-rose-500",
              completed: "text-blue-500",
              iconContainer:
                "mb-3 bg-white rounded-full p-3 w-12 h-12 flex items-center justify-center shadow-sm relative z-10",
            }}
          >
            Profile
          </StepLabel>
        </Step>
        <Step classes={{ root: "flex-1 relative" }}>
          <StepLabel
            classes={{
              root: "flex flex-col items-center relative",
              label: "text-sm font-medium",
              active: "text-rose-500",
              completed: "text-blue-500",
              iconContainer:
                "mb-3 bg-white rounded-full p-3 w-12 h-12 flex items-center justify-center shadow-sm relative z-10",
            }}
          >
            Preferences
          </StepLabel>
        </Step>
      </Stepper>
      <div className="mt-4 flex items-center gap-4">
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
