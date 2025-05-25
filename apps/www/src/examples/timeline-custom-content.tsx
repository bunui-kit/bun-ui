import {
  Avatar,
  AvatarImage,
  Badge,
  Button,
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@bun-ui/react"
import {
  Heart,
  MessageCircle,
  MessageSquare,
  Share2,
  ThumbsUp,
} from "lucide-react"

export const TimelineCustomContent = () => {
  return (
    <Timeline>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIndicator>
            <MessageSquare className="h-4 w-4" />
          </TimelineIndicator>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className="bg-card rounded-lg border p-4">
          <TimelineTitle className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatar.png" />
            </Avatar>
            <div>
              <p className="text-sm">David Kim</p>
              <p className="text-muted-foreground text-xs">1 day ago</p>
            </div>
          </TimelineTitle>
          <p className="mt-3 text-sm">
            Just hit 10k followers! Thank you all for your amazing support.
            Here&apos;s to the next milestone! 🎉
          </p>
          <div className="mt-2 flex items-center gap-4">
            <Button size="sm" variant="text" color="neutral">
              <ThumbsUp className="h-4 w-4" />
              <span className="text-sm">1.2k</span>
            </Button>
            <Button size="sm" variant="text" color="neutral">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">89</span>
            </Button>
            <Button size="sm" variant="text" color="neutral">
              <Share2 className="h-4 w-4" />
              <span className="text-sm">Share</span>
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="outlined">#milestone</Badge>
            <Badge variant="outlined">#thankyou</Badge>
            <Badge variant="outlined">#community</Badge>
          </div>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIndicator>
            <MessageSquare className="h-4 w-4" />
          </TimelineIndicator>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className="bg-card rounded-lg border p-4">
          <TimelineTitle className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatar3.png" />
            </Avatar>
            <div>
              <p className="text-sm">Mike Chen</p>
              <p className="text-muted-foreground text-xs">5 hours ago</p>
            </div>
          </TimelineTitle>
          <p className="text-sm">
            Working on some exciting new features for our app! Can&apos;t wait
            to share more details soon. #coding #development
          </p>
          <div className="mt-2 flex items-center gap-4">
            <Button size="sm" variant="text" color="neutral">
              <ThumbsUp className="h-4 w-4" />
              <span className="text-sm">256</span>
            </Button>
            <Button size="sm" variant="text" color="neutral">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">42</span>
            </Button>
            <Button size="sm" variant="text" color="neutral">
              <Share2 className="h-4 w-4" />
              <span className="text-sm">Share</span>
            </Button>
          </div>
          <div className="bg-muted/50 mt-4 space-y-3 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/avatar2.png" />
              </Avatar>
              <div>
                <p className="text-sm font-medium">Alex Thompson</p>
                <p className="text-muted-foreground text-sm">
                  This looks amazing! Can&apos;t wait to see the final result.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/avatar4.png" />
              </Avatar>
              <div>
                <p className="text-sm font-medium">Emma Wilson</p>
                <p className="text-muted-foreground text-sm">
                  Will there be a beta testing phase? I&apos;d love to try it
                  out!
                </p>
              </div>
            </div>
          </div>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIndicator>
            <ThumbsUp className="h-4 w-4" />
          </TimelineIndicator>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className="bg-card rounded-lg border p-4">
          <TimelineTitle className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatar4.png" />
            </Avatar>
            <div>
              <p className="text-sm">Emma Wilson</p>
              <p className="text-muted-foreground text-xs">8 hours ago</p>
            </div>
          </TimelineTitle>
          <div className="text-muted-foreground mt-3 flex items-center gap-2 text-sm">
            <Heart className="h-4 w-4 text-red-500" />
            <span>liked your comment on</span>
            <span className="text-foreground font-medium">
              Mike Chen&apos;s post
            </span>
          </div>
          <div className="bg-muted/50 mt-3 rounded-lg p-3">
            <p className="text-muted-foreground text-sm">
              &quot;This looks amazing! Can&apos;t wait to see the final
              result.&quot;
            </p>
          </div>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}
