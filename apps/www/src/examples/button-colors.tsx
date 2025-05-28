import { Button } from "@bun-ui/react"

export const ButtonColors = () => {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Button color="primary">Primary</Button>
      <Button color="secondary" variant="text">
        Secondary
      </Button>
      <Button color="destructive" variant="outlined">
        Destructive
      </Button>
      <Button color="neutral">Neutral</Button>
      <Button color="accent">Accent</Button>
      <Button color="success">Success</Button>
    </div>
  )
}
