import { Typography } from "@bun-ui/react"

export const TypographyElements = () => {
  return (
    <div className="space-y-4">
      <Typography as="h1">Heading 1 Element</Typography>
      <Typography as="h2">Heading 2 Element</Typography>
      <Typography as="h3">Heading 3 Element</Typography>
      <Typography as="h4">Heading 4 Element</Typography>
      <Typography as="p">
        This is a paragraph element with some text. The styling is determined by
        the element type, making it more semantic and maintainable.
      </Typography>
      <Typography as="span">This is a span element for inline text.</Typography>
      <Typography as="blockquote">
        This is a blockquote element for quoting content.
      </Typography>
    </div>
  )
}
