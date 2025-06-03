import { IconButton } from "@bun-ui/react"
import { ExternalLinkIcon } from "lucide-react"

export const IconButtonAsChild = () => {
  return (
    <IconButton asChild aria-label="Open in new tab">
      <a href="https://bun-ui.com" target="_blank" rel="noopener noreferrer">
        <ExternalLinkIcon />
      </a>
    </IconButton>
  )
}
