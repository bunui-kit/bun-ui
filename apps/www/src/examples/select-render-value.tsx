"use client"

import { useState } from "react"
import { Select, SelectItem } from "@bun-ui/react"
import { Globe } from "lucide-react"

type Country = {
  code: string
  name: string
  flag: string
  population: string
}

const countries: Country[] = [
  {
    code: "us",
    name: "United States",
    flag: "🇺🇸",
    population: "331.9M",
  },
  {
    code: "gb",
    name: "United Kingdom",
    flag: "🇬🇧",
    population: "67.3M",
  },
  {
    code: "jp",
    name: "Japan",
    flag: "🇯🇵",
    population: "125.7M",
  },
  {
    code: "in",
    name: "India",
    flag: "🇮🇳",
    population: "1.4B",
  },
]

export function SelectRenderValue() {
  const [value, setValue] = useState<string>("us")

  const handleRenderValue = (value?: string) => {
    if (!value) return null
    const country = countries.find((c) => c.code === value)
    if (!country) return null

    return (
      <div className="flex gap-4">
        <span className="text-lg">{country.flag}</span>
        <div className="flex flex-col">
          <span className="text-start font-medium">{country.name}</span>
          <span className="text-xs">Population: {country.population}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <Select
        value={value}
        onValueChange={setValue}
        placeholder={
          <div className="flex items-center gap-2">
            <Globe className="text-muted-foreground h-4 w-4" />
            <span>Select a country</span>
          </div>
        }
        label="Country"
        className="w-[300px]"
        renderValue={handleRenderValue}
      >
        {countries.map((country) => (
          <SelectItem key={country.code} value={country.code}>
            <div className="flex items-center gap-2">
              <span className="text-lg">{country.flag}</span>
              <div className="flex flex-col">
                <span>{country.name}</span>
                <span className="text-xs">
                  Population: {country.population}
                </span>
              </div>
            </div>
          </SelectItem>
        ))}
      </Select>
    </div>
  )
}
