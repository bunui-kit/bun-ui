import { Geist, Inter, Roboto } from "next/font/google"
import localFont from "next/font/local"

// Base font for the component library and body text
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
})

// Font for documentation headings
export const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

export const generalSans = localFont({
  src: "../fonts/GeneralSans-Variable.woff2",
  variable: "--font-general-sans",
})
