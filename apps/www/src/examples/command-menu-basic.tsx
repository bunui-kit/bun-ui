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
} from "@bun-ui/react"

export const CommandMenuBasic = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Command Menu</Button>
      <CommandMenu>
        <CommandMenuDialog open={open} onOpenChange={setOpen}>
          <CommandMenuInput placeholder="Type a command or search..." />
          <CommandMenuList>
            <CommandMenuEmpty>No results found.</CommandMenuEmpty>
            <CommandMenuGroup heading="Suggestions">
              <CommandMenuItem>Calendar</CommandMenuItem>
              <CommandMenuItem>Search</CommandMenuItem>
              <CommandMenuItem>Settings</CommandMenuItem>
            </CommandMenuGroup>
            <CommandMenuGroup heading="Navigation">
              <CommandMenuItem>Home</CommandMenuItem>
              <CommandMenuItem>Profile</CommandMenuItem>
              <CommandMenuItem>Dashboard</CommandMenuItem>
            </CommandMenuGroup>
          </CommandMenuList>
        </CommandMenuDialog>
      </CommandMenu>
    </>
  )
}
