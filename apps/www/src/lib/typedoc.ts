/* eslint-disable @typescript-eslint/no-explicit-any  */

// Try to import TypeDoc data, fallback to empty object if file doesn't exist
import typedocData from "../typedoc/typedoc.react.json"

export interface PropInfo {
  name: string
  type: string
  required: boolean
  description?: string
  defaultValue?: string
}

export interface ComponentAPI {
  name: string
  props: PropInfo[]
}

function formatType(type: any): string {
  if (!type) return "any"

  switch (type.type) {
    case "union":
      return type.types.map((t: any) => formatType(t)).join(" | ")
    case "literal":
      return `"${type.value}"`
    case "reference":
      return type.name || "any"
    case "intrinsic":
      return type.name
    case "array":
      return `${formatType(type.elementType)}[]`
    case "conditional":
      return "conditional"
    case "indexedAccess":
      return "indexed"
    case "intersection":
      return type.types.map((t: any) => formatType(t)).join(" & ")
    case "mapped":
      return "mapped"
    case "optional":
      return `${formatType(type.elementType)}?`
    case "predicate":
      return "predicate"
    case "query":
      return "query"
    case "reflection":
      return "object"
    case "rest":
      return `...${formatType(type.elementType)}`
    case "templateLiteral":
      return "string"
    case "tuple":
      return `[${type.elements.map((e: any) => formatType(e)).join(", ")}]`
    case "typeOperator":
      return `${type.operator} ${formatType(type.target)}`
    case "typeParameter":
      return type.name
    default:
      return "any"
  }
}

function extractJSDocDescription(comment: any): string | undefined {
  if (!comment?.summary) return undefined

  let description = comment.summary
    .map((part: any) => {
      if (part.kind === "text") return part.text
      if (part.kind === "code") return `\`${part.text}\``
      return ""
    })
    .join("")
    .trim()

  // Convert inline code with double backticks to proper markdown code blocks
  // This handles cases like "Use ``IconButton`` component with ``size="sm" | "md" | "lg"``"
  description = description.replace(/``([^`]+)``/g, "`$1`")

  return description
}

function extractDefaultValue(comment: any): string | undefined {
  if (!comment?.blockTags) return undefined

  const defaultTag = comment.blockTags.find(
    (tag: any) => tag.tag === "@default"
  )
  if (defaultTag?.content) {
    return defaultTag.content
      .map((part: any) => {
        if (part.kind === "code") {
          // Remove markdown code blocks and extract just the value
          const text = part.text
            .replace(/```ts\n?/g, "")
            .replace(/```/g, "")
            .trim()
          return text
        }
        return ""
      })
      .join("")
      .trim()
  }

  return undefined
}

function isOptional(flags: any): boolean {
  return (
    flags &&
    typeof flags === "object" &&
    "isOptional" in flags &&
    flags.isOptional === true
  )
}

function hasComment(prop: any): boolean {
  return (
    prop &&
    typeof prop === "object" &&
    "comment" in prop &&
    prop.comment != null
  )
}

function hasDefaultValue(prop: any): boolean {
  return (
    prop &&
    typeof prop === "object" &&
    "defaultValue" in prop &&
    prop.defaultValue != null
  )
}

function extractPropsFromReflection(declaration: any): PropInfo[] {
  if (!declaration?.children) return []

  const props: PropInfo[] = []

  for (const prop of declaration.children) {
    if (
      !prop ||
      typeof prop !== "object" ||
      !("name" in prop) ||
      !("type" in prop)
    ) {
      continue
    }

    const typeString = formatType(prop.type)
    const isRequired = !isOptional(prop.flags)

    // Use type assertion to access dynamic properties
    const propAny = prop as any
    const description = hasComment(propAny)
      ? extractJSDocDescription(propAny.comment)
      : undefined
    const defaultValue = hasDefaultValue(propAny)
      ? propAny.defaultValue?.value
      : extractDefaultValue(propAny.comment)

    props.push({
      name: prop.name,
      type: typeString,
      required: isRequired,
      description: description || undefined,
      defaultValue: defaultValue || undefined,
    })
  }

  return props
}

function extractPropsFromTypeDoc(propInterface: string): PropInfo[] {
  const propsInterfaceName = `${propInterface}`

  // Find the props interface in the TypeDoc data
  const propsInterface = typedocData.children?.find(
    (child: any) => child.name === propsInterfaceName
  )

  if (!propsInterface) {
    return []
  }

  const props: PropInfo[] = []

  // Handle intersection types
  if (
    propsInterface.type?.type === "intersection" &&
    propsInterface.type.types
  ) {
    for (const type of propsInterface.type.types) {
      if (type.type === "reflection" && type.declaration) {
        const reflectionProps = extractPropsFromReflection(type.declaration)
        props.push(...reflectionProps)
      }
    }
  }
  // Handle direct reflection types
  else if (
    propsInterface.type?.type === "reflection" &&
    propsInterface.type.declaration
  ) {
    const reflectionProps = extractPropsFromReflection(
      propsInterface.type.declaration
    )
    props.push(...reflectionProps)
  }
  // Handle direct children (like ButtonProps, BadgeProps)
  else if (propsInterface.children) {
    for (const prop of propsInterface.children) {
      if (
        !prop ||
        typeof prop !== "object" ||
        !("name" in prop) ||
        !("type" in prop)
      ) {
        continue
      }

      const typeString = formatType(prop.type)
      const isRequired = !isOptional(prop.flags)

      // Use type assertion to access dynamic properties
      const propAny = prop as any
      const description = hasComment(propAny)
        ? extractJSDocDescription(propAny.comment)
        : undefined
      const defaultValue = hasDefaultValue(propAny)
        ? propAny.defaultValue?.value
        : extractDefaultValue(propAny.comment)

      // Skip props that are inherited from HTML attributes (like className, style, etc.)
      // unless they have specific documentation
      if (!description && !isRequired && typeString === "string") {
        continue
      }

      props.push({
        name: prop.name,
        type: typeString,
        required: isRequired,
        description: description || undefined,
        defaultValue: defaultValue || undefined,
      })
    }
  }

  // Sort props: required first, then alphabetically
  return props.sort((a, b) => {
    if (a.required && !b.required) return -1
    if (!a.required && b.required) return 1
    return a.name.localeCompare(b.name)
  })
}

export function getComponentAPI(componentName: string): ComponentAPI | null {
  const props = extractPropsFromTypeDoc(componentName)

  if (props.length === 0) {
    return null
  }

  return {
    name: componentName,
    props,
  }
}
