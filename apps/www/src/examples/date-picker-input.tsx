"use client"

import { useState } from "react"
import {
  Button,
  IconButton,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@bun-ui/react"
import { Calendar } from "@bun-ui/react/calendar"
import clsx from "clsx"
import { format, isValid, parse } from "date-fns"
import { CalendarDays } from "lucide-react"

export const DatePickerInput = () => {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [isValidDate, setIsValidDate] = useState(true)

  const handleDateChange = (date?: Date) => {
    setSelectedDate(date)
    setInputValue(format(date || "", "MM/dd/yyyy"))
    setOpen(false)
    setIsValidDate(true)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleValidateDate = () => {
    const parsedDate = parse(inputValue, "MM/dd/yyyy", new Date())
    setIsValidDate(!inputValue || isValid(parsedDate))
  }

  return (
    <>
      <div className="relative">
        <Input
          placeholder="Select a date"
          value={inputValue}
          className={clsx("w-40 pr-8", !isValidDate && "border-destructive")}
          onChange={handleInputChange}
          onBlur={handleValidateDate}
          label="Date picker"
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <IconButton
              className="absolute top-7 right-1"
              size="sm"
              onClick={() => setOpen(true)}
            >
              <CalendarDays className="text-muted-foreground h-4 w-4" />
            </IconButton>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              onSelect={handleDateChange}
              selected={selectedDate}
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}
