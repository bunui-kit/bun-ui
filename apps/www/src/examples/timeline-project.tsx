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

export const TimelineProject = () => {
  return (
    <Timeline>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIndicator />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <TimelineTitle>Project Kickoff</TimelineTitle>
          <TimelineDescription>January 15, 2024</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIndicator />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <TimelineTitle>Design Phase</TimelineTitle>
          <TimelineDescription>February 1, 2024</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIndicator />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <TimelineTitle>Development Started</TimelineTitle>
          <TimelineDescription>March 1, 2024</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIndicator />
        </TimelineSeparator>
        <TimelineContent>
          <TimelineTitle>Launch</TimelineTitle>
          <TimelineDescription>April 15, 2024</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}
