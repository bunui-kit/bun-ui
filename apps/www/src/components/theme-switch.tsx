"use client"

import { IconButton, useTheme } from "@bun-ui/react"
import { Moon, Sun } from "lucide-react"

export const ThemeSwitch = () => {
  const { toggleDarkMode } = useTheme()

  return (
    <IconButton onClick={toggleDarkMode} size="xs">
      <Moon className="hidden dark:block" />
      <Sun className="hidden not-dark:block" />
    </IconButton>
  )
}

export default ThemeSwitch
