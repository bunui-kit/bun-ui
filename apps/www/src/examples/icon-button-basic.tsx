import { IconButton } from "@bun-ui/react"
import { StarIcon } from "lucide-react"

export const IconButtonBasic = () => {
  return (
    <IconButton aria-label="Favorite">
      <StarIcon />
    </IconButton>
  )
}
