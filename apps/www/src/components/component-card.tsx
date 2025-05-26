import { cx } from "@/lib/classnames"

interface ComponentCardProps {
  title?: string
  description?: string
  children?: React.ReactNode
  className?: string
}
export const ComponentCard = ({
  title,
  description,
  children,
  className,
}: ComponentCardProps) => {
  return (
    <div
      className={cx(
        "bg-background rounded-md border p-6 shadow-sm transition-all hover:shadow-md",
        className
      )}
    >
      {title && <h2 className="text-xl font-semibold">{title}</h2>}
      {description && (
        <p className="text-muted-foreground mb-4 text-sm">{description}</p>
      )}
      <div className="mt-5 w-full">{children}</div>
    </div>
  )
}
