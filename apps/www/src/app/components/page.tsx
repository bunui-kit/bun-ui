"use client"

import { useState } from "react"
import NextLink from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  CommandMenu,
  CommandMenuInput,
  CommandMenuItem,
  CommandMenuList,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  FileUpload,
  FileUploadDropZone,
  FileUploadList,
  FileUploadTrigger,
  Input,
  Label,
  Link,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  Skeleton,
  Slider,
  Spinner,
  Step,
  StepLabel,
  Stepper,
  Switch,
  TabContent,
  TabList,
  Tabs,
  TabTrigger,
  TextArea,
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
} from "@bun-ui/react"
import { Calendar } from "@bun-ui/react/calendar"
import { useToast } from "@bun-ui/react/toast"
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Menu,
  MessageCircle,
  MessageSquare,
  Share2,
  ThumbsUp,
  Upload,
} from "lucide-react"

import { ComponentCard } from "@/components/component-card"

export default function ComponentsPage() {
  const { createToast } = useToast()
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="mx-auto max-w-7xl space-y-14 px-4 py-12">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          🧩 Component Gallery
        </h1>
        <p className="text-muted-foreground text-lg">
          A comprehensive showcase of all available components from{" "}
          <code>@bun-ui/react</code>. Use this space as a reference while
          building your applications.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {/* Form Components */}
        <ComponentCard
          title="Button"
          description="Clickable elements for actions and form submissions."
        >
          <div className="flex gap-2">
            <Button>Submit</Button>
            <Button variant="outlined">Cancel</Button>
          </div>
        </ComponentCard>

        <ComponentCard
          title="Input"
          description="Text input fields for forms and data capture."
        >
          <Input label="Email Address" placeholder="you@example.com" />
        </ComponentCard>

        <ComponentCard
          title="Checkbox"
          description="Binary selection control for forms."
        >
          <Checkbox defaultChecked label="I agree to the terms" />
        </ComponentCard>

        <ComponentCard
          title="Radio Group"
          description="Single selection from a set of options."
        >
          <RadioGroup defaultValue="light" className="space-y-2">
            <RadioGroupItem id="light" value="light" label="Light Mode" />
            <RadioGroupItem id="dark" value="dark" label="Dark Mode" />
          </RadioGroup>
        </ComponentCard>

        <ComponentCard
          title="Select"
          description="Dropdown selection with support for groups."
        >
          <Select placeholder="Select language" label="Programming Language">
            <SelectGroup>
              <SelectLabel>Frontend</SelectLabel>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="vue">Vue</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Backend</SelectLabel>
              <SelectItem value="node">Node.js</SelectItem>
              <SelectItem value="django">Django</SelectItem>
            </SelectGroup>
          </Select>
        </ComponentCard>

        <ComponentCard
          title="Switch"
          description="Toggle switch for binary settings."
        >
          <Switch label="Enable notifications" />
        </ComponentCard>

        <ComponentCard title="Label" description="Accessible form labels.">
          <Label>Username</Label>
        </ComponentCard>

        {/* Navigation Components */}
        <ComponentCard
          title="Tabs"
          description="Content organization with tabbed navigation."
        >
          <Tabs defaultValue="account">
            <TabList>
              <TabTrigger value="account">Account</TabTrigger>
              <TabTrigger value="settings">Settings</TabTrigger>
            </TabList>
            <TabContent value="account">
              <div className="mt-4">
                <p className="text-sm">Account content goes here</p>
              </div>
            </TabContent>
            <TabContent value="settings">
              <div className="mt-4">
                <p className="text-sm">Settings content goes here</p>
              </div>
            </TabContent>
          </Tabs>
        </ComponentCard>

        <ComponentCard
          title="Breadcrumb"
          description="Navigation hierarchy indicator."
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem className="text-foreground">
                Gallery
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </ComponentCard>

        <ComponentCard
          title="Link"
          description="Text-based navigation elements."
        >
          <Link asChild>
            <NextLink href="/">Back to Home</NextLink>
          </Link>
        </ComponentCard>

        {/* Overlay Components */}
        <ComponentCard
          title="Dialog"
          description="Modal dialog for important interactions."
        >
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                This is a dialog description.
              </DialogDescription>
              <DialogFooter className="justify-start">
                <Button>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </ComponentCard>

        <ComponentCard
          title="Alert Dialog"
          description="Confirmation dialog for critical actions."
        >
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction color="destructive">
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </ComponentCard>

        <ComponentCard
          title="Drawer"
          description="Side panel for additional content."
        >
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outlined">
                <Menu className="mr-2 h-4 w-4" />
                Open Drawer
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Drawer Title</DrawerTitle>
              </DrawerHeader>
              <div className="p-4">Drawer content goes here</div>
            </DrawerContent>
          </Drawer>
        </ComponentCard>

        <ComponentCard title="Popover" description="Floating content panel.">
          <Popover>
            <PopoverTrigger asChild>
              <Button>Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <p>Popover content goes here</p>
            </PopoverContent>
          </Popover>
        </ComponentCard>

        <ComponentCard
          title="Dropdown Menu"
          description="Contextual menu of actions."
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Open Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ComponentCard>

        {/* Feedback Components */}
        <ComponentCard
          title="Alert"
          description="Prominent message for user feedback."
        >
          <Alert>
            <AlertTitle>Heads up!</AlertTitle>
          </Alert>
        </ComponentCard>

        <ComponentCard
          title="Toast"
          description="Temporary notification messages."
        >
          <Button
            onClick={() => createToast({ title: "Item saved successfully" })}
          >
            Show Toast
          </Button>
        </ComponentCard>

        <ComponentCard
          title="Progress"
          description="Progress indicator for operations."
        >
          <Progress value={75} />
        </ComponentCard>

        <ComponentCard title="Spinner" description="Loading state indicator.">
          <Spinner size="lg" />
        </ComponentCard>

        <ComponentCard
          title="Skeleton"
          description="Content loading placeholder."
        >
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </ComponentCard>

        {/* Data Display Components */}
        <ComponentCard title="Avatar" description="User profile image display.">
          <div className="flex items-center gap-5">
            <Avatar>
              <AvatarImage src="/avatar.png" />
              <AvatarFallback>KN</AvatarFallback>
            </Avatar>
          </div>
        </ComponentCard>

        <ComponentCard
          title="Calendar"
          description="Date picker and calendar view."
        >
          <Calendar
            className="mx-auto"
            startMonth={new Date()}
            showOutsideDays
          />
        </ComponentCard>

        <ComponentCard title="Slider" description="Range selection control.">
          <Slider size="md" defaultValue={30} />
        </ComponentCard>

        <ComponentCard
          title="Pagination"
          description="Page navigation control."
        >
          <Pagination count={10} defaultPage={1} color="primary" />
        </ComponentCard>

        <ComponentCard
          title="Card"
          description="Container for displaying content."
        >
          <Card>
            <CardHeader className="items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Project Status</h3>
                <p className="text-muted-foreground text-sm">
                  Last updated 2 hours ago
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm">Active</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Progress</p>
                    <p className="text-muted-foreground text-sm">
                      75% completed
                    </p>
                  </div>
                  <Progress value={75} className="w-24" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Team Members</p>
                    <div className="flex -space-x-2">
                      <Avatar className="border-background h-6 w-6 border-2">
                        <AvatarImage src="/avatar.png" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Avatar className="border-background h-6 w-6 border-2">
                        <AvatarImage src="/avatar.png" />
                        <AvatarFallback>AS</AvatarFallback>
                      </Avatar>
                      <Avatar className="border-background h-6 w-6 border-2">
                        <AvatarImage src="/avatar.png" />
                        <AvatarFallback>RK</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  <Button size="sm" variant="outlined">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </ComponentCard>

        <ComponentCard
          title="Command Menu"
          description="Command palette interface."
        >
          <CommandMenu>
            <CommandMenuInput placeholder="Search..." />
            <CommandMenuList>
              {/* Add a first hidden item to prevent auto focus/scrolling to this component */}
              <CommandMenuItem value="-" className="hidden"></CommandMenuItem>
              <CommandMenuItem value="settings">Settings</CommandMenuItem>
              <CommandMenuItem value="help">Help</CommandMenuItem>
            </CommandMenuList>
          </CommandMenu>
        </ComponentCard>

        <ComponentCard
          title="Accordion"
          description="Expandable content sections."
        >
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="faq1">
              <AccordionTrigger>What is Bun UI?</AccordionTrigger>
              <AccordionContent>
                Bun UI is a customizable component library designed for modern
                React apps.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq2">
              <AccordionTrigger>Can I customize styles?</AccordionTrigger>
              <AccordionContent>
                Absolutely. All components are unopinionated and easy to theme
                using Tailwind or your design tokens.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ComponentCard>
        <ComponentCard
          title="Toggle Group"
          description="Group of toggle buttons."
        >
          <ToggleGroup defaultValue="left">
            <ToggleGroupItem value="left" aria-label="Align Left">
              <AlignLeft />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align Center">
              <AlignCenter />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align Right">
              <AlignRight />
            </ToggleGroupItem>
          </ToggleGroup>
        </ComponentCard>
        <ComponentCard title="Badge" description="Badge">
          <div className="flex space-x-2">
            <Badge>Plus</Badge>
            <Badge color="accent">Premium</Badge>
          </div>
        </ComponentCard>
        <ComponentCard title="Tooltip" description="Tooltip">
          <div className="flex items-center space-x-2">
            <Tooltip placement="left" content="What's up">
              <Button>Hover</Button>
            </Tooltip>
            <Tooltip clickOnly placement="bottom" content="What's up">
              <Button>Click</Button>
            </Tooltip>
          </div>
        </ComponentCard>
        <ComponentCard title="Text area">
          <TextArea label="Text Area" />
        </ComponentCard>
        <ComponentCard title="File upload button">
          <FileUpload onFileSelect={(files) => console.log(files)}>
            <FileUploadTrigger asChild>
              <Button variant="outlined" className="w-fit" color="neutral">
                <Upload />
                <p className="text-sm">Upload</p>
              </Button>
            </FileUploadTrigger>
            <FileUploadList />
          </FileUpload>
        </ComponentCard>
        <ComponentCard title="File upload dropzone">
          <FileUpload onFileSelect={(files) => console.log(files)}>
            <FileUploadDropZone className="items-center justify-center border border-dashed">
              <Upload />
              <p className="text-sm">Drop here to upload</p>
            </FileUploadDropZone>
            <FileUploadList />
          </FileUpload>
        </ComponentCard>
        <ComponentCard
          title="Timeline"
          className="col-span-1 md:col-span-2 lg:col-span-3"
        >
          <Timeline>
            <TimelineItem className="before:flex-0">
              <TimelineSeparator>
                <TimelineIndicator>
                  <MessageSquare className="h-4 w-4" />
                </TimelineIndicator>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent className="bg-card rounded-lg border p-4">
                <TimelineTitle className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatar2.png" />
                  </Avatar>
                  <div>
                    <p className="text-sm">Alex Thompson</p>
                    <p className="text-muted-foreground text-xs">1 day ago</p>
                  </div>
                </TimelineTitle>
                <p className="mt-3 text-sm">
                  Just hit 10k followers! Thank you all for your amazing
                  support. Here&apos;s to the next milestone! 🎉
                </p>
                <div className="mt-2 flex items-center gap-4">
                  <Button size="sm" variant="text" color="neutral">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-sm">1.2k</span>
                  </Button>
                  <Button size="sm" variant="text" color="neutral">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">89</span>
                  </Button>
                  <Button size="sm" variant="text" color="neutral">
                    <Share2 className="h-4 w-4" />
                    <span className="text-sm">Share</span>
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="outlined">#milestone</Badge>
                  <Badge variant="outlined">#thankyou</Badge>
                  <Badge variant="outlined">#community</Badge>
                </div>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem className="before:flex-0">
              <TimelineSeparator>
                <TimelineIndicator>
                  <MessageSquare className="h-4 w-4" />
                </TimelineIndicator>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent className="bg-card rounded-lg border p-4">
                <TimelineTitle className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatar3.png" />
                  </Avatar>
                  <div>
                    <p className="text-sm">Mike Chen</p>
                    <p className="text-muted-foreground text-xs">5 hours ago</p>
                  </div>
                </TimelineTitle>
                <p className="text-sm">
                  Working on some exciting new features for our app! Can&apos;t
                  wait to share more details soon.
                </p>
                <div className="mt-2 flex items-center gap-4">
                  <Button size="sm" variant="text" color="neutral">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-sm">256</span>
                  </Button>
                  <Button size="sm" variant="text" color="neutral">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">42</span>
                  </Button>
                  <Button size="sm" variant="text" color="neutral">
                    <Share2 className="h-4 w-4" />
                    <span className="text-sm">Share</span>
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="outlined">#coding</Badge>
                  <Badge variant="outlined">#development</Badge>
                </div>
                <div className="bg-muted/50 mt-4 space-y-3 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/avatar2.png" />
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Alex Thompson</p>
                      <p className="text-muted-foreground text-sm">
                        This looks amazing! Can&apos;t wait to see the final
                        result.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/avatar4.png" />
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Emma Wilson</p>
                      <p className="text-muted-foreground text-sm">
                        Will there be a beta testing phase? I&apos;d love to try
                        it out!
                      </p>
                    </div>
                  </div>
                </div>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem className="before:flex-0">
              <TimelineSeparator>
                <TimelineIndicator>
                  <ThumbsUp className="h-4 w-4" />
                </TimelineIndicator>
              </TimelineSeparator>
              <TimelineContent className="bg-card rounded-lg border p-4">
                <TimelineTitle className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatar4.png" />
                  </Avatar>
                  <div>
                    <p className="text-sm">Emma Wilson</p>
                    <p className="text-muted-foreground text-xs">8 hours ago</p>
                  </div>
                </TimelineTitle>
                <p className="text-sm">
                  Liked your comment on Mike Chen&apos;s post about the new app
                  features.
                </p>
                <div className="bg-muted/50 mt-3 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/avatar2.png" />
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Alex Thompson</p>
                      <p className="text-muted-foreground text-sm">
                        This looks amazing! Can&apos;t wait to see the final
                        result.
                      </p>
                    </div>
                  </div>
                </div>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </ComponentCard>
        <ComponentCard title="Stepper">
          <Stepper activeStep={activeStep} className="w-full">
            <Step>
              <StepLabel>Step 1</StepLabel>
            </Step>
            <Step>
              <StepLabel>Step 2</StepLabel>
            </Step>
            <Step>
              <StepLabel>Step 3</StepLabel>
            </Step>
          </Stepper>
          <div className="mt-5 flex">
            <Button
              size="sm"
              className="mr-5"
              onClick={() => {
                setActiveStep((prev) => Math.max(prev - 1, 0))
              }}
            >
              Previous
            </Button>
            <Button
              size="sm"
              onClick={() => setActiveStep((prev) => Math.min(prev + 1, 3))}
            >
              Next
            </Button>
          </div>
        </ComponentCard>

        <ComponentCard
          title="Cookie Preferences"
          description="Non-modal dialog for cookie preferences"
        >
          <Dialog modal={false}>
            <DialogTrigger asChild>
              <Button variant="outlined" color="neutral">
                Manage Cookie Preferences
              </Button>
            </DialogTrigger>
            <DialogContent
              closeOnClickOutside={false}
              className="top-unset top-auto right-0 bottom-0 left-0 h-fit max-w-full translate-x-0 translate-y-0 sm:max-w-full"
            >
              <div className="container mx-auto flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <DialogTitle className="text-base">
                    Cookie Preferences
                  </DialogTitle>
                  <p className="text-muted-foreground text-sm">
                    We use cookies to enhance your browsing experience, serve
                    personalized content, and analyze our traffic.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 sm:flex-nowrap">
                  <div className="flex items-center gap-2">
                    <Switch defaultChecked disabled />
                    <Label className="text-sm">Essential</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch />
                    <Label className="text-sm">Analytics</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch />
                    <Label className="text-sm">Marketing</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch />
                    <Label className="text-sm">Preferences</Label>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outlined" color="neutral" size="sm">
                    Reject All
                  </Button>
                  <DialogClose asChild>
                    <Button size="sm">Accept All</Button>
                  </DialogClose>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </ComponentCard>
      </div>
    </div>
  )
}
