import { Step, StepLabel, Stepper } from "@bun-ui/react"

export const StepperCustomStyling = () => {
  return (
    <Stepper activeStep={1} className="gap-4">
      <Step className="flex-1">
        <StepLabel className="flex-col items-center">
          <span className="mb-2 text-lg">1</span>
          <span className="text-sm font-medium">Account</span>
        </StepLabel>
      </Step>
      <Step className="flex-1">
        <StepLabel className="flex-col items-center">
          <span className="mb-2 text-lg">2</span>
          <span className="text-sm font-medium">Profile</span>
        </StepLabel>
      </Step>
      <Step className="flex-1">
        <StepLabel className="flex-col items-center">
          <span className="mb-2 text-lg">3</span>
          <span className="text-sm font-medium">Preferences</span>
        </StepLabel>
      </Step>
    </Stepper>
  )
}
