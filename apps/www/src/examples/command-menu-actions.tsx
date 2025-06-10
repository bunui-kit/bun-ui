"use client"

import { useState } from "react"
import {
  Button,
  CommandMenu,
  CommandMenuDialog,
  CommandMenuEmpty,
  CommandMenuGroup,
  CommandMenuInput,
  CommandMenuItem,
  CommandMenuList,
  useToast,
} from "@bun-ui/react"
import { HomeIcon, LayoutDashboardIcon, UserIcon } from "lucide-react"

export const CommandMenuActions = () => {
  const [open, setOpen] = useState(false)
  const { createToast } = useToast()

  const handleAction = (action: string) => {
    setOpen(false)
    createToast({
      title: `Action: ${action}`,
      description: "Action executed successfully!",
    })
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Command Menu</Button>
      <CommandMenu>
        <CommandMenuDialog open={open} onOpenChange={setOpen}>
          <CommandMenuInput placeholder="Type a command or search..." />
          <CommandMenuList>
            <CommandMenuEmpty>No results found.</CommandMenuEmpty>
            <CommandMenuGroup heading="Quick Actions">
              <CommandMenuItem onSelect={() => handleAction("New Document")}>
                <span className="flex-1">New Document</span>
                <kbd className="ml-auto text-xs text-current/60">⌘N</kbd>
              </CommandMenuItem>
              <CommandMenuItem onSelect={() => handleAction("Save")}>
                <span className="flex-1">Save</span>
                <kbd className="ml-auto text-xs text-current/60">⌘S</kbd>
              </CommandMenuItem>
              <CommandMenuItem onSelect={() => handleAction("Print")}>
                <span className="flex-1">Print</span>
                <kbd className="ml-auto text-xs text-current/60">⌘P</kbd>
              </CommandMenuItem>
            </CommandMenuGroup>
            <CommandMenuGroup heading="Navigation">
              <CommandMenuItem onSelect={() => handleAction("Go to Home")}>
                <HomeIcon />
                Go to Home
              </CommandMenuItem>
              <CommandMenuItem onSelect={() => handleAction("Open Profile")}>
                <UserIcon />
                Open Profile
              </CommandMenuItem>
              <CommandMenuItem onSelect={() => handleAction("View Dashboard")}>
                <LayoutDashboardIcon />
                View Dashboard
              </CommandMenuItem>
            </CommandMenuGroup>
          </CommandMenuList>
        </CommandMenuDialog>
      </CommandMenu>
    </>
  )
}

