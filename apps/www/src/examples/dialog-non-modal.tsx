import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Select,
  SelectItem,
  Switch,
} from "@bun-ui/react"

export const DialogNonModal = () => {
  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button variant="text" size="sm">
          Quick Settings
        </Button>
      </DialogTrigger>
      <DialogContent closeOnClickOutside={false} className="w-80">
        <DialogTitle>Quick Settings</DialogTitle>
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Dark Mode</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Notifications</span>
            <Switch defaultChecked />
          </div>
          <div className="space-y-2">
            <span className="text-sm">Language</span>
            <Select defaultValue="en">
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
            </Select>
          </div>
          <div className="space-y-2">
            <span className="text-sm">Font Size</span>
            <Select defaultValue="medium">
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
