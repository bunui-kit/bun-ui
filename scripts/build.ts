import { rmSync } from "fs"
import { join } from "path/posix"
import { Alias } from "@rollup/plugin-alias"
import * as rollup from "rollup"

import { getConfig } from "./config.js"
import { generateTypes } from "./tsc.js"

interface BuildOptions {
  dir: string
  name: string
  watch?: boolean
  clean?: boolean
  dts?: boolean
  aliases?: Alias[]
}

export async function buildProject(options: BuildOptions) {
  const { dir, watch, clean, dts, aliases = [] } = options
  console.log(`[@bun-ui/react] Building...`)

  if (clean) {
    const distDir = join(dir, "dist")
    rmSync(distDir, { recursive: true, force: true })
  }

  const config = await getConfig({ dir, aliases })

  if (watch) {
    config.watch = {
      include: config.input as string[],
      chokidar: { ignoreInitial: true },
    }

    const watcher = rollup.watch(config)
    console.log(`[@bun-ui/react][JS] Watching source files...`)

    watcher.on("change", () => {
      console.log(`[@bun-ui/react][JS] File changed, rebuilding...`)
    })
  } else {
    const build = await rollup.rollup(config)

    const outputs: rollup.OutputOptions[] = Array.isArray(config.output)
      ? config.output
      : [config.output!]

    await Promise.all(outputs.map((output) => build.write(output)))

    console.log(`[@bun-ui/react][JS] Generated CJS and ESM files`)

    if (dts) {
      await generateTypes(dir)
      console.log(`[@bun-ui/react][DTS] Generated type definitions`)
    }
  }
}
