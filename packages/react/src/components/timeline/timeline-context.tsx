import { createContext, useContext } from "react"

export interface TimelineContextValue {
  position: "left" | "right" | "alternate"
  alignment: "start" | "center" | "end"
}

export const TimelineContext = createContext<TimelineContextValue>({
  position: "right",
  alignment: "center",
})

export const useTimelineContext = () => useContext(TimelineContext)
