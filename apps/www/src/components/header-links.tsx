"use client"

import NextLink from "next/link"
import { usePathname } from "next/navigation"

import { cx } from "@/lib/classnames"

interface HeaderLinksProps {
  className?: string
}

export const HeaderLinks = ({ className }: HeaderLinksProps) => {
  const currentPath = usePathname()
  return (
    <nav className={cx("text-foreground/60 flex gap-x-6 text-sm", className)}>
      <NextLink
        href="/docs"
        className={cx(currentPath.startsWith("/docs") && "text-foreground")}
      >
        Docs
      </NextLink>
      <NextLink
        href="/components"
        className={cx(
          currentPath.startsWith("/components") && "text-foreground"
        )}
      >
        Components
      </NextLink>
      <NextLink
        href="/examples"
        className={cx(currentPath.startsWith("/examples") && "text-foreground")}
      >
        Examples
      </NextLink>
      <NextLink
        href="/blog"
        className={cx(currentPath.startsWith("/blog") && "text-foreground")}
      >
        Blog
      </NextLink>
    </nav>
  )
}
