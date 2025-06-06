"use client"

import { useEffect, useState } from "react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  Label,
  Link,
  Progress,
  Select,
  SelectItem,
  Skeleton,
  Switch,
  TabContent,
  TabList,
  Tabs,
  TabTrigger,
  Tooltip,
  useToast,
} from "@bun-ui/react"
import {
  Activity,
  ArrowDown,
  ArrowUp,
  BarChart,
  Bell,
  CheckCircle,
  Clock,
  Download,
  FileText,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Settings,
  Share2,
  TrendingUp,
  Users,
} from "lucide-react"

const metrics = [
  {
    title: "Total Users",
    value: "1,234",
    change: "+12%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Active Sessions",
    value: "456",
    change: "+8%",
    trend: "up",
    icon: Activity,
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "+0.5%",
    trend: "up",
    icon: CheckCircle,
  },
  {
    title: "Avg. Session",
    value: "4m 32s",
    change: "-45s",
    trend: "down",
    icon: Clock,
  },
]

const engagementMetrics = [
  {
    title: "Social Shares",
    value: "2,345",
    change: "+18%",
    trend: "up",
    icon: Share2,
  },
  {
    title: "Comments",
    value: "1,234",
    change: "+12%",
    trend: "up",
    icon: MessageSquare,
  },
  {
    title: "Email Subscribers",
    value: "5,678",
    change: "+5%",
    trend: "up",
    icon: Mail,
  },
  {
    title: "Document Views",
    value: "3,456",
    change: "-2%",
    trend: "down",
    icon: FileText,
  },
]

const topPages = [
  { name: "Homepage", views: 45000, percentage: 45 },
  { name: "Products", views: 30000, percentage: 30 },
  { name: "Blog", views: 25000, percentage: 25 },
]

const topUsers = [
  {
    name: "John Doe",
    role: "Product Manager",
    views: 2345,
    avatar: "/avatar.png",
  },
  {
    name: "Alice Smith",
    role: "Marketing Director",
    views: 1890,
    avatar: "/avatar2.png",
  },
  {
    name: "Robert Johnson",
    role: "Developer",
    views: 1234,
    avatar: "/avatar3.png",
  },
]

const recentEvents = [
  {
    type: "Button Clicks",
    count: 1234,
    change: "+15%",
    status: "active",
  },
  {
    type: "Form Submissions",
    count: 567,
    change: "+8%",
    status: "active",
  },
  {
    type: "Page Views",
    count: 8901,
    change: "+23%",
    status: "active",
  },
]

export default function AnalyticsDashboard() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [dateRange, setDateRange] = useState("7d")
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const { createToast } = useToast()
  const [realTimeData, setRealTimeData] = useState({
    activeUsers: 0,
    pageViews: 0,
    bounceRate: 0,
  })

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData({
        activeUsers: Math.floor(Math.random() * 100) + 50,
        pageViews: Math.floor(Math.random() * 1000) + 500,
        bounceRate: Math.random() * 20 + 30,
      })
    }, 3500)

    return () => clearInterval(interval)
  }, [])

  const handleExport = () => {
    setIsExportModalOpen(false)
    createToast({
      title: "Export Started",
      description: "Your data is being prepared for download.",
    })
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex flex-col justify-between lg:flex-row">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Track your application metrics and user behavior
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectItem value="24h">Last 24 Hours</SelectItem>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
            <SelectItem value="90d">Last 90 Days</SelectItem>
          </Select>
          <Button
            variant="outlined"
            size="sm"
            onClick={() => setIsExportModalOpen(true)}
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Tooltip content="Configure dashboard settings">
            <Button variant="outlined" onClick={() => setIsDrawerOpen(true)}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Tooltip>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Report
          </Button>
        </div>
      </div>

      <Alert
        className="mb-8"
        icon={<Bell className="my-1 h-5 w-5" />}
        color="success"
      >
        <AlertTitle>New Feature Available</AlertTitle>
        <AlertDescription>
          Try our new advanced analytics features to get deeper insights into
          your data. <Link href="#">Learn more</Link>
        </AlertDescription>
      </Alert>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-medium">{metric.title}</span>
              <metric.icon className="text-primary h-5 w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="filled"
                  className={`flex items-center gap-1 ${
                    metric.trend === "up"
                      ? "bg-success text-success-foreground border-success"
                      : "text-destructive-foreground bg-destructive border-destructive"
                  }`}
                >
                  {metric.trend === "up" ? (
                    <ArrowUp className="h-3 w-3" />
                  ) : (
                    <ArrowDown className="h-3 w-3" />
                  )}
                  {metric.change}
                </Badge>
                <span className="text-muted-foreground text-xs">
                  vs last period
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {engagementMetrics.map((metric) => (
          <Card key={metric.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-medium">{metric.title}</span>
              <metric.icon className="text-primary h-5 w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="filled"
                  className={`flex items-center gap-1 ${
                    metric.trend === "up"
                      ? "bg-success text-success-foreground border-success"
                      : "text-destructive-foreground bg-destructive border-destructive"
                  }`}
                >
                  {metric.trend === "up" ? (
                    <ArrowUp className="h-3 w-3" />
                  ) : (
                    <ArrowDown className="h-3 w-3" />
                  )}
                  {metric.change}
                </Badge>
                <span className="text-muted-foreground text-xs">
                  vs last period
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <h3 className="text-lg font-semibold">Real-time Activity</h3>
            <Button variant="text" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                    <Users className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-medium">Active Users</p>
                </div>
                {realTimeData.activeUsers === 0 ? (
                  <Skeleton width="70px" height="30px" variant="rectangular" />
                ) : (
                  <div className="text-lg font-semibold">
                    {realTimeData.activeUsers}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                    <Activity className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-medium">Page Views</p>
                </div>
                {realTimeData.pageViews === 0 ? (
                  <Skeleton width="70px" height="30px" variant="rectangular" />
                ) : (
                  <div className="text-lg font-semibold">
                    {realTimeData.pageViews}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-medium">Bounce Rate</p>
                </div>
                {realTimeData.bounceRate === 0 ? (
                  <Skeleton width="70px" height="30px" variant="rectangular" />
                ) : (
                  <div className="text-lg font-semibold">
                    {realTimeData.bounceRate.toFixed(1)}%
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <h3 className="text-lg font-semibold">Top Performing Pages</h3>
            <Button variant="text" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPages.map((page) => (
                <div
                  key={page.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                      <BarChart className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{page.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {page.views.toLocaleString()} views
                      </p>
                    </div>
                  </div>
                  <div className="text-sm font-medium">{page.percentage}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabList>
          <TabTrigger value="overview">Overview</TabTrigger>
          <TabTrigger value="users">Users</TabTrigger>
          <TabTrigger value="events">Events</TabTrigger>
        </TabList>
        <TabContent value="overview">
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <h3 className="text-lg font-semibold">Page Views</h3>
                <Button variant="text" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                {topPages.map((page) => (
                  <div key={page.name} className="mb-4 last:mb-0">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm">{page.name}</span>
                      <span className="text-muted-foreground text-xs">
                        {page.views.toLocaleString()} views
                      </span>
                    </div>
                    <Progress value={page.percentage} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <h3 className="text-lg font-semibold">User Distribution</h3>
                <Button variant="text" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topUsers.map((user) => (
                    <div
                      key={user.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-muted-foreground text-xs">
                            {user.role}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        {user.views.toLocaleString()} views
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabContent>

        <TabContent value="users">
          <Card className="mt-8">
            <CardHeader>User Activity</CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEvents.map((event) => (
                  <div
                    key={event.type}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 h-8 w-8 rounded-full" />
                      <div>
                        <p className="text-sm font-medium">{event.type}</p>
                        <p className="text-muted-foreground text-xs">
                          {event.count.toLocaleString()} events
                        </p>
                      </div>
                    </div>
                    <Badge variant="outlined">{event.change}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabContent>

        <TabContent value="events">
          <Card className="mt-8">
            <CardHeader>Event Analytics</CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEvents.map((event) => (
                  <div
                    key={event.type}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 h-8 w-8 rounded-full" />
                      <div>
                        <p className="text-sm font-medium">{event.type}</p>
                        <p className="text-muted-foreground text-xs">
                          {event.count.toLocaleString()} events
                        </p>
                      </div>
                    </div>
                    <Badge variant="outlined">{event.change}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold">Recent Notifications</h3>
          <Button variant="text" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert icon={<Bell className="my-1 h-5 w-5" />}>
              <AlertTitle>New Feature Available</AlertTitle>
              <AlertDescription>
                Try our new advanced analytics features to get deeper insights
                into your data.
              </AlertDescription>
            </Alert>
            <Alert color="success">
              <AlertTitle>Export Completed</AlertTitle>
              <AlertDescription>
                Your data has been successfully exported to CSV format.
              </AlertDescription>
            </Alert>
            <Alert color="warning">
              <AlertTitle>Storage Warning</AlertTitle>
              <AlertDescription>
                You&apos;re approaching your storage limit. Consider upgrading
                your plan.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isExportModalOpen} onOpenChange={setIsExportModalOpen}>
        <DialogContent>
          <DialogTitle>Export Data</DialogTitle>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Format</Label>
              <Select defaultValue="csv">
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outlined"
                onClick={() => setIsExportModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Dashboard Settings</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <Switch id="dark-mode" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Email Notifications</Label>
                <Switch id="notifications" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-refresh">Auto Refresh</Label>
                <Switch id="auto-refresh" />
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
