"use client"

import React from "react"
import { differenceInCalendarDays } from "date-fns"
import {
  DayPicker,
  useDayPicker,
  type DateRange,
  type DayPickerProps,
} from "react-day-picker"

import { cx } from "../../lib"
import { Button, buttonVariants } from "../button"
import { ChevronLeftIcon, ChevronRightIcon } from "../icons"
import type { CalendarClasses } from "./calendar-classes"

/**  Props for the Calendar component*/
export type CalendarProps = DayPickerProps & {
  /**
   * Override or extend the styles applied to the component
   * and its subcomponents.
   */
  classes?: CalendarClasses

  /**
   * Number of years to display in the "years" view.
   * @default 12
   */
  yearRange?: number
  /**
   * If `true`, disables the month and year views.
   * If `false`, users can switch between day, month, and year views
   * by clicking the month/day/year label.
   *
   * @default false
   */
  disableViewChange?: boolean
}

/**
 * Navigation view type for the calendar.
 * - "days": Shows the day grid view
 * - "months": Shows the month selection grid
 * - "years": Shows the year selection grid
 */
type NavView = "days" | "months" | "years"

/**
 * A calendar component that allows users to select dates.
 * Built on top of react-day-picker with additional features like year and month selection views.
 *
 * @example
 * ```tsx
 * <Calendar
 *   mode="single"
 *   selected={date}
 *   onSelect={setDate}
 *   className="rounded-md border"
 * />
 * ```
 *
 * Demos:
 *   - [Calendar](https://bun-ui.com/docs/components/calendar)
 */
const Calendar = ({
  className,
  classes,
  yearRange = 12,
  startMonth,
  endMonth,
  disableViewChange = false,
  ...props
}: CalendarProps) => {
  const { onNextClick, onPrevClick } = props
  const [navView, setNavView] = React.useState<NavView>("days")
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear())
  const [displayYears, setDisplayYears] = React.useState<{
    from: number
    to: number
  }>(() => {
    const currentYear = new Date().getFullYear()
    return {
      from: currentYear - Math.floor(yearRange / 2) + 1,
      to: currentYear + Math.ceil(yearRange / 2),
    }
  })

  const _monthsClassName = cx("relative flex", classes?.months)
  const _monthCaptionClassName = cx(
    "relative mx-10 flex h-7 items-center justify-center",
    classes?.monthCaption
  )
  const _weekdaysClassName = cx("flex flex-row", classes?.weekdays)
  const _weekdayClassName = cx(
    "w-8 text-sm font-normal text-muted-foreground",
    classes?.weekday
  )
  const _monthClassName = cx("w-full", classes?.month)
  const _captionLabelClassName = cx(
    "truncate text-sm font-medium",
    classes?.captionLabel
  )
  const _monthGridClassName = cx("mx-auto mt-4", classes?.monthGrid)
  const _weekClassName = cx("mt-2 flex w-max items-start", classes?.week)
  const _dayClassName = cx(
    "flex size-8 flex-1 items-center justify-center p-0 text-sm group",
    classes?.day
  )
  const _dayButtonClassName = cx(
    buttonVariants({ variant: "text", color: "neutral" }),
    "size-8 rounded-md p-0 font-normal transition-none aria-selected:opacity-100",
    "group-data-[selected=true]:hover:bg-primary/80 group-data-[selected=true]:border-none",
    classes?.dayButton
  )
  const buttonRangeClassName = cx("bg-primary/10 ")
  const _rangeStartClassName = cx(
    buttonRangeClassName,
    "day-range-start rounded-s-md",
    classes?.rangeStart
  )
  const _rangeEndClassName = cx(
    buttonRangeClassName,
    "day-range-end rounded-e-md",
    classes?.rangeEnd
  )
  const _rangeMiddleClassName = cx(
    "[&>button]:bg-transparent bg-primary/10 [&>button]:!text-foreground [&>button]:hover:!bg-primary/20",
    classes?.rangeMiddle
  )
  const _selectedClassName = cx(
    "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:text-primary-foreground",
    classes?.selected
  )
  const _todayClassName = cx(
    "[&>button]:text-foreground [&>button]:border [&>button]:border-foreground/60",
    classes?.today
  )
  const _outsideClassName = cx(
    "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
    classes?.outside
  )
  const _disabledClassName = cx(
    "text-muted-foreground opacity-50",
    classes?.disabled
  )
  const _hiddenClassName = cx("invisible flex-1", classes?.hidden)

  // Determine the default month to display based on the selected date(s).
  // This makes sure the calendar display the month of the selected date(s) if available.
  // If no date is selected, it defaults to the current month.
  let _defaultMonth = new Date()
  if (props.mode === "single" && props.selected) {
    _defaultMonth = props.selected
  } else if (props.mode === "multiple" && props.selected?.length) {
    _defaultMonth = props.selected[0]
  } else if (props.mode === "range" && props.selected?.from) {
    // If a range is selected, default to the start of the range.
    _defaultMonth = props.selected.from
  }

  return (
    <DayPicker
      mode="single"
      className={cx("w-[260px] p-3", className)}
      defaultMonth={_defaultMonth}
      startMonth={startMonth}
      endMonth={endMonth}
      classNames={{
        months: _monthsClassName,
        month_caption: _monthCaptionClassName,
        weekdays: _weekdaysClassName,
        weekday: _weekdayClassName,
        month: _monthClassName,
        caption_label: _captionLabelClassName,
        month_grid: _monthGridClassName,
        week: _weekClassName,
        day: _dayClassName,
        day_button: _dayButtonClassName,
        range_start: _rangeStartClassName,
        range_middle: _rangeMiddleClassName,
        range_end: _rangeEndClassName,
        selected: _selectedClassName,
        today: _todayClassName,
        outside: _outsideClassName,
        disabled: _disabledClassName,
        hidden: _hiddenClassName,
      }}
      components={{
        Chevron: ({ orientation }) => {
          const Icon =
            orientation === "left" ? ChevronLeftIcon : ChevronRightIcon
          return <Icon className="h-4 w-4" />
        },
        Nav: () => (
          <Nav
            onNextClick={onNextClick}
            onPreviousClick={onPrevClick}
            navClassName={classes?.nav}
            buttonPreviousClassName={classes?.buttonPrevious}
            buttonNextClassName={classes?.buttonNext}
            displayYears={displayYears}
            navView={navView}
            yearRange={yearRange}
            currentYear={currentYear}
            setCurrentYear={setCurrentYear}
            setDisplayYears={setDisplayYears}
            startMonth={startMonth}
            endMonth={endMonth}
          />
        ),
        CaptionLabel: (captionLabelProps) => (
          <CaptionLabel
            setNavView={setNavView}
            disableViewChange={disableViewChange}
            displayYears={displayYears}
            navView={navView}
            currentYear={currentYear}
            {...captionLabelProps}
          />
        ),
        MonthGrid: ({ children, ...monthGridProps }) => (
          <MonthGrid
            children={children}
            currentYear={currentYear}
            setNavView={setNavView}
            navView={navView}
            displayYears={displayYears}
            startMonth={startMonth}
            endMonth={endMonth}
            setCurrentYear={setCurrentYear}
            {...monthGridProps}
          />
        ),
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"

/**
 * Props for the Calendar navigation component.
 */
interface CalendarNavProps {
  /** Callback when clicking the previous button */
  onPreviousClick?: (month: Date) => void
  /** Callback when clicking the next button */
  onNextClick?: (month: Date) => void
  /** Class name for the previous button */
  buttonPreviousClassName?: string
  /** Class name for the next button */
  buttonNextClassName?: string
  /** Class name for the navigation container */
  navClassName?: string
  /** Current navigation view */
  navView: NavView
  /** Start month for date range selection */
  startMonth?: Date
  /** End month for date range selection */
  endMonth?: Date
  /** Range of years to display */
  displayYears: { from: number; to: number }
  /** Currently selected year */
  currentYear: number
  /** Function to update the current year */
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>
  /** Function to update the display years range */
  setDisplayYears: React.Dispatch<
    React.SetStateAction<{ from: number; to: number }>
  >
  /** Number of years to display in the years view */
  yearRange: number
}

const Nav = ({
  onPreviousClick,
  onNextClick,
  buttonNextClassName,
  buttonPreviousClassName,
  navClassName,
  navView,
  startMonth,
  endMonth,
  displayYears,
  currentYear,
  setDisplayYears,
  setCurrentYear,
  yearRange,
}: CalendarNavProps) => {
  const { previousMonth, nextMonth, goToMonth } = useDayPicker()
  const isPreviousDisabled = (): boolean => {
    if (navView === "years") {
      return (
        !!startMonth &&
        differenceInCalendarDays(
          new Date(displayYears.from - 1, 11, 31),
          startMonth
        ) < 0
      )
    }
    if (navView === "months") {
      return (
        !!startMonth &&
        differenceInCalendarDays(
          new Date(currentYear - 1, 11, 31),
          startMonth
        ) < 0
      )
    }
    return !previousMonth
  }

  const isNextDisabled = (): boolean => {
    if (navView === "years") {
      return (
        !!endMonth &&
        differenceInCalendarDays(
          new Date(displayYears.to + 1, 0, 1),
          endMonth
        ) > 0
      )
    }
    if (navView === "months") {
      return (
        !!endMonth &&
        differenceInCalendarDays(new Date(currentYear + 1, 0, 1), endMonth) > 0
      )
    }
    return !nextMonth
  }

  const handlePreviousClick = () => {
    if (!previousMonth) return
    if (navView === "years") {
      // Set to previous year range.
      setDisplayYears((prev) => ({
        from: prev.from - yearRange,
        to: prev.to - yearRange,
      }))
      onPreviousClick?.(new Date(displayYears.from - yearRange, 0, 1))
      return
    }
    if (navView === "months") {
      // Set the current year to the previous year.
      setCurrentYear((prev) => prev - 1)
      return
    }
    goToMonth(previousMonth)
    onPreviousClick?.(previousMonth)
  }

  const handleNextClick = () => {
    if (!nextMonth) return
    if (navView === "years") {
      // Set to next year range.
      setDisplayYears((prev) => ({
        from: prev.from + yearRange,
        to: prev.to + yearRange,
      }))
      return
    }
    if (navView === "months") {
      // Set the current year to the next year.
      setCurrentYear((prev) => prev + 1)
      return
    }
    goToMonth(nextMonth)
    onNextClick?.(nextMonth)
  }

  return (
    <nav className={cx("flex items-start", navClassName)}>
      <Button
        variant="outlined"
        tabIndex={isPreviousDisabled() ? -1 : 0}
        color="neutral"
        className={cx(
          "absolute left-0 h-7 w-7 p-0 disabled:opacity-50",
          buttonPreviousClassName
        )}
        disabled={isPreviousDisabled()}
        onClick={handlePreviousClick}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        tabIndex={isNextDisabled() ? -1 : 0}
        variant="outlined"
        color="neutral"
        className={cx(
          "absolute right-0 h-7 w-7 p-0 disabled:opacity-50",
          buttonNextClassName
        )}
        disabled={isNextDisabled()}
        onClick={handleNextClick}
      >
        <ChevronRightIcon />
      </Button>
    </nav>
  )
}

/**
 * Props for the Calendar caption label component.
 */
interface CaptionLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Current navigation view */
  navView: NavView
  /** Function to update the navigation view */
  setNavView: React.Dispatch<React.SetStateAction<NavView>>
  /** Whether to disable view changes */
  disableViewChange?: boolean
  /** Range of years to display */
  displayYears: { from: number; to: number }
  /** Currently selected year */
  currentYear: number
}
const CaptionLabel = ({
  navView,
  setNavView,
  disableViewChange,
  children,
  currentYear,
  displayYears,
  ...props
}: CaptionLabelProps) => {
  if (disableViewChange) {
    return <span {...props}>{children}</span>
  }
  return (
    <Button
      color="neutral"
      variant="text"
      onClick={() =>
        setNavView((_navView) => {
          if (_navView === "days") return "months"
          if (_navView === "months") return "years"
          return "days"
        })
      }
    >
      {navView === "days" && children}
      {navView === "months" && currentYear}
      {navView === "years" && `${displayYears.from} - ${displayYears.to}`}
    </Button>
  )
}

/**
 * Props for the Calendar month grid component.
 */
interface MonthGridProps extends React.HTMLAttributes<HTMLTableElement> {
  /** Class name for the grid */
  className?: string
  /** Child elements */
  children: React.ReactNode
  /** Range of years to display */
  displayYears: { from: number; to: number }
  /** Start month for date range selection */
  startMonth?: Date
  /** End month for date range selection */
  endMonth?: Date
  /** Current navigation view */
  navView: NavView
  /** Function to update the navigation view */
  setNavView: React.Dispatch<React.SetStateAction<NavView>>
  /** Currently selected year */
  currentYear: number
  /** Function to update the current year */
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>
}

const MonthGrid = ({
  className,
  children,
  displayYears,
  endMonth,
  startMonth,
  navView,
  currentYear,
  setCurrentYear,
  setNavView,
  ...props
}: MonthGridProps) => {
  if (navView === "days") {
    return (
      <table className={cx(className)} {...props}>
        {children}
      </table>
    )
  }
  if (navView === "years") {
    return (
      <YearGrid
        className={className}
        displayYears={displayYears}
        navView={navView}
        setNavView={setNavView}
        startMonth={startMonth}
        endMonth={endMonth}
        setCurrentYear={setCurrentYear}
      />
    )
  }
  if (navView === "months") {
    return (
      <MonthMonthGrid
        className={className}
        currentYear={currentYear}
        navView={navView}
        setNavView={setNavView}
        startMonth={startMonth}
        endMonth={endMonth}
      />
    )
  }
}

/**
 * Props for the Calendar year grid component.
 */
interface YearGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Class name for the grid */
  className?: string
  /** Range of years to display */
  displayYears: { from: number; to: number }
  /** Start month for date range selection */
  startMonth?: Date
  /** End month for date range selection */
  endMonth?: Date
  /** Function to update the navigation view */
  setNavView: React.Dispatch<React.SetStateAction<NavView>>
  /** Current navigation view */
  navView: NavView
  /** Function to update the current year */
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>
}

const YearGrid = ({
  className,
  displayYears,
  startMonth,
  endMonth,
  setNavView,
  navView,
  setCurrentYear,
  ...props
}: YearGridProps) => {
  const { goToMonth, selected } = useDayPicker()

  return (
    <div className={cx("grid grid-cols-4 gap-y-2", className)} {...props}>
      {Array.from(
        { length: displayYears.to - displayYears.from + 1 },
        (_, i) => {
          const isBefore =
            differenceInCalendarDays(
              new Date(displayYears.from + i, 11, 31),
              startMonth!
            ) < 0

          const isAfter =
            differenceInCalendarDays(
              new Date(displayYears.from + i, 0, 1),
              endMonth!
            ) > 0

          const isDisabled = isBefore || isAfter
          return (
            <Button
              key={i}
              className={cx(
                "text-foreground h-7 w-full text-sm font-normal",
                displayYears.from + i === new Date().getFullYear() &&
                  "text-foreground border-foreground/60 border"
              )}
              variant="text"
              onClick={() => {
                setNavView("months")
                setCurrentYear(displayYears.from + i)
                goToMonth(
                  new Date(
                    displayYears.from + i,
                    (selected as Date | undefined)?.getMonth?.() ?? 0
                  )
                )
              }}
              disabled={navView === "years" ? isDisabled : undefined}
            >
              {displayYears.from + i}
            </Button>
          )
        }
      )}
    </div>
  )
}

/**
 * Props for the Calendar month selection grid component.
 */
interface MonthMonthGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The year to display months for */
  currentYear: number
  /** Start month for date range selection */
  startMonth?: Date
  /** End month for date range selection */
  endMonth?: Date
  /** Class name for the grid */
  className?: string
  /** Function to update the navigation view */
  setNavView: React.Dispatch<React.SetStateAction<NavView>>
  /** Current navigation view */
  navView: NavView
}
const MonthMonthGrid = ({
  currentYear,
  startMonth,
  endMonth,
  className,
  setNavView,
  navView,
  ...props
}: MonthMonthGridProps) => {
  const { goToMonth } = useDayPicker()
  const today = new Date()
  return (
    <div className={cx("grid grid-cols-3 gap-y-2", className)} {...props}>
      {/* Generate month 0 to 11 */}
      {Array.from({ length: 12 }, (_, i) => {
        const isBefore =
          differenceInCalendarDays(new Date(currentYear, i, 31), startMonth!) <
          0

        const isAfter =
          differenceInCalendarDays(new Date(currentYear, i, 1), endMonth!) > 0

        const isDisabled = isBefore || isAfter
        return (
          <Button
            key={i}
            className={cx(
              "text-foreground h-7 w-full text-sm font-normal",
              i === today.getMonth() &&
                currentYear === today.getFullYear() &&
                "text-foreground border-foreground/60 border"
            )}
            variant="text"
            onClick={() => {
              setNavView("days")
              goToMonth(new Date(currentYear, i))
            }}
            disabled={navView === "months" ? isDisabled : undefined}
          >
            {new Date(currentYear, i).toLocaleString("default", {
              month: "long",
            })}
          </Button>
        )
      })}
    </div>
  )
}
export { Calendar, type DateRange }
