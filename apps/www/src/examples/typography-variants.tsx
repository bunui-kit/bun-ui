import { Typography } from "@bun-ui/react"

export const TypographyVariants = () => {
  return (
    <div>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
      <Typography variant="p">
        This is a paragraph with some text. It demonstrates the default
        paragraph styling.
      </Typography>
      <Typography variant="blockquote">
        This is a blockquote. It's styled with a left border and italic text.
      </Typography>
      <Typography variant="lead">
        This is a lead paragraph. It's slightly larger and has a muted color.
      </Typography>
      <Typography variant="muted">This is muted text.</Typography>
    </div>
  )
}
