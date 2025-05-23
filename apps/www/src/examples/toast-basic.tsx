"use client"

import { Button } from "@bun-ui/react"
import { useToast } from "@bun-ui/react/toast"

export const ToastBasic = () => {
  const { createToast } = useToast()
  return (
    <Button
      onClick={() =>
        createToast({
          title: "Alert",
        })
      }
    >
      Show toast
    </Button>
  )
}
