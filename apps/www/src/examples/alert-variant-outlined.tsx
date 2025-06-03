import { Alert, AlertDescription, AlertTitle } from "@bun-ui/react"

export const AlertVariantOutlined = () => {
  return (
    <div className="flex w-full flex-col gap-2">
      <Alert variant="outlined">
        <AlertTitle>Standard</AlertTitle>
        <AlertDescription>
          Your action was completed successfully.
        </AlertDescription>
      </Alert>
      <Alert variant="outlined" color="success">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Your action was completed successfully.
        </AlertDescription>
      </Alert>
      <Alert variant="outlined" color="warning">
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Be careful with this action. It&apos;s irreversible.
        </AlertDescription>
      </Alert>
      <Alert variant="outlined" color="error">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again.
        </AlertDescription>
      </Alert>
    </div>
  )
}
