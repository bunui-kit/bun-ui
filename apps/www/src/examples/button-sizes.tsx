import { Button } from "@bun-ui/react"

export const ButtonSizes = () => {
  return (
    <div className="flex flex-col items-center gap-4 md:flex-row">
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}
