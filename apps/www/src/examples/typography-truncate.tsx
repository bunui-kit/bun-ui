import { Typography } from "@bun-ui/react"

export const TypographyTruncate = () => {
  return (
    <div className="w-64 space-y-4">
      <Typography>
        This is a very long text that will not be truncated and will wrap to
        multiple lines
      </Typography>
      <Typography truncate>
        This is a very long text that will be truncated with an ellipsis when it
        exceeds the container width
      </Typography>
    </div>
  )
}
