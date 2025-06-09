"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  Button,
} from "@bun-ui/react"

export const AlertDialogControlled = () => {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (value: boolean) => {
    setOpen(value)
  }

  const handleUpgrade = () => {
    console.log("Upgrade confirmed")
    setOpen(false)
  }

  return (
    <>
      <Button onClick={() => handleOpenChange(true)}>Upgrade to Pro</Button>
      <AlertDialog open={open} onOpenChange={handleOpenChange}>
        <AlertDialogContent>
          <AlertDialogTitle>Upgrade to Pro Plan?</AlertDialogTitle>
          <AlertDialogDescription>
            You're about to upgrade to our Pro plan. This will give you access
            to premium features and priority support. Your card will be charged
            $29/month.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Maybe Later</AlertDialogCancel>
            <AlertDialogAction color="primary" onClick={handleUpgrade}>
              Upgrade Now
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
