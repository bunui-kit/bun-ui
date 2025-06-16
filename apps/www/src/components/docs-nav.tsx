"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { DocsConfig, SideBarNavItem } from "@/config/docs"
import { cx } from "@/lib/classnames"

interface DocsNavProps {
  config: DocsConfig
}

export const DocsNav = ({ config }: DocsNavProps) => {
  const pathname = usePathname()
  const items = config.sideBarNavs
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Auto-scroll to the active item when pathname changes
    const activeLink = navRef.current?.querySelector(`a[href="${pathname}"]`)
    if (activeLink && navRef.current) {
      const containerRect = navRef.current.getBoundingClientRect()
      const linkRect = activeLink.getBoundingClientRect()
      const scrollTop =
        linkRect.top -
        containerRect.top -
        containerRect.height / 2 +
        navRef.current.scrollTop

      navRef.current.scrollTo({
        top: scrollTop,
        behavior: "instant",
      })
    }
  }, [pathname])

  return (
    <aside className="sticky top-[var(--header-height)] hidden h-[calc(100vh-var(--header-height))] w-[300px] shrink-0 border-r lg:block">
      <div
        ref={navRef}
        className="flex h-full flex-col overflow-y-auto scroll-smooth px-2 py-4 pb-20"
      >
        {items.map((item, index) => (
          <div key={index} className="flex flex-col gap-1">
            <h4 className="rounded-md px-2 py-1 text-sm font-medium">
              {item.title}{" "}
              {item.label && (
                <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none font-normal text-[#000000] no-underline group-hover:no-underline">
                  {item.label}
                </span>
              )}
            </h4>
            {item?.items?.length && (
              <DocsNavItems items={item.items} pathname={pathname} />
            )}
          </div>
        ))}
      </div>
    </aside>
  )
}

const DocsNavItems = ({
  items,
  pathname,
}: {
  items: SideBarNavItem[]
  pathname: string | null
}) => {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max gap-0.5 text-sm">
      {items.map((item, index) =>
        item.url && !item.disabled ? (
          <Link
            key={index}
            href={item.url}
            data-active={pathname === item.url ? "" : undefined}
            className={cx(
              "not-data-[active]:hover:bg-popover/30 not-data-[active]:hover:text-foreground relative flex h-8 w-full items-center rounded-lg px-5 after:absolute after:inset-x-0 after:inset-y-[-2px] after:rounded-lg",
              pathname === item.url
                ? "bg-popover text-primary font-medium"
                : "text-foreground/70 font-normal"
            )}
            target={item.external ? "_blank" : "_self"}
            rel={item.external ? "noreferrer" : ""}
          >
            {item.title}
            {item.label && (
              <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                {item.label}
              </span>
            )}
          </Link>
        ) : (
          <span
            key={index}
            className={cx(
              "text-muted-foreground flex w-full cursor-not-allowed items-center rounded-md p-2 hover:underline",
              item.disabled && "cursor-not-allowed opacity-60"
            )}
          >
            {item.title}
            {item.label && (
              <span className="bg-muted text-muted-foreground ml-2 rounded-md px-1.5 py-0.5 text-xs leading-none no-underline group-hover:no-underline">
                {item.label}
              </span>
            )}
          </span>
        )
      )}
    </div>
  ) : null
}
