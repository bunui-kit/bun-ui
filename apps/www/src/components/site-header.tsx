import NextLink from "next/link"
import { IconButton } from "@bun-ui/react"

import { siteConfig } from "@/config/site"
import { HeaderCommand } from "./header-command"
import { HeaderLinks } from "./header-links"
import { GithubIcon } from "./icons"
import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"
import ThemeSwitch from "./theme-switch"

export const SiteHeader = () => {
  return (
    <header className="bg-background/70 sticky top-0 z-50 h-[var(--header-height)] w-full border-b backdrop-blur-sm">
      <div className="flex h-14 items-center gap-2 px-4">
        <MainNav />
        <MobileNav />
        <div className="ml-auto flex flex-1 grow items-center justify-end gap-6">
          <HeaderCommand />
          <div className="flex items-center gap-4">
            <HeaderLinks />
            <div className="flex items-center gap-2">
              <IconButton asChild size="sm">
                <NextLink href={siteConfig.links.github} target="_blank">
                  <GithubIcon className="text-foreground" />
                </NextLink>
              </IconButton>
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
