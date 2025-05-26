import {
  Avatar,
  AvatarImage,
  Badge,
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@bun-ui/react"
import {
  CheckCircle2,
  Code2,
  FileCode,
  GitBranch,
  GitPullRequest,
  MessageSquare,
  Settings,
} from "lucide-react"

export const TimelineActivity = () => {
  return (
    <Timeline>
      <TimelineItem className="before:flex-0">
        <TimelineSeparator>
          <TimelineIndicator>
            <GitBranch className="h-4 w-4" />
          </TimelineIndicator>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className="bg-card rounded-lg border p-4">
          <TimelineTitle className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatar.png" />
            </Avatar>
            <div>
              <p className="text-sm">Sarah Johnson</p>
              <p className="text-muted-foreground text-xs">2 hours ago</p>
            </div>
          </TimelineTitle>
          <p className="mt-3 text-sm">
            Created a new branch{" "}
            <code className="bg-muted rounded px-1 py-0.5">
              feature/timeline-component
            </code>
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="outlined">feature</Badge>
            <Badge variant="outlined">timeline</Badge>
          </div>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem className="before:flex-0">
        <TimelineSeparator>
          <TimelineIndicator>
            <Code2 className="h-4 w-4" />
          </TimelineIndicator>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className="bg-card rounded-lg border p-4">
          <TimelineTitle className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatar.png" />
            </Avatar>
            <div>
              <p className="text-sm">Sarah Johnson</p>
              <p className="text-muted-foreground text-xs">1 hour ago</p>
            </div>
          </TimelineTitle>
          <p className="mt-3 text-sm">
            Added Timeline component with support for different positions and
            custom indicators
          </p>
          <div className="bg-muted/50 mt-3 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <FileCode className="mt-1 h-4 w-4 shrink-0" />
              <div>
                <p className="text-sm font-medium">
                  packages/react/src/components/timeline/timeline.tsx
                </p>
                <p className="text-muted-foreground text-sm">
                  +120 lines added, -0 lines removed
                </p>
              </div>
            </div>
          </div>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem className="before:flex-0">
        <TimelineSeparator>
          <TimelineIndicator>
            <GitPullRequest className="h-4 w-4" />
          </TimelineIndicator>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className="bg-card rounded-lg border p-4">
          <TimelineTitle className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatar.png" />
            </Avatar>
            <div>
              <p className="text-sm">Sarah Johnson</p>
              <p className="text-muted-foreground text-xs">45 minutes ago</p>
            </div>
          </TimelineTitle>
          <p className="mt-3 text-sm">
            Opened pull request #42: Add Timeline component
          </p>
          <div className="bg-muted/50 mt-3 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <MessageSquare className="mt-1 h-4 w-4 shrink-0" />
              <div>
                <p className="text-sm font-medium">Pull Request Description</p>
                <p className="text-muted-foreground text-sm">
                  Added a new Timeline component with support for different
                  positions (left, right, alternate) and custom indicators.
                  Includes documentation and examples.
                </p>
              </div>
            </div>
          </div>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem className="before:flex-0">
        <TimelineSeparator>
          <TimelineIndicator>
            <Settings className="h-4 w-4" />
          </TimelineIndicator>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className="bg-card rounded-lg border p-4">
          <TimelineTitle className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatar2.png" />
            </Avatar>
            <div>
              <p className="text-sm">Alex Thompson</p>
              <p className="text-muted-foreground text-xs">30 minutes ago</p>
            </div>
          </TimelineTitle>
          <p className="mt-3 text-sm">
            Added CI checks for the Timeline component
          </p>
          <div className="bg-muted/50 mt-3 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <FileCode className="mt-1 h-4 w-4 shrink-0" />
              <div>
                <p className="text-sm font-medium">
                  .github/workflows/timeline.yml
                </p>
                <p className="text-muted-foreground text-sm">
                  +45 lines added, -0 lines removed
                </p>
              </div>
            </div>
          </div>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem className="before:flex-0">
        <TimelineSeparator>
          <TimelineIndicator>
            <CheckCircle2 className="h-4 w-4" />
          </TimelineIndicator>
        </TimelineSeparator>
        <TimelineContent className="bg-card rounded-lg border p-4">
          <TimelineTitle className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatar3.png" />
            </Avatar>
            <div>
              <p className="text-sm">Mike Chen</p>
              <p className="text-muted-foreground text-xs">15 minutes ago</p>
            </div>
          </TimelineTitle>
          <p className="mt-3 text-sm">Approved and merged pull request #42</p>
          <div className="bg-muted/50 mt-3 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <MessageSquare className="mt-1 h-4 w-4 shrink-0" />
              <div>
                <p className="text-sm font-medium">Review Comment</p>
                <p className="text-muted-foreground text-sm">
                  Great work on the Timeline component! The implementation is
                  clean and the documentation is thorough. Ready to merge.
                </p>
              </div>
            </div>
          </div>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}
