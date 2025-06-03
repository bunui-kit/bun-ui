import { IconButton } from "@bun-ui/react"
import { StarIcon } from "lucide-react"

export const IconButtonSize = () => {
  return (
    <div className="flex items-center gap-2">
      <IconButton size="sm" aria-label="Small">
        <StarIcon />
      </IconButton>
      <IconButton size="md" aria-label="Medium">
        <StarIcon />
      </IconButton>
      <IconButton size="lg" aria-label="Large">
        <StarIcon />
      </IconButton>
    </div>
  )
}
