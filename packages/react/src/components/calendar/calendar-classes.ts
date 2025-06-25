interface CalendarClasses {
  /**
   * Styles applied to the calendar months container.
   * Controls the layout and styling of the months wrapper.
   */
  months?: string

  /**
   * Styles applied to the month caption container.
   * Controls the styling of the month/year display area with navigation buttons.
   */
  monthCaption?: string

  /**
   * Styles applied to the weekdays header row.
   * Controls the layout and styling of the weekday labels (Mon, Tue, etc.).
   */
  weekdays?: string

  /**
   * Styles applied to individual weekday labels.
   * Controls the styling of each weekday header cell.
   */
  weekday?: string

  /**
   * Styles applied to the month container.
   * Controls the styling of the entire month view container.
   */
  month?: string

  /**
   * Styles applied to the month/year caption label.
   * Controls the styling of the clickable month/year text that allows view switching.
   */
  captionLabel?: string

  /**
   * Styles applied to the next month/year navigation button.
   * Controls the styling of the right arrow button for navigation.
   */
  buttonNext?: string

  /**
   * Styles applied to the previous month/year navigation button.
   * Controls the styling of the left arrow button for navigation.
   */
  buttonPrevious?: string

  /**
   * Styles applied to the navigation container.
   * Controls the layout and styling of the navigation buttons wrapper.
   */
  nav?: string

  /**
   * Styles applied to the month grid container.
   * Controls the styling of the days grid layout.
   */
  monthGrid?: string

  /**
   * Styles applied to individual week rows.
   * Controls the styling of each row of days in the calendar.
   */
  week?: string

  /**
   * Styles applied to individual day cells.
   * Controls the styling of each day cell container.
   */
  day?: string

  /**
   * Styles applied to day buttons.
   * Controls the styling of the clickable day buttons.
   */
  dayButton?: string

  /**
   * Styles applied to the start day of a date range.
   * Controls the styling of the first day when a range is selected.
   */
  rangeStart?: string

  /**
   * Styles applied to the end day of a date range.
   * Controls the styling of the last day when a range is selected.
   */
  rangeEnd?: string

  /**
   * Styles applied to selected days.
   * Controls the styling of days that are currently selected.
   */
  selected?: string

  /**
   * Styles applied to today's date.
   * Controls the styling of the current day indicator.
   */
  today?: string

  /**
   * Styles applied to days outside the current month.
   * Controls the styling of days from adjacent months that are visible.
   */
  outside?: string

  /**
   * Styles applied to disabled days.
   * Controls the styling of days that are not selectable.
   */
  disabled?: string

  /**
   * Styles applied to days in the middle of a date range.
   * Controls the styling of days between the start and end of a selected range.
   */
  rangeMiddle?: string

  /**
   * Styles applied to hidden day cells.
   * Controls the styling of placeholder cells used for layout consistency.
   */
  hidden?: string
}

export type { CalendarClasses }
