import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@bun-ui/react"
import { Ban, CheckCircle2, Rocket } from "lucide-react"

export const TimelineCustomization = () => {
  return (
    <Timeline>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIndicator className="bg-primary">
            <CheckCircle2 className="text-primary-foreground h-4 w-4" />
          </TimelineIndicator>
          <TimelineConnector className="bg-primary/50" />
        </TimelineSeparator>
        <TimelineContent>
          <TimelineTitle>Completed</TimelineTitle>
          <TimelineDescription>Task completed successfully</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIndicator className="bg-accent">
            <Rocket className="text-accent-foreground h-4 w-4" />
          </TimelineIndicator>
          <TimelineConnector className="bg-accent/50" />
        </TimelineSeparator>
        <TimelineContent>
          <TimelineTitle>In Progress</TimelineTitle>
          <TimelineDescription>
            Currently working on this task
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIndicator className="bg-destructive">
            <Ban className="text-destructive-foreground h-4 w-4" />
          </TimelineIndicator>
        </TimelineSeparator>
        <TimelineContent>
          <TimelineTitle>Blocked</TimelineTitle>
          <TimelineDescription>
            Task is blocked by dependencies
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}
