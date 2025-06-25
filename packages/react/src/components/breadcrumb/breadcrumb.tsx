import React from "react"

import { cx } from "../../lib"
import { ChevronRightIcon } from "../icons"
import { Link, type LinkProps } from "../link"

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav">
>((props, ref) => <nav ref={ref} aria-label="breadcrumbs" {...props} />)

export interface BreadcrumbListProps
  extends React.ComponentPropsWithoutRef<"ol"> {
  /**
   * Override the default separator icon.
   */
  separator?: React.ReactNode | null
}
const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  (
    {
      className,
      separator = <ChevronRightIcon className="h-4 w-4" />,
      children,
      ...props
    },
    ref
  ) => {
    const items = React.Children.toArray(children)
    let wrappedItems = items
    if (separator) {
      wrappedItems = items.flatMap((item, index) => {
        const isLastItem = index === items.length - 1
        return isLastItem
          ? [item]
          : [
              item,
              <li
                key={`separator-${index}`}
                className="text-muted-foreground mx-1"
              >
                {separator}
              </li>,
            ]
      })
    }
    return (
      <ol
        ref={ref}
        className={cx(
          "text-muted-foreground flex list-none flex-wrap items-center overflow-hidden",
          className
        )}
        {...props}
      >
        {wrappedItems}
      </ol>
    )
  }
)

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cx("inline-flex items-center", className)}
    {...props}
  />
))

/**
 * Props for BreadcrumbLink component.
 */
export interface BreadcrumbLinkProps extends LinkProps {
  /**
   * if `currentLink=true`, this is rendered as a regular text
   * @default false
   */
  currentLink?: boolean
  /**
   * The content of the link.
   */
  children?: React.ReactNode
  /**
   * The target link
   **/
  href?: string
}

/**
 * Use Link component internally. For custom styling, use Link component directly
 */
const BreadcrumbLink = ({
  className,
  currentLink,
  children,
  ...props
}: BreadcrumbLinkProps) =>
  currentLink ? (
    <p className={cx("text-foreground cursor-default", className)}>
      {children}
    </p>
  ) : (
    <Link
      underline="hover"
      color="neutral"
      className={cx("opacity-60 hover:opacity-100", className)}
      {...props}
    >
      {children}
    </Link>
  )

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink }
