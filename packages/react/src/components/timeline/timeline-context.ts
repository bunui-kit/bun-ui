import { createContext, useContext } from "react"

interface TimelineContextValue {
  position: "left" | "right" | "alternate"
}
const TimelineContext = createContext<TimelineContextValue>({
  position: "right",
})

const useTimelineContext = () => {
  const context = useContext(TimelineContext)
  if (!context) {
    throw new Error("useTimelineContext must be used within Timeline")
  }
  return context
}

export { TimelineContext, useTimelineContext, type TimelineContextValue }
