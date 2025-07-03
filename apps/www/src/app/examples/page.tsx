import Link from "next/link"
import { Card, CardContent, CardHeader } from "@bun-ui/react"
import { Activity, Bot, FileText, LineChart, Settings } from "lucide-react"

const examples = [
  {
    title: "AI Chat Application",
    description:
      "A ChatGPT-style AI chat interface with file upload, model selection, and conversation management.",
    icon: Bot,
    href: "/examples/ai-chat",
    category: "AI & Chat",
  },
  {
    title: "Analytics Dashboard",
    description:
      "A comprehensive analytics dashboard showcasing data visualization and metrics.",
    icon: LineChart,
    href: "/examples/analytics",
    category: "Dashboard",
  },
  {
    title: "Task Management",
    description:
      "A task management interface with drag-and-drop functionality and progress tracking.",
    icon: Activity,
    href: "/examples/task-management",
    category: "Dashboard",
  },
  {
    title: "File Management",
    description:
      "A file management system with upload capabilities and file organization.",
    icon: FileText,
    href: "/examples/file-management",
    category: "Dashboard",
  },
  {
    title: "Settings Panel",
    description:
      "A settings interface demonstrating form controls and configuration options.",
    icon: Settings,
    href: "/examples/settings",
    category: "Dashboard",
  },
]

export default function ExamplesPage() {
  return (
    <div className="container mx-auto max-w-7xl p-8">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">Example Dashboards</h1>
        <p className="text-muted-foreground text-lg">
          Explore our collection of beautiful dashboards and examples built with
          Bun UI. Each example demonstrates different component combinations and
          best practices for building modern web applications.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {examples.map((example) => (
          <Link key={example.href} href={example.href}>
            <Card className="flex h-full min-h-[250px] flex-col transition-all hover:shadow-lg">
              <CardHeader className="flex items-center gap-2">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                  <example.icon className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">{example.title}</h3>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between">
                <p className="text-muted-foreground">{example.description}</p>
                <div className="text-muted-foreground text-sm">
                  {example.category}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
