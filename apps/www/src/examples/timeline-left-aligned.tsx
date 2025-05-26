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
import { CheckCircle2, Code2, FileCode, Rocket, Settings } from "lucide-react"

export const TimelineLeftAligned = () => {
  return (
    <Timeline position="left">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIndicator className="bg-primary">
            <Rocket className="text-primary-foreground h-4 w-4" />
          </TimelineIndicator>
          <TimelineConnector className="bg-primary/50" />
        </TimelineSeparator>
        <TimelineContent>
          <TimelineTitle>Project Kickoff</TimelineTitle>
          <TimelineDescription>January 15, 2024</TimelineDescription>
          <p className="text-muted-foreground mt-2 text-sm">
            Initial project setup and team formation. Defined project scope and
            objectives.
          </p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIndicator className="bg-primary">
            <FileCode className="text-primary-foreground h-4 w-4" />
          </TimelineIndicator>
          <TimelineConnector className="bg-primary/50" />
        </TimelineSeparator>
        <TimelineContent>
          <TimelineTitle>Design Phase</TimelineTitle>
          <TimelineDescription>February 1, 2024</TimelineDescription>
          <p className="text-muted-foreground mt-2 text-sm">
            Completed UI/UX design and created component library. Established
            design system.
          </p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIndicator className="bg-primary">
            <Code2 className="text-primary-foreground h-4 w-4" />
          </TimelineIndicator>
          <TimelineConnector className="bg-primary/50" />
        </TimelineSeparator>
        <TimelineContent>
          <TimelineTitle>Development Started</TimelineTitle>
          <TimelineDescription>March 1, 2024</TimelineDescription>
          <p className="text-muted-foreground mt-2 text-sm">
            Core features implementation. Set up CI/CD pipeline and development
            environment.
          </p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIndicator className="bg-primary">
            <Settings className="text-primary-foreground h-4 w-4" />
          </TimelineIndicator>
          <TimelineConnector className="bg-primary/50" />
        </TimelineSeparator>
        <TimelineContent>
          <TimelineTitle>Testing Phase</TimelineTitle>
          <TimelineDescription>April 1, 2024</TimelineDescription>
          <p className="text-muted-foreground mt-2 text-sm">
            Comprehensive testing and bug fixes. Performance optimization and
            security audit.
          </p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIndicator className="bg-primary">
            <CheckCircle2 className="text-primary-foreground h-4 w-4" />
          </TimelineIndicator>
        </TimelineSeparator>
        <TimelineContent>
          <TimelineTitle>Production Launch</TimelineTitle>
          <TimelineDescription>May 1, 2024</TimelineDescription>
          <p className="text-muted-foreground mt-2 text-sm">
            Successfully deployed to production. Monitoring and maintenance
            phase begins.
          </p>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}
