import { IconButton } from "@bun-ui/react"
import { StarIcon } from "lucide-react"

export const IconButtonColor = () => {
  return (
    <div style={{ display: "flex", gap: 12 }}>
      <IconButton color="primary" aria-label="Primary">
        <StarIcon />
      </IconButton>
      <IconButton color="secondary" aria-label="Secondary">
        <StarIcon />
      </IconButton>
      <IconButton color="destructive" aria-label="Destructive">
        <StarIcon />
      </IconButton>
      <IconButton color="accent" aria-label="Accent">
        <StarIcon />
      </IconButton>
      <IconButton color="success" aria-label="Success">
        <StarIcon />
      </IconButton>
      <IconButton color="neutral" aria-label="Neutral">
        <StarIcon />
      </IconButton>
    </div>
  )
}
