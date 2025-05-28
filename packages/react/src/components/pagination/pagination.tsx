"use client"

import React, { useMemo } from "react"
import { cva } from "class-variance-authority"

import { useControlled } from "../../hooks/use-controlled"
import { cx, range } from "../../lib"
import { Button, type ButtonProps } from "../button"
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../icons"

type PageType =
  | "first"
  | "last"
  | "previous"
  | "next"
  | "start-ellipsis"
  | "end-ellipsis"
  | "page"
  | number

interface PaginationItemProps extends Omit<ButtonProps, "type"> {
  type: PageType
  page: number
  selected?: boolean
  disabled?: boolean
  color?: "primary" | "secondary" | "neutral"
  variant?: "outlined" | "text"
  size: "sm" | "md" | "lg"
}

const paginationItemVariants = cva("p-0", {
  variants: {
    variant: {
      outlined: "",
      text: "",
    },
    selected: {
      true: "",
      false: "",
    },
    color: {
      primary: "",
      secondary: "",
      neutral: "",
    },
    size: {
      sm: "h-6 w-6",
      md: "h-8 w-8",
      lg: "h-10 w-10",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "text",
    color: "neutral",
    selected: false,
  },
  compoundVariants: [
    // Selected states
    {
      color: "neutral",
      variant: "outlined",
      selected: true,
      className: "bg-foreground/20 border-foreground hover:bg-foreground/30",
    },
    {
      color: "primary",
      variant: "outlined",
      selected: true,
      className:
        "bg-primary/20 border-primary text-primary hover:bg-primary/30",
    },
    {
      color: "secondary",
      variant: "outlined",
      selected: true,
      className:
        "bg-secondary/20 border-secondary border text-secondary hover:bg-secondary/30",
    },
    {
      color: "neutral",
      variant: "text",
      selected: true,
      className: "bg-foreground/20 hover:not-disabled:bg-foreground/30",
    },
    {
      color: "primary",
      variant: "text",
      selected: true,
      className:
        "bg-primary text-primary-foreground border hover:not-disabled:bg-primary/80",
    },
    {
      color: "secondary",
      variant: "text",
      selected: true,
      className:
        "bg-secondary text-secondary-foreground border hover:not-disabled:bg-secondary/80",
    },
    // Unselected states
    {
      variant: "outlined",
      selected: false,
      className:
        "hover:not-disabled:bg-foreground/20 border-foreground/50 hover:not-disabled:border-foreground/50",
    },
  ],
})

const PaginationItem = React.forwardRef<
  React.ComponentRef<typeof Button>,
  PaginationItemProps
>(
  (
    { className, type, page, size, variant, color, selected, ...props },
    ref
  ) => {
    let content: React.ReactNode = page
    if (type === "previous") {
      content = <ChevronLeftIcon />
    } else if (type === "next") {
      content = <ChevronRightIcon />
    } else if (type === "first") {
      content = <ChevronFirstIcon />
    } else if (type === "last") {
      content = <ChevronLastIcon />
    }
    if (type === "start-ellipsis" || type === "end-ellipsis") {
      return <div>...</div>
    }
    return (
      <Button
        ref={ref}
        variant={variant}
        className={cx(
          paginationItemVariants({ size, variant, color, selected }),
          className
        )}
        color="neutral"
        {...props}
      >
        {content}
      </Button>
    )
  }
)

interface PaginationProps
  extends Omit<React.ComponentPropsWithoutRef<"nav">, "onChange"> {
  /**
   * The total number of pages.
   */
  count: number

  /**
   * Number of always visible pages before and after the current page.
   * @default 1
   */
  siblingCount?: number

  /**
   * Number of always visible pages at the beginning and end.
   * @default 1
   */
  boundaryCount?: number

  showFirstButton?: boolean
  showLastButton?: boolean

  variant?: "text" | "outlined"

  hidePrevButton?: boolean
  hideNextButton?: boolean

  defaultPage?: number

  page?: number

  disabled?: boolean

  size?: "sm" | "md" | "lg"

  color?: "primary" | "secondary" | "neutral"

  onChange?: (page: number) => void

  renderItem?: (item: PaginationItemProps) => React.ReactNode
}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      className,
      siblingCount = 1,
      boundaryCount = 1,
      showFirstButton = false,
      showLastButton = false,
      hideNextButton = false,
      hidePrevButton = false,
      defaultPage = 1,
      count,
      page: pageProp,
      disabled,
      onChange,
      size = "md",
      variant = "text",
      color = "neutral",
      renderItem = (item) => <PaginationItem {...item} />,
      ...props
    },
    ref
  ) => {
    const [page, setPage] = useControlled({
      defaultValue: defaultPage,
      value: pageProp,
    })

    const handleClick = (value: number) => {
      if (!pageProp) {
        setPage(value)
      }
      onChange?.(value)
    }

    // adopted from
    // github.com/mui/material-ui/blob/master/packages/mui-material/src/usePagination/usePagination.js
    const items: PaginationItemProps[] = useMemo(() => {
      // Calculate ranges
      const startPages = range(1, Math.min(boundaryCount, count))
      const endPages = range(
        Math.max(count - boundaryCount + 1, boundaryCount + 1),
        count
      )

      // Calculate siblings range
      const siblingsStart = Math.max(
        Math.min(
          page - siblingCount,
          count - boundaryCount - siblingCount * 2 - 1
        ),
        boundaryCount + 2
      )
      const siblingsEnd = Math.min(
        Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
        count - boundaryCount - 1
      )

      // Build page items array

      const pageItems: PageType[] = [
        ...(showFirstButton ? ["first" as const] : []),
        ...(hidePrevButton ? [] : ["previous" as const]),
        ...startPages,
        ...(siblingsStart > boundaryCount + 2
          ? ["start-ellipsis" as const]
          : boundaryCount + 1 < count - boundaryCount
            ? [boundaryCount + 1]
            : []),
        ...range(siblingsStart, siblingsEnd),
        ...(siblingsEnd < count - boundaryCount - 1
          ? ["end-ellipsis" as const]
          : count - boundaryCount > boundaryCount
            ? [count - boundaryCount]
            : []),
        ...endPages,
        ...(hideNextButton ? [] : ["next" as const]),
        ...(showLastButton ? ["last" as const] : []),
      ]

      // Convert page items to button props
      return pageItems.map((item): PaginationItemProps => {
        const isNumber = typeof item === "number"
        const pageNumber = isNumber
          ? item
          : (() => {
              switch (item) {
                case "first":
                  return 1
                case "previous":
                  return page - 1
                case "next":
                  return page + 1
                case "last":
                  return count
                case "start-ellipsis":
                case "end-ellipsis":
                  return 1
                default:
                  return 1
              }
            })()

        return {
          onClick: () => handleClick(pageNumber),
          type: isNumber ? "page" : (item as PageType),
          page: pageNumber,
          selected: isNumber && item === page,
          disabled:
            disabled ||
            (!isNumber &&
              (item === "next" || item === "last" ? page >= count : page <= 1)),
          size,
          variant,
          color,
          "aria-current": isNumber && item === page ? "page" : undefined,
        }
      })
    }, [
      page,
      count,
      siblingCount,
      boundaryCount,
      showFirstButton,
      showLastButton,
      hideNextButton,
      hidePrevButton,
      disabled,
      size,
      variant,
      color,
    ])

    return (
      <nav className={cx("flex items-center", className)} ref={ref} {...props}>
        <ul className="flex w-full items-center gap-x-2">
          {items.map((item, index) => (
            <li key={index}>{renderItem(item)}</li>
          ))}
        </ul>
      </nav>
    )
  }
)

Pagination.displayName = "Pagination"

export {
  Pagination,
  PaginationItem,
  type PaginationProps,
  type PaginationItemProps,
}
