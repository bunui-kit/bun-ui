import { cpSync } from "node:fs"
import { join } from "node:path/posix"

export async function buildCSS(dir: string) {
  try {
    // Copy theme.css to dist
    cpSync(
      join(dir, "src", "styles", "theme.css"),
      join(dir, "dist", "theme.css")
    )
    console.log(`[@bun-ui/react] Copied theme.css to dist directory`)
  } catch (error) {
    console.error(`[@bun-ui/react] Failed to copy theme.css:`, error)
    throw error
  }
} 