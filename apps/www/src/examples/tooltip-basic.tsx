import { IconButton, Tooltip } from "@bun-ui/react"
import { Trash2 } from "lucide-react"

export const TooltipBasic = () => {
  return (
    <Tooltip content="Delete">
      <IconButton color="neutral">
        <Trash2 />
      </IconButton>
    </Tooltip>
  )
}
