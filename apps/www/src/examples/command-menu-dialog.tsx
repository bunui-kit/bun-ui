"use client"

import { useState } from "react"
import {
  Button,
  CommandMenu,
  CommandMenuEmpty,
  CommandMenuGroup,
  CommandMenuInput,
  CommandMenuItem,
  CommandMenuList,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@bun-ui/react"
import { Search } from "lucide-react"

export const CommandMenuDialog = () => {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-muted/50 text-muted-foreground group hover:[&_*]:text-foreground relative h-8 w-[300px] justify-start rounded-lg px-1 text-sm font-normal shadow-none hover:not-disabled:bg-inherit dark:hover:not-disabled:bg-inherit [&_*]:transition-colors [&_*]:duration-150"
        variant="outlined"
      >
        <Search className="h-4 w-4 group-hover:text-black sm:flex dark:group-hover:text-white" />
        <span className="mr-4 hidden sm:inline-flex">Search...</span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">Search</DialogTitle>
        <DialogContent className="p-0 lg:max-w-xl">
          <CommandMenu>
            <CommandMenuInput
              placeholder="Search..."
              value={inputValue}
              onValueChange={setInputValue}
            />
            <CommandMenuList className="max-h-[30rem] lg:max-h-[40rem]">
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
          </CommandMenu>
        </DialogContent>
      </Dialog>
    </>
  )
}
