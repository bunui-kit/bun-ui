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
import { CheckCircle2, Clock, Coffee, FileText, Mail } from "lucide-react"

export const TimelineAlternating = () => {
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIndicator>
            <CheckCircle2 className="h-4 w-4" />
          </TimelineIndicator>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <div className="bg-primary/10 rounded-lg p-4">
            <TimelineTitle>Morning Standup</TimelineTitle>
            <TimelineDescription>9:00 AM</TimelineDescription>
            <p className="mt-2 text-sm">
              Team sync completed. Discussed sprint goals and blockers.
            </p>
          </div>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIndicator>
            <Coffee className="h-4 w-4" />
          </TimelineIndicator>
          <TimelineConnector className="bg-muted/50" />
        </TimelineSeparator>
        <TimelineContent>
          <div className="bg-primary/10 rounded-lg p-4">
            <TimelineTitle>Break Time</TimelineTitle>
            <TimelineDescription>10:30 AM</TimelineDescription>
            <p className="mt-2 text-sm">Coffee break and team social time.</p>
          </div>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIndicator>
            <FileText className="h-4 w-4" />
          </TimelineIndicator>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <div className="bg-primary/10 rounded-lg p-4">
            <TimelineTitle>Documentation Review</TimelineTitle>
            <TimelineDescription>11:00 AM</TimelineDescription>
            <p className="mt-2 text-sm">
              Updated API documentation and reviewed pull requests.
            </p>
          </div>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIndicator>
            <Mail className="h-4 w-4" />
          </TimelineIndicator>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <div className="bg-primary/10 rounded-lg p-4">
            <TimelineTitle>Client Meeting</TimelineTitle>
            <TimelineDescription>2:00 PM</TimelineDescription>
            <p className="mt-2 text-sm">
              Weekly sync with client team to discuss progress.
            </p>
          </div>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIndicator>
            <Clock className="h-4 w-4" />
          </TimelineIndicator>
        </TimelineSeparator>
        <TimelineContent>
          <div className="bg-primary/10 rounded-lg p-4">
            <TimelineTitle>End of Day Review</TimelineTitle>
            <TimelineDescription>5:00 PM</TimelineDescription>
            <p className="mt-2 text-sm">
              Daily progress review and planning for tomorrow.
            </p>
          </div>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}
