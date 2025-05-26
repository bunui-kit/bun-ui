import fs from "fs"
import { resolve } from "path"
import { build } from "tsup"

const components = fs.readdirSync(resolve(__dirname, "../src/components"))

const hooks = fs.readdirSync(resolve(__dirname, "../src/hooks"))

async function buildMain() {
  // Read and transform index.ts
  const distDir = resolve(__dirname, "../dist")
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true })
  }
  const indexContent = fs.readFileSync(
    resolve(__dirname, "../src/index.ts"),
    "utf8"
  )
  const mjstransformedContent = indexContent.replace(
    /from ['"]\.\/(components|hooks)\/([^'"]+)['"]/g,
    'from "./$2/index.mjs"'
  )

  const transformedContent = mjstransformedContent.replace(
    /from ['"]\.\/components\/([^'"]+)['"]/g,
    'from "./$1"'
  )

  // Write index.mjs
  fs.writeFileSync(resolve(__dirname, "../dist/index.mjs"), transformedContent)
  // Write index.d.ts
  fs.writeFileSync(
    resolve(__dirname, "../dist/index.d.mts"),
    transformedContent
  )

  console.log("Building theme.css...")
  const cssContent = fs.readFileSync(
    resolve(__dirname, "../src/styles/theme.css"),
    "utf8"
  )

  // Write theme.css
  fs.writeFileSync(resolve(__dirname, "../dist/theme.css"), cssContent)
}

async function buildComponent(component: string) {
  const sourceFile = resolve(
    __dirname,
    `../src/components/${component}/${component}.tsx`
  )
  const hasUseClient =
    fs.existsSync(sourceFile) &&
    fs.readFileSync(sourceFile, "utf8").startsWith('"use client"')

  // Get list of exported components
  const exportedComponents = fs
    .readdirSync(resolve(__dirname, "../src/components"))
    .filter((dir) =>
      fs.statSync(resolve(__dirname, `../src/components/${dir}`)).isDirectory()
    )

  await build({
    entry: [`src/components/${component}/index.ts`],
    outDir: `dist/${component}`,
    format: ["esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    target: "esnext",
    splitting: false,
    silent: true,
    external: [
      "react",
      "react-dom",
      "@bun-ui/react",
      ...exportedComponents.map((comp) => `../${comp}`),
    ],
    esbuildOptions(options) {
      options.loader = {
        ...options.loader,
        ".tsx": "tsx",
      }
      options.plugins = [
        {
          name: "transform-imports",
          setup(build) {
            build.onResolve({ filter: /^\.\.\/.*/ }, (args) => {
              // Check if the import is a component
              const importPath = args.path
              const componentName = importPath.split("/").pop()
              if (componentName && exportedComponents.includes(componentName)) {
                return {
                  path: `@bun-ui/react`,
                  external: true,
                }
              }
              return null
            })
          },
        },
      ]
    },
  })

  if (hasUseClient) {
    const componentFile = resolve(__dirname, `../dist/${component}/index.mjs`)
    const content = fs.readFileSync(componentFile, "utf8")
    if (!content.startsWith('"use client"')) {
      fs.writeFileSync(componentFile, `"use client";\n\n${content}`)
    }
  }
}

async function buildHook(hook: string) {
  await build({
    entry: [`src/hooks/${hook}/index.ts`],
    outDir: `dist/${hook}`,
    format: ["esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    target: "esnext",
    silent: true,
    splitting: false,
    external: ["react", "react-dom", "@bun-ui/react"],
  })
}

async function buildAll() {
  console.log("Building main entry...")
  await buildMain()

  const componentArg = process.argv[2]

  if (componentArg) {
    if (
      !fs
        .statSync(resolve(__dirname, `../src/components/${componentArg}`))
        .isDirectory()
    ) {
      console.error(`Component ${componentArg} not found.`)
      process.exit(1)
    }
    console.log(`Building ${componentArg}...`)
    await buildComponent(componentArg)
  } else {
    console.log("Building components...")
    for (const component of components) {
      if (
        !fs
          .statSync(resolve(__dirname, `../src/components/${component}`))
          .isDirectory()
      ) {
        continue
      }
      console.log(`Building ${component}...`)
      await buildComponent(component)
    }

    console.log("Building hooks...")
    for (const hook of hooks) {
      if (
        !fs.statSync(resolve(__dirname, `../src/hooks/${hook}`)).isDirectory()
      ) {
        continue
      }
      console.log(`Building ${hook}...`)
      await buildHook(hook)
    }
  }
}

buildAll().catch(console.error)
