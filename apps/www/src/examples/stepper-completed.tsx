import { Step, StepLabel, Stepper } from "@bun-ui/react"

export const StepperCompleted = () => {
  return (
    <Stepper activeStep={2}>
      <Step completed>
        <StepLabel>Project Info</StepLabel>
      </Step>
      <Step completed>
        <StepLabel>Team Setup</StepLabel>
      </Step>
      <Step>
        <StepLabel>Launch</StepLabel>
      </Step>
    </Stepper>
  )
}
