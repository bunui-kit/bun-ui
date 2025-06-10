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
import {
  CalendarIcon,
  HomeIcon,
  LayoutDashboardIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"

export const CommandMenuIcons = () => {
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
              <CommandMenuItem>
                <CalendarIcon />
                Calendar
              </CommandMenuItem>
              <CommandMenuItem>
                <SearchIcon />
                Search
              </CommandMenuItem>
              <CommandMenuItem>
                <SettingsIcon />
                Settings
              </CommandMenuItem>
            </CommandMenuGroup>
            <CommandMenuGroup heading="Navigation">
              <CommandMenuItem>
                <HomeIcon />
                Home
              </CommandMenuItem>
              <CommandMenuItem>
                <UserIcon />
                Profile
              </CommandMenuItem>
              <CommandMenuItem>
                <LayoutDashboardIcon />
                Dashboard
              </CommandMenuItem>
            </CommandMenuGroup>
          </CommandMenuList>
        </CommandMenuDialog>
      </CommandMenu>
    </>
  )
}
