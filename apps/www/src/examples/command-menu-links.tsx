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
  Link,
} from "@bun-ui/react"

export const CommandMenuLinks = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Command Menu</Button>
      <CommandMenu>
        <CommandMenuDialog open={open} onOpenChange={setOpen}>
          <CommandMenuInput placeholder="Type a command or search..." />
          <CommandMenuList>
            <CommandMenuEmpty>No results found.</CommandMenuEmpty>
            <CommandMenuItem asChild>
              <Link
                underline="none"
                color="neutral"
                href="#"
                className="flex items-center gap-2"
              >
                <span>New Document</span>
                <kbd className="text-muted-foreground ml-auto text-xs">⌘N</kbd>
              </Link>
            </CommandMenuItem>
            <CommandMenuItem asChild>
              <Link
                underline="none"
                color="neutral"
                href="#"
                className="flex items-center gap-2"
              >
                <span>Save</span>
                <kbd className="text-muted-foreground ml-auto text-xs">⌘S</kbd>
              </Link>
            </CommandMenuItem>
            <CommandMenuItem asChild>
              <Link
                underline="none"
                color="neutral"
                href="#"
                className="flex items-center gap-2"
              >
                <span>Print</span>
                <kbd className="text-muted-foreground ml-auto text-xs">⌘P</kbd>
              </Link>
            </CommandMenuItem>
          </CommandMenuList>
        </CommandMenuDialog>
      </CommandMenu>
    </>
  )
}
