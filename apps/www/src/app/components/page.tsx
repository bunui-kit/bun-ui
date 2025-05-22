"use client"

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
  Switch,
  TabContent,
  TabList,
  Tabs,
  TabTrigger,
  TextArea,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
} from "@bun-ui/react"
import { Calendar } from "@bun-ui/react/calendar"
import { useToast } from "@bun-ui/react/toast"
import { AlignCenter, AlignLeft, AlignRight, Menu, Upload } from "lucide-react"

import { ComponentCard } from "@/components/component-card"

export default function ComponentsPage() {
  const { createToast } = useToast()

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
          </FileUpload>
        </ComponentCard>
        <ComponentCard title="File upload dropzone">
          <FileUpload onFileSelect={(files) => console.log(files)}>
            <FileUploadDropZone className="items-center justify-center border border-dashed">
              <Upload />
              <p className="text-sm">Drop here to upload</p>
            </FileUploadDropZone>
          </FileUpload>
        </ComponentCard>
      </div>
    </div>
  )
}
