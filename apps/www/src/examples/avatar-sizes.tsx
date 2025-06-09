import { Avatar, AvatarImage } from "@bun-ui/react"

export const AvatarSizes = () => (
  <div className="flex items-center gap-4">
    <Avatar size="sm">
      <AvatarImage src="/avatar.png" />
    </Avatar>
    <Avatar>
      <AvatarImage src="/avatar.png" />
    </Avatar>
    <Avatar size="lg">
      <AvatarImage src="/avatar.png" />
    </Avatar>
    <Avatar size="xl">
      <AvatarImage src="/avatar.png" />
    </Avatar>
  </div>
)
