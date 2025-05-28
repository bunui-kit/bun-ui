import { Step, StepLabel, Stepper } from "@bun-ui/react"

export const StepperBasic = () => {
  return (
    <Stepper activeStep={1} className="w-full">
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
  )
}
