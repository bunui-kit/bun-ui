"use client"

import React from "react"
import { Button, Step, StepConnector, StepLabel, Stepper } from "@bun-ui/react"

const items = ["Account", "Profile", "Preferences"]

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
              root: "h-0.5 border-0",
              active: "bg-purple-600",
              completed: "bg-emerald-600",
            }}
          />
        }
      >
        {items.map((item) => (
          <Step key={item} classes={{ root: "relative" }}>
            <StepLabel
              classes={{
                root: "flex flex-col items-center relative",
                label: "text-sm font-medium",
                active: "text-purple-600",
                completed: "text-emerald-600",
                iconContainer:
                  "mb-3 bg-white rounded-full p-3 w-12 h-12 flex items-center justify-center shadow-sm relative z-10",
              }}
            >
              {item}
            </StepLabel>
          </Step>
        ))}
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
