import NextLink from "next/link"
import { blogs } from "@/.velite"
import { Link, Typography } from "@bun-ui/react"
import { format, parseISO } from "date-fns"
import { ChevronLeft } from "lucide-react"

import { MDXContent } from "@/components/mdx-content"

interface BlogPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogArticlePage({ params }: BlogPageProps) {
  const { slug } = await params
  const blog = blogs.find(
    (_blog) => _blog.slug === ["blog", ...(slug?.length ? slug : [])].join("/")
  )
  if (!blog) {
    return (
      <div className="flex h-full items-center justify-center">
        <h1 className="text-3xl font-bold">404 - Not Found</h1>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-4xl justify-between px-6 pt-5 pb-20">
      <Link asChild underline="none">
        <NextLink href="/blog" className="mb-4 flex items-center text-sm">
          <ChevronLeft className="h-4 w-4" />
          Go to blog
        </NextLink>
      </Link>
      <Typography variant="h1" className="text-4xl">
        {blog.title}
      </Typography>
      <div className="text-foreground/60 mt-5 font-mono text-xs">
        {format(parseISO(blog.date), "PP")}
      </div>
      <MDXContent code={blog.code} />
    </div>
  )
}
