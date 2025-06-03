import type { Metadata } from "next"

import "./globals.css"

import { headers } from "next/headers"
import { Alert, AlertTitle, ThemeProvider, Toaster } from "@bun-ui/react"

import { cx } from "@/lib/classnames"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  metadataBase: new URL("https://bun-ui.com"),
  title: "Accessible and Customizable UI Components  | Bun UI",
  description:
    "Build beautiful, accessible, and reusable React components effortlessly.",
  openGraph: {
    title: "Modern React Component Library | Bun UI",
    description:
      "Build beautiful, accessible, and customizable React components with Bun UI. Powered by Radix UI, styled with Tailwind CSS, and built for modern web applications.",
    siteName: "Bun UI",
    type: "website",
    url: "https://bun-ui.com",
    images: [
      {
        url: "https://bun-ui.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Bun UI - Modern React Component Library",
      },
    ],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headerList = await headers()
  const ua = headerList.get("user-agent")?.toLowerCase() || ""
  let osClass = ""
  if (ua.includes("mac")) {
    osClass = "os-macos"
  } else if (ua.includes("linux")) {
    osClass = "os-linux"
  } else if (ua.includes("windows")) {
    osClass = "os-windows"
  }
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cx("scroll-smooth", osClass)}
    >
      <body className="min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system">
          <div className="bg-background relative flex min-h-svh flex-col">
            <Alert
              variant="warning"
              className="flex items-center justify-center rounded-none"
            >
              <AlertTitle>
                The library is still in early development. Breaking changes and
                bugs may occur without prior notice. Thanks for your interest in
                using the library!
              </AlertTitle>
            </Alert>
            <SiteHeader />
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
