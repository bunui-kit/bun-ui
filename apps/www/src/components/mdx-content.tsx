import * as runtime from "react/jsx-runtime"
import { Alert, AlertDescription, AlertTitle } from "@bun-ui/react"
import { ExternalLink } from "lucide-react"

import { cx } from "@/lib/classnames"
import { getHostName } from "@/lib/string"
import { APITable } from "./api-table"
import { ComponentPreview } from "./component-preview"
import { CopyButton } from "./copy-button"

const sharedComponents = {
  ComponentPreview,
  APITable,
  Alert,
  AlertTitle,
  AlertDescription,
  CopyButton,
  ExternalLink,
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cx(
        "font-heading mt-2 scroll-m-20 text-4xl font-bold",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cx(
        "font-heading mt-6 scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cx(
        "font-heading mt-6 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cx(
        "font-heading mt-4 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cx(
        "mt-4 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cx(
        "mt-4 scroll-m-20 text-base font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  a: ({
    className,
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternalLink =
      href?.startsWith("http") && getHostName(href) !== "bun-ui.com"

    return (
      <a
        className={cx(
          "decoration-primary/40 inline-flex items-center gap-1 font-medium underline underline-offset-4",
          "hover:decoration-primary",
          className
        )}
        target={isExternalLink ? "_blank" : "_self"}
        href={href}
        {...props}
      >
        {children}
        {isExternalLink && <ExternalLink className="inline h-3 w-3" />}
      </a>
    )
  },
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cx("mt-4 leading-[1.65rem]", className)} {...props} />
  ),
  strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className={cx("font-semibold", className)} {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cx("ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cx("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className={cx("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cx("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cx("rounded-md", className)} alt={alt} {...props} />
  ),
  pre: ({
    className,
    __rawString__,
    __withMeta__,
    __src__,
    ...props
  }: React.HTMLAttributes<HTMLPreElement> & {
    __rawString__?: string
    __withMeta__?: boolean
    __src__?: string
  }) => {
    return (
      <div className="relative">
        <pre
          className={cx(
            "mt-6 mb-4 max-h-[550px] overflow-x-auto rounded-lg bg-zinc-950 py-4 dark:bg-zinc-900",
            className
          )}
          {...props}
        />
        {__rawString__ && (
          <CopyButton
            value={__rawString__}
            src={__src__}
            className={cx("absolute top-3 right-2 z-20")}
          />
        )}
      </div>
    )
  },
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cx(
        "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className
      )}
      {...props}
    />
  ),
}

// parse the Velite generated MDX code into a React component function
const useMDXComponent = (code: string) => {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

interface MDXProps {
  code: string
  components?: Record<string, React.ComponentType>
}

// MDXContent component
export const MDXContent = ({ code, components }: MDXProps) => {
  const Component = useMDXComponent(code)
  return <Component components={{ ...sharedComponents, ...components }} />
}
