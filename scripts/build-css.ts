import { exec } from "node:child_process"
import { cpSync } from "node:fs"
import { join } from "node:path/posix"
import { promisify } from "node:util"

const execAsync = promisify(exec)

export async function buildCSS(dir: string) {
  const _dir = dir ?? process.cwd()
  try {
    console.log(`[@bun-ui/react] Building CSS...`)
    // Copy theme.css to dist
    cpSync(
      join(_dir, "src", "styles", "themes"),
      join(_dir, "dist", "themes"),
      { recursive: true }
    )

    await execAsync(
      `npx @tailwindcss/cli -i ${join(_dir, "src", "styles", "global.css")} -o ${join(_dir, "dist", "index.css")}`
    )

    console.log(`[@bun-ui/react] CSS build completed`)
  } catch (error) {
    console.error(`[@bun-ui/react] Failed to build CSS:`, error)
    throw error
  }
}

// Only run if this file is being executed directly
// if (import.meta.url === `file://${process.argv[1]}`) {
//   buildCSS(process.cwd()).catch((err) => {
//     console.error(`[@bun-ui/react] Build css failed:`, err)
//     process.exit(1)
//   })
// }
