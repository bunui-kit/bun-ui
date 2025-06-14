import { Typography } from "@bun-ui/react"

export const TypographySizes = () => {
  return (
    <div className="space-y-4">
      <Typography fontSize="xs">Extra Small Text (xs)</Typography>
      <Typography fontSize="sm">Small Text (sm)</Typography>
      <Typography fontSize="md">Medium Text (md)</Typography>
      <Typography fontSize="lg">Large Text (lg)</Typography>
      <Typography fontSize="xl">Extra Large Text (xl)</Typography>
    </div>
  )
}
