import { Button } from "@bun-ui/react"

export const ButtonColors = () => {
  return (
    <div className="grid grid-cols-1">
      <div className="flex flex-col">
        <p className="my-2 text-sm">Primary</p>
        <div className="flex items-center gap-4">
          <Button color="primary">Contained</Button>
          <Button color="primary" variant="text">
            Text
          </Button>
          <Button color="primary" variant="outlined">
            Outlined
          </Button>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="my-2 text-sm">Secondary</p>
        <div className="flex items-center gap-4">
          <Button color="secondary">Contained</Button>
          <Button color="secondary" variant="text">
            Text
          </Button>
          <Button color="secondary" variant="outlined">
            Outlined
          </Button>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="my-2 text-sm">Accent</p>
        <div className="flex items-center gap-4">
          <Button color="accent">Contained</Button>
          <Button color="accent" variant="text">
            Text
          </Button>
          <Button color="accent" variant="outlined">
            Outlined
          </Button>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="my-2 text-sm">Neutral</p>
        <div className="flex items-center gap-4">
          <Button color="neutral">Contained</Button>
          <Button color="neutral" variant="text">
            Text
          </Button>
          <Button color="neutral" variant="outlined">
            Outlined
          </Button>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="my-2 text-sm">Success</p>
        <div className="flex items-center gap-4">
          <Button color="success">Contained</Button>
          <Button color="success" variant="text">
            Text
          </Button>
          <Button color="success" variant="outlined">
            Outlined
          </Button>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="my-2 text-sm">Destructive</p>
        <div className="flex items-center gap-4">
          <Button color="destructive">Contained</Button>
          <Button color="destructive" variant="text">
            Text
          </Button>
          <Button color="destructive" variant="outlined">
            Outlined
          </Button>
        </div>
      </div>
    </div>
  )
}
