import React from "react"
import NextLink from "next/link"
import { Button, Skeleton } from "@bun-ui/react"

import { siteConfig } from "@/config/site"
import { GithubIcon } from "./icons"

export const GithubLink = () => {
  return (
    <Button asChild size="sm" color="neutral" variant="text">
      <NextLink
        href={siteConfig.links.github}
        target="_blank"
        className="flex items-center gap-2"
      >
        <GithubIcon className="text-foreground" />
        <React.Suspense fallback={<Skeleton height="2rem" width="5rem" />}>
          <StarCount />
        </React.Suspense>
      </NextLink>
    </Button>
  )
}

const StarCount = async () => {
  const data = await fetch("https://api.github.com/repos/bunui-kit/bun-ui", {
    // cache for 1 day
    next: { revalidate: 86400 },
  })

  const json = await data.json()
  return <span className="text-foreground/60">{json.stargazers_count}</span>
}
