import React from "react"
import { cva } from "class-variance-authority"

import { cx } from "../../lib"

const typographyVariants = cva("tracking-tight", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-5xl font-extrabold mb-6",
      h2: "scroll-m-20 text-4xl font-semibold mb-4",
      h3: "scroll-m-20 text-3xl font-semibold mb-3",
      h4: "scroll-m-20 text-2xl font-semibold mb-2",
      h5: "scroll-m-20 text-xl font-semibold mb-2",
      h6: "scroll-m-20 text-lg font-semibold mb-1",
      p: "leading-7",
      blockquote: "my-6 border-l-2 border-foreground/20 pl-6 italic",
      list: "my-6 ml-6 list-disc [&>li]:mt-2",
      lead: "text-xl text-foreground/80",
      muted: "text-sm text-foreground/60",
    },
    fontSize: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
    },
    fontWeight: {
      thin: "font-thin",
      extralight: "font-extralight",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
  },
  compoundVariants: [
    {
      fontWeight: "normal",
      variant: "h1",
      class: "font-extrabold",
    },
    {
      fontWeight: "normal",
      variant: "h2",
      class: "font-extrabold",
    },
    {
      fontWeight: "normal",
      variant: "h3",
      class: "font-semibold",
    },
    {
      fontWeight: "normal",
      variant: "h4",
      class: "font-semibold",
    },
    {
      fontWeight: "normal",
      variant: "h5",
      class: "font-semibold",
    },
    {
      fontWeight: "normal",
      variant: "h6",
      class: "font-semibold",
    },
    {
      fontSize: "md",
      variant: "h1",
      class: "text-5xl",
    },
    {
      fontSize: "md",
      variant: "h2",
      class: "text-4xl",
    },
    {
      fontSize: "md",
      variant: "h3",
      class: "text-3xl",
    },
    {
      fontSize: "md",
      variant: "h4",
      class: "text-2xl",
    },
    {
      fontSize: "md",
      variant: "h5",
      class: "text-xl",
    },
    {
      fontSize: "md",
      variant: "h6",
      class: "text-lg",
    },
  ],
})

type TypographyElement =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "li"
  | "blockquote"

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: TypographyElement
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "blockquote"
    | "list"
    | "lead"
    | "muted"
  fontSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"
  fontWeight?:
    | "thin"
    | "extralight"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
  truncate?: boolean
}
const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      variant = "p",
      fontSize = "md",
      fontWeight = "normal",
      truncate,
      as,
      ...props
    }: TypographyProps,
    ref
  ) => {
    const Comp = as || getDefaultElement(variant)
    return (
      <Comp
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={cx(
          typographyVariants({ variant, fontSize, fontWeight }),
          truncate && "truncate",
          className
        )}
        {...props}
      />
    )
  }
)

function getDefaultElement(variant: string): TypographyElement {
  switch (variant) {
    case "h1":
      return "h1"
    case "h2":
      return "h2"
    case "h3":
      return "h3"
    case "h4":
      return "h4"
    case "blockquote":
      return "blockquote"
    default:
      return "p"
  }
}

Typography.displayName = "Typography"

export { Typography }
