import { Typography } from "@bun-ui/react"

export const TypographyElements = () => {
  return (
    <div className="space-y-4">
      <Typography as="h1" variant="h1">
        Heading 1 Element
      </Typography>
      <Typography as="h2" variant="h2">
        Heading 2 Element
      </Typography>
      <Typography as="h3" variant="h3">
        Heading 3 Element
      </Typography>
      <Typography as="h4" variant="h4">
        Heading 4 Element
      </Typography>
      <Typography as="p" variant="p">
        This is a paragraph element with some text. You can use the same variant
        with different elements to maintain consistent styling while changing
        the semantic meaning.
      </Typography>
      <Typography as="span" variant="muted">
        This is a span element with muted styling.
      </Typography>
      <Typography as="blockquote" variant="blockquote">
        This is a blockquote element with blockquote styling.
      </Typography>
    </div>
  )
}
