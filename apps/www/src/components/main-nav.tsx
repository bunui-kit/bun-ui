import Link from "next/link"
import { Typography } from "@bun-ui/react"

import { BunUIIcon } from "./icons"
import { VersionBadge } from "./version-badge"

export function MainNav() {
  return (
    <div className="hidden items-center gap-2 lg:flex">
      <Link href="/" className="flex items-center gap-2 px-2">
        <BunUIIcon width={42} height={42} />
        <Typography className="brand-font hidden font-mono font-bold lg:inline-block">
          Bun UI
        </Typography>
      </Link>
      <VersionBadge />
    </div>
  )
}
