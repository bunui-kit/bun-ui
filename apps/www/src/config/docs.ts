export const sideBarNavs: SideBarNavItem[] = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        url: "/docs",
        items: [],
      },
      {
        title: "Installation",
        url: "/docs/installation",
        items: [],
      },
      {
        title: "Credits",
        url: "/docs/credits",
        items: [],
      },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Accordion", url: "/docs/components/accordion", items: [] },
      {
        title: "Alert Dialog",
        url: "/docs/components/alert-dialog",
        items: [],
      },
      { title: "Alert", url: "/docs/components/alert", items: [] },
      { title: "Avatar", url: "/docs/components/avatar", items: [] },
      { title: "Badge", url: "/docs/components/badge", items: [] },
      { title: "Button", url: "/docs/components/button", items: [] },
      { title: "Breadcrumb", url: "/docs/components/breadcrumb", items: [] },
      { title: "Calendar", url: "/docs/components/calendar", items: [] },
      { title: "Card", url: "/docs/components/card", items: [] },
      { title: "Checkbox", url: "/docs/components/checkbox", items: [] },
      { title: "Date Picker", url: "/docs/components/date-picker", items: [] },
      { title: "Dialog", url: "/docs/components/dialog", items: [] },
      { title: "Drawer", url: "/docs/components/drawer", items: [] },
      {
        title: "Dropdown Menu",
        url: "/docs/components/dropdown-menu",
        items: [],
      },
      { title: "File Upload", url: "/docs/components/file-upload", items: [] },
      { title: "Input", url: "/docs/components/input", items: [] },
      { title: "Link", url: "/docs/components/link", items: [] },
      { title: "Pagination", url: "/docs/components/pagination", items: [] },
      { title: "Popover", url: "/docs/components/popover", items: [] },
      { title: "Progress", url: "/docs/components/progress", items: [] },
      { title: "Radio Group", url: "/docs/components/radio-group", items: [] },
      { title: "Select", url: "/docs/components/select", items: [] },
      { title: "Skeleton", url: "/docs/components/skeleton", items: [] },
      { title: "Slider", url: "/docs/components/slider", items: [] },
      { title: "Spinner", url: "/docs/components/spinner", items: [] },
      { title: "Stepper", url: "/docs/components/stepper", items: [] },
      { title: "Switch", url: "/docs/components/switch", items: [] },
      { title: "Tabs", url: "/docs/components/tabs", items: [] },
      { title: "Timeline", url: "/docs/components/timeline", items: [] },
      { title: "Toast", url: "/docs/components/toast", items: [] },
      {
        title: "Toggle Group",
        url: "/docs/components/toggle-group",
        items: [],
      },
      { title: "Toggle", url: "/docs/components/toggle", items: [] },
      { title: "Tooltip", url: "/docs/components/tooltip", items: [] },
    ],
  },
]

export const docsConfig: DocsConfig = {
  sideBarNavs: sideBarNavs,
}

export interface DocsConfig {
  sideBarNavs: SideBarNavItem[]
}

export interface NavItem {
  title: string
  url?: string
  external?: boolean
  status?: string
  disabled?: boolean
  label?: string
}

export interface SideBarNavItem extends NavItem {
  items: SideBarNavItem[]
}
