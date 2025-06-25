import { ThemeProvider as NextThemesProvider } from "next-themes"

const ThemeProvider = ({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) => {
  return (
    <NextThemesProvider attribute="class" {...props}>
      {children}
    </NextThemesProvider>
  )
}

export default ThemeProvider
