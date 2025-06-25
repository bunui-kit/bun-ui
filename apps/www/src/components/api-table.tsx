import { Link, Typography } from "@bun-ui/react"
import ReactMarkdown from "react-markdown"

import { getComponentAPI } from "@/lib/typedoc"

interface APITableProps {
  interfaceName: string
}

// Simple component to render descriptions with inline code formatting
function DescriptionRenderer({ description }: { description: string }) {
  if (!description) return null

  return (
    <ReactMarkdown
      components={{
        p({ ...props }) {
          return (
            <Typography fontSize="sm" className="not-first:mt-1" {...props} />
          )
        },
        code({ children, ...props }) {
          return (
            <code
              className="bg-muted rounded px-1 py-0.5 font-mono text-sm"
              {...props}
            >
              {children}
            </code>
          )
        },
        a({ children, href, color, ...props }) {
          return (
            <Link href={href} color="primary" target="_blank" {...props}>
              {children}
            </Link>
          )
        },
      }}
    >
      {description}
    </ReactMarkdown>
  )
}

export function APITable({ interfaceName }: APITableProps) {
  const api = getComponentAPI(interfaceName)

  if (!api || api.props.length === 0) {
    return null
  }

  return (
    <div className="mt-8">
      <div className="overflow-x-auto">
        <table className="border-border w-full border-collapse border">
          <thead>
            <tr className="bg-muted/50">
              <th className="border-border border px-4 py-2 text-left font-medium">
                Prop
              </th>
              <th className="border-border border px-4 py-2 text-left font-medium">
                Type
              </th>
              <th className="border-border border px-4 py-2 text-left font-medium">
                Default
              </th>
              <th className="border-border border px-4 py-2 text-left font-medium">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {api.props.map((prop) => (
              <tr key={prop.name} className="hover:bg-muted/30">
                <td className="border-border border px-4 py-2 font-mono text-sm">
                  <div className="flex items-center gap-2">
                    {prop.name}
                    {prop.required && (
                      <Typography fontWeight="bold">*</Typography>
                    )}
                  </div>
                </td>
                <td className="border-border border px-4 py-2">
                  <code className="bg-muted rounded px-1 py-0.5 text-sm">
                    {prop.type}
                  </code>
                </td>
                <td className="border-border border px-4 py-2">
                  {prop.defaultValue ? (
                    <code className="bg-muted rounded px-1 py-0.5 text-sm">
                      {prop.defaultValue}
                    </code>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </td>
                <td className="border-border border px-4 py-2 text-sm">
                  <DescriptionRenderer description={prop.description ?? ""} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
