import React from "react"

interface StepperContextValue {
  connector?: React.ReactNode
  activeStep: number
}

const StepperContext = React.createContext<StepperContextValue>({
  activeStep: 0,
})

const useStepperContext = () => {
  const context = React.useContext(StepperContext)
  if (!context) {
    throw new Error("useStepperContext must be used within Stepper")
  }
  return context
}

interface StepContextValue {
  active: boolean
  completed: boolean
  index: number
}

const StepContext = React.createContext<StepContextValue>({
  active: false,
  completed: false,
  index: 0,
})

const useStepContext = () => {
  const context = React.useContext(StepContext)
  if (!context) {
    throw new Error("useStepContext must be used within Step")
  }
  return context
}

export {
  StepperContext,
  type StepperContextValue,
  useStepperContext,
  useStepContext,
  StepContext,
  type StepContextValue,
}
