import { Metadata } from "next"

import { ExamplesNav } from "@/components/examples-nav"

export const metadata: Metadata = {
  title: "Examples | Bun UI",
  description:
    "Explore real-world examples of Bun UI components in action, including analytics dashboards, task management, file management, and settings panels.",
  openGraph: {
    title: "Examples | Bun UI",
    description:
      "Explore real-world examples of Bun UI components in action, including analytics dashboards, task management, file management, and settings panels.",
    type: "website",
    url: "https://bun-ui.com/examples",
  },
  keywords: [
    "bun ui",
    "react components",
    "ui examples",
    "dashboard examples",
    "task management",
    "file management",
    "settings panel",
    "analytics dashboard",
    "component library",
  ],
}

export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-[calc(100vh-60px-45.8px)]">
      <div className="sticky top-[var(--header-height)] left-0 hidden h-[calc(100vh-var(--header-height))] w-[300px] shrink-0 border-r lg:block">
        <ExamplesNav />
      </div>
      <div className="flex-1">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
