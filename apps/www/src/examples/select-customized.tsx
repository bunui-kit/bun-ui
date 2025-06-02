import { Select, SelectItem } from "@bun-ui/react"
import { Apple, Banana } from "lucide-react"

export function SelectCustomized() {
  return (
    <Select
      placeholder="Pick your favorite"
      menuPosition="popper"
      label="Custom Styled Select"
      classes={{
        label: "text-primary font-semibold",
        trigger: "border-primary/20 hover:border-primary/40 w-[200px]",
        value: "text-primary",
        content: "bg-primary/5 border-primary/20",
        viewport: "p-2",
      }}
    >
      <SelectItem
        value="apple"
        classes={{
          root: "hover:bg-primary/10",
          text: "text-red-500",
          indicator: "text-red-500",
          icon: "text-red-500",
        }}
      >
        <div className="flex items-center gap-2">
          <Apple className="h-4 w-4 text-red-500" />
          Apple
        </div>
      </SelectItem>
      <SelectItem
        value="banana"
        classes={{
          root: "hover:bg-primary/10",
          text: "text-yellow-500",
          indicator: "text-yellow-500",
          icon: "text-yellow-500",
        }}
      >
        <div className="flex items-center gap-2">
          <Banana className="h-4 w-4 text-yellow-500" />
          Banana
        </div>
      </SelectItem>
    </Select>
  )
}
