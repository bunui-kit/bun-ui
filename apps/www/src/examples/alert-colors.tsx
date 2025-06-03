import { Alert, AlertDescription, AlertTitle } from "@bun-ui/react"

export const AlertColors = () => {
  return (
    <div className="flex w-full flex-col gap-2">
      <Alert color="info">
        <AlertTitle>info</AlertTitle>
        <AlertDescription>
          This is an informational alert. It provides useful information to the
          user.
        </AlertDescription>
      </Alert>
      <Alert color="success">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Your action was completed successfully.
        </AlertDescription>
      </Alert>

      <Alert color="warning">
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Be careful with this action. It&apos;s irreversible.
        </AlertDescription>
      </Alert>

      <Alert color="error">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again.
        </AlertDescription>
      </Alert>
    </div>
  )
}
