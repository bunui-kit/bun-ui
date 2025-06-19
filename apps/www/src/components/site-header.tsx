import { GithubLink } from "./github-link"
import { HeaderCommand } from "./header-command"
import { HeaderLinks } from "./header-links"
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
            <HeaderLinks className="hidden sm:flex" />
            <div className="flex items-center gap-2">
              <GithubLink />
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
