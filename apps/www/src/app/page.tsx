import NextLink from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Slider,
  TabContent,
  TabList,
  Tabs,
  TabTrigger,
  ToggleGroup,
  ToggleGroupItem,
} from "@bun-ui/react"
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Code,
  Package,
  Zap,
} from "lucide-react"

import { ComponentCard } from "@/components/component-card"
import { Footer } from "@/components/footer"
import { GithubIcon } from "@/components/icons"
import { InstallCommandButton } from "@/components/install-command-button"

const HomePage = () => {
  return (
    <>
      <main className="min-h-screen">
        <div className="from-primary/5 to-background relative overflow-hidden bg-gradient-to-b">
          <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
                Bun UI
              </h1>
              <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-xl">
                Build beautiful, accessible, and reusable React components
                effortlessly. Designed for modern web applications.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="text-base">
                  <NextLink href="/docs/installation">Get Started</NextLink>
                </Button>
                <InstallCommandButton />
              </div>
            </div>
          </div>
        </div>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 rounded-full p-4">
                  <Zap className="text-primary h-8 w-8" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">Lightning Fast</h3>
                <p className="text-muted-foreground mt-4">
                  Built with performance in mind, ensuring smooth interactions
                  and quick load times.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 rounded-full p-4">
                  <Package className="text-primary h-8 w-8" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">Easy to Use</h3>
                <p className="text-muted-foreground mt-4">
                  Simple API design with comprehensive documentation and
                  examples.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 rounded-full p-4">
                  <Code className="text-primary h-8 w-8" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">Customizable</h3>
                <p className="text-muted-foreground mt-4">
                  Fully customizable components that adapt to your design
                  system.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted/50 py-24">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Component Library
              </h2>
              <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
                A collection of carefully crafted components to help you build
                amazing user interfaces.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <ComponentCard>
                <div className="flex h-36 items-center justify-center">
                  <Slider
                    defaultValue={[50]}
                    max={100}
                    step={1}
                    className="w-[200px]"
                  />
                </div>
                <p className="text-muted-foreground mt-8">Slider</p>
              </ComponentCard>

              <ComponentCard>
                <div className="flex h-36 items-center justify-center">
                  <Tabs defaultValue="overview" className="w-full max-w-sm">
                    <TabList>
                      <TabTrigger value="overview">Overview</TabTrigger>
                      <TabTrigger value="settings">Settings</TabTrigger>
                    </TabList>
                    <TabContent value="overview">
                      <p className="text-sm">Overview content goes here</p>
                    </TabContent>
                    <TabContent value="settings">
                      <p className="text-sm">Settings content goes here</p>
                    </TabContent>
                  </Tabs>
                </div>
                <p className="text-muted-foreground mt-8">Tabs</p>
              </ComponentCard>

              <ComponentCard>
                <div className="flex h-36 items-center justify-center">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button color="destructive">Delete Account</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <p className="text-muted-foreground mt-8">Alert Dialog</p>
              </ComponentCard>

              <ComponentCard>
                <div className="flex h-36 items-center justify-center">
                  <ToggleGroup type="single" defaultValue="center">
                    <ToggleGroupItem value="left" aria-label="Align left">
                      <AlignLeft className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="center" aria-label="Align center">
                      <AlignCenter className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="right" aria-label="Align right">
                      <AlignRight className="h-4 w-4" />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <p className="text-muted-foreground mt-8">Toggle Group</p>
              </ComponentCard>
            </div>
            <div className="mt-12 text-center">
              <Button asChild variant="outlined" size="lg">
                <NextLink href="/components">View All Components</NextLink>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Build Amazing UIs?
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
              Start building beautiful applications with Bun UI today.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <NextLink href="/docs">View Documentation</NextLink>
              </Button>
              <Button asChild variant="outlined" size="lg">
                <NextLink
                  href="https://github.com/bunui-kit/bun-ui"
                  target="_blank"
                >
                  <GithubIcon className="mr-2" />
                  GitHub
                </NextLink>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default HomePage
