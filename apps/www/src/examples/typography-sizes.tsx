import { Typography } from "@bun-ui/react"

export const TypographySizes = () => {
  return (
    <div className="space-y-4">
      <Typography fontSize="xs">Extra Small Text (xs)</Typography>
      <Typography fontSize="sm">Small Text (sm)</Typography>
      <Typography fontSize="md">Medium Text (md)</Typography>
      <Typography fontSize="lg">Large Text (lg)</Typography>
      <Typography fontSize="xl">Extra Large Text (xl)</Typography>
      <Typography fontSize="2xl">2X Large Text (2xl)</Typography>
      <Typography fontSize="3xl">3X Large Text (3xl)</Typography>
      <Typography fontSize="4xl">4X Large Text (4xl)</Typography>
    </div>
  )
}
