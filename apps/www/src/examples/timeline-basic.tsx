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

export const TimelineBasic = () => {
  return (
    <Timeline>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIndicator />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <TimelineTitle>First Event</TimelineTitle>
          <TimelineDescription>
            This is a basic timeline event
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIndicator />
        </TimelineSeparator>
        <TimelineContent>
          <TimelineTitle>Second Event</TimelineTitle>
          <TimelineDescription>
            This is the last event in the timeline
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}
