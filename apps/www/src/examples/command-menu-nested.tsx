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
  FileIcon,
  FolderIcon,
  HomeIcon,
  ImageIcon,
  LayoutDashboardIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
  VideoIcon,
} from "lucide-react"

export const CommandMenuNested = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Command Menu</Button>
      <CommandMenu>
        <CommandMenuDialog open={open} onOpenChange={setOpen}>
          <CommandMenuInput placeholder="Type a command or search..." />
          <CommandMenuList>
            <CommandMenuEmpty>No results found.</CommandMenuEmpty>
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
            <CommandMenuGroup heading="Files">
              <CommandMenuGroup heading="Documents">
                <CommandMenuItem>
                  <FileIcon />
                  Recent Documents
                </CommandMenuItem>
                <CommandMenuItem>
                  <FolderIcon />
                  My Documents
                </CommandMenuItem>
              </CommandMenuGroup>
              <CommandMenuGroup heading="Media">
                <CommandMenuItem>
                  <ImageIcon />
                  Images
                </CommandMenuItem>
                <CommandMenuItem>
                  <VideoIcon />
                  Videos
                </CommandMenuItem>
              </CommandMenuGroup>
            </CommandMenuGroup>
            <CommandMenuGroup heading="Tools">
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
          </CommandMenuList>
        </CommandMenuDialog>
      </CommandMenu>
    </>
  )
}
