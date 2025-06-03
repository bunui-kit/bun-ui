"use client"

import { Alert, AlertDescription, Button } from "@bun-ui/react"

export const AlertAction = () => {
  return (
    <div className="flex w-full flex-col gap-2">
      <Alert onClose={() => {}} color="warning">
        <AlertDescription>
          The Alert is showing default action button.
        </AlertDescription>
      </Alert>
      <Alert
        action={
          <Button
            className="text-current"
            color="neutral"
            variant="text"
            size="sm"
          >
            Undo
          </Button>
        }
        color="success"
      >
        <AlertDescription>
          The Alert is showing a custom action button.
        </AlertDescription>
      </Alert>
    </div>
  )
}
