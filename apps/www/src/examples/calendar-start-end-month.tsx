import { Calendar } from "@bun-ui/react/calendar"

export const CalendarStartEndMonth = () => {
  const startDate = new Date(2025, 0, 1)
  const endDate = new Date(2025, 2, 31)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-sm">
        This calendar is restricted to Q1 2025 (January to March). Navigation
        buttons will be disabled outside this range.
      </div>
      <Calendar
        startMonth={startDate}
        endMonth={endDate}
        defaultMonth={new Date(2025, 1, 1)}
      />
    </div>
  )
}
