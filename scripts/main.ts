import { resolve } from "path/posix"

import { buildProject } from "./build.js"
import { buildCSS } from "./build-css.js"

async function main() {
  const cwd = process.cwd()
  const flags = process.argv.slice(2)
  const watch = flags.includes("--watch")
  const clean = flags.includes("--clean")
  const dts = flags.includes("--dts")

  const packageJson = await import(resolve(cwd, "package.json"))

  await buildProject({
    dir: cwd,
    name: packageJson.name,
    watch,
    clean,
    dts,
  })

  // Build CSS after the main build
  await buildCSS(cwd)
}

main().catch((err) => {
  console.error(`[@bun-ui/react] Build failed:`, err)
  process.exit(1)
})
