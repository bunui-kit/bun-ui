import { Metadata } from "next"
import NextLink from "next/link"
import { docs } from "@/.velite"
import { Button } from "@bun-ui/react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { flattenToc } from "@/lib/flatten-toc"
import { kebabToPascalCase } from "@/lib/string"
import { GithubIcon } from "@/components/icons"
import { MDXContent } from "@/components/mdx-content"
import { Toc } from "@/components/toc"

interface DocPageProps {
  params: Promise<{
    slug: string
  }>
}

type DocPageParams = {
  params: Promise<{ slug: string | string[] }>
}

export async function generateMetadata({
  params,
}: DocPageParams): Promise<Metadata> {
  const { slug } = await params
  let title = "Introduction"
  if (Array.isArray(slug) && slug.length > 0) {
    title = slug[slug.length - 1]
  }
  return {
    title: `${kebabToPascalCase(title, "-", " ")} | Bun UI`,
  }
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params
  const docIndex = docs.findIndex(
    (doc) => doc.slug === ["docs", ...(slug?.length ? slug : [])].join("/")
  )
  const doc = docs[docIndex]
  if (!doc) {
    return (
      <div className="flex h-full items-center justify-center">
        <h1 className="text-3xl font-bold">404 - Not Found</h1>
      </div>
    )
  }

  const previousDoc = docIndex > 0 ? docs[docIndex - 1] : null
  const nextDoc = docIndex < docs.length - 1 ? docs[docIndex + 1] : null

  return (
    <div className="relative mx-auto w-full max-w-2xl grid-cols-6 justify-between px-6 pb-20 xl:grid xl:max-w-7xl">
      <div className="col-span-4 mx-auto flex w-full flex-col py-6">
        <h1 className="text-3xl font-bold">{doc.title}</h1>
        {doc.links?.source && (
          <Button variant="text" color="neutral" asChild className="my-4 w-fit">
            <NextLink href={doc.links.source} target="_blank">
              <div className="flex items-center gap-2">
                <GithubIcon className="text-foreground" />
                Source
              </div>
            </NextLink>
          </Button>
        )}
        {doc.description && (
          <p className="text-muted-foreground mb-5">{doc.description}</p>
        )}
        <MDXContent code={doc.code} />
        <div className="mt-8 flex w-full items-center justify-between border-t pt-3">
          {previousDoc ? (
            <Button asChild variant="text" size="sm" className="gap-1">
              <NextLink href={previousDoc.links.docs}>
                <ChevronLeft />
                {previousDoc.title}
              </NextLink>
            </Button>
          ) : (
            <div />
          )}
          {nextDoc ? (
            <Button asChild variant="text" size="sm" className="gap-1">
              <NextLink href={nextDoc.links.docs}>
                {nextDoc.title}
                <ChevronRight />
              </NextLink>
            </Button>
          ) : (
            <div />
          )}
        </div>
      </div>
      <Toc items={flattenToc(doc.toc)} />
    </div>
  )
}
