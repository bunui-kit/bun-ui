"use client"

import { useMemo, useState } from "react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  BadgeProps,
  Button,
  Calendar,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  DateRange,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  Select,
  SelectItem,
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
  Tooltip,
} from "@bun-ui/react"
import { endOfDay, format, isWithinInterval, startOfDay } from "date-fns"
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  CalendarDaysIcon,
  CalendarIcon,
  CheckCircle,
  Clock,
  Code2,
  GitBranch,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Tag,
  User,
} from "lucide-react"

const tasks = [
  {
    id: 1,
    title: "Design new landing page",
    description:
      "Create a modern and responsive landing page design with focus on user experience and conversion optimization",
    status: "in-progress",
    priority: "high",
    assignee: {
      name: "John Doe",
      avatar: "/avatar.png",
      role: "Senior Designer",
    },
    dueDate: "2025-03-20",
    tags: ["Design", "Frontend", "Marketing"],
    progress: 75,
    comments: 5,
    attachments: 3,
    completed: true,
  },
  {
    id: 2,
    title: "Implement authentication",
    description:
      "Set up secure user authentication with JWT, including social login options and password reset functionality",
    status: "todo",
    priority: "medium",
    assignee: {
      name: "Alice Smith",
      avatar: "/avatar.png",
      role: "Backend Developer",
    },
    dueDate: "2025-03-25",
    tags: ["Backend", "Security", "API"],
    progress: 0,
    comments: 2,
    attachments: 1,
  },
  {
    id: 3,
    title: "Write API documentation",
    description:
      "Document all API endpoints with examples, request/response formats, and authentication requirements",
    status: "completed",
    priority: "low",
    assignee: {
      name: "Robert Johnson",
      avatar: "/avatar.png",
      role: "Technical Writer",
    },
    dueDate: "2025-03-15",
    tags: ["Documentation", "API"],
    progress: 100,
    comments: 8,
    attachments: 4,
  },
  {
    id: 4,
    title: "Mobile app testing",
    description:
      "Perform comprehensive testing of the mobile app across different devices and OS versions",
    status: "in-progress",
    priority: "high",
    assignee: {
      name: "Sarah Wilson",
      avatar: "/avatar.png",
      role: "QA Engineer",
    },
    dueDate: "2025-03-22",
    tags: ["Testing", "Mobile", "QA"],
    progress: 45,
    comments: 12,
    attachments: 6,
  },
  {
    id: 5,
    title: "Database optimization",
    description:
      "Optimize database queries and indexes for better performance and scalability",
    status: "todo",
    priority: "medium",
    assignee: {
      name: "Michael Brown",
      avatar: "/avatar.png",
      role: "Database Engineer",
    },
    dueDate: "2025-03-28",
    tags: ["Database", "Performance", "Backend"],
    progress: 0,
    comments: 3,
    attachments: 2,
  },
]

const priorities = [
  { value: "high", label: "High", color: "destructive" },
  { value: "medium", label: "Medium", color: "warning" },
  { value: "low", label: "Low", color: "success" },
]

const statuses = [
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
]

const teamMembers = [
  { id: "john", name: "John Doe", role: "Senior Designer" },
  { id: "alice", name: "Alice Smith", role: "Backend Developer" },
  { id: "robert", name: "Robert Johnson", role: "Technical Writer" },
  { id: "sarah", name: "Sarah Wilson", role: "QA Engineer" },
  { id: "michael", name: "Michael Brown", role: "Database Engineer" },
]

const taskActivities = [
  {
    id: 1,
    type: "comment",
    user: {
      name: "John Doe",
      avatar: "/avatar.png",
      role: "Senior Designer",
    },
    timestamp: "2 hours ago",
    content: "Added some initial design mockups for the landing page",
    task: "Design new landing page",
  },
  {
    id: 2,
    type: "status",
    user: {
      name: "Alice Smith",
      avatar: "/avatar2.png",
      role: "Backend Developer",
    },
    timestamp: "1 hour ago",
    content: "Started implementing authentication system",
    task: "Implement authentication",
  },
  {
    id: 3,
    type: "complete",
    user: {
      name: "Robert Johnson",
      avatar: "/avatar3.png",
      role: "Technical Writer",
    },
    timestamp: "45 minutes ago",
    content: "Completed API documentation with examples",
    task: "Write API documentation",
  },
  {
    id: 4,
    type: "progress",
    user: {
      name: "Sarah Wilson",
      avatar: "/avatar4.png",
      role: "QA Engineer",
    },
    timestamp: "30 minutes ago",
    content: "Updated test coverage to 85%",
    task: "Mobile app testing",
  },
  {
    id: 5,
    type: "assign",
    user: {
      name: "Michael Brown",
      avatar: "/avatar.png",
      role: "Database Engineer",
    },
    timestamp: "15 minutes ago",
    content: "Assigned database optimization task",
    task: "Database optimization",
  },
]

export default function TaskManagement() {
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false)
  const [tasksState, setTasksState] = useState(tasks)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedAssignee, setSelectedAssignee] = useState("all")
  const [dateInputValue, setDateInputValue] = useState("")
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [sortBy, setSortBy] = useState("dueDate")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [dateRange, setDateRange] = useState<DateRange>()

  const handleDateChange = (date?: Date) => {
    setSelectedDate(date)
    setDateInputValue(format(date || "", "MM/dd/yyyy"))
    setCalendarOpen(false)
  }

  const filteredTasks = useMemo(
    () =>
      tasksState.filter((task) => {
        const matchesSearch = task.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
        const matchesPriority =
          selectedPriority === "all" || task.priority === selectedPriority
        const matchesStatus =
          selectedStatus === "all" || task.status === selectedStatus
        const matchesAssignee =
          selectedAssignee === "all" || task.assignee.name === selectedAssignee
        const matchesDateRange =
          !dateRange?.from ||
          !dateRange?.to ||
          isWithinInterval(new Date(task.dueDate), {
            start: startOfDay(dateRange.from),
            end: endOfDay(dateRange.to),
          })
        return (
          matchesSearch &&
          matchesPriority &&
          matchesStatus &&
          matchesAssignee &&
          matchesDateRange
        )
      }),
    [
      tasksState,
      dateRange,
      searchQuery,
      selectedPriority,
      selectedStatus,
      selectedAssignee,
    ]
  )

  const handleCheckboxChange = (taskId: number) => {
    setTasksState((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "completed" ? "todo" : "completed",
            }
          : task
      )
    )
  }

  const sortOptions = [
    { value: "dueDate", label: "Due Date" },
    { value: "priority", label: "Priority" },
    { value: "status", label: "Status" },
    { value: "assignee", label: "Assignee" },
  ]

  const sortedAndFilteredTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "dueDate") {
      return sortOrder === "asc"
        ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
    }
    if (sortBy === "priority") {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return sortOrder === "asc"
        ? priorityOrder[a.priority as keyof typeof priorityOrder] -
            priorityOrder[b.priority as keyof typeof priorityOrder]
        : priorityOrder[b.priority as keyof typeof priorityOrder] -
            priorityOrder[a.priority as keyof typeof priorityOrder]
    }
    if (sortBy === "status") {
      const statusOrder = { todo: 1, "in-progress": 2, completed: 3 }
      return sortOrder === "asc"
        ? statusOrder[a.status as keyof typeof statusOrder] -
            statusOrder[b.status as keyof typeof statusOrder]
        : statusOrder[b.status as keyof typeof statusOrder] -
            statusOrder[a.status as keyof typeof statusOrder]
    }
    if (sortBy === "assignee") {
      return sortOrder === "asc"
        ? a.assignee.name.localeCompare(b.assignee.name)
        : b.assignee.name.localeCompare(a.assignee.name)
    }
    return 0
  })

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex flex-col items-center justify-between lg:flex-row">
        <div>
          <h1 className="text-3xl font-bold">Task Management</h1>
          <p className="text-muted-foreground mt-1">
            Organize and track your team&apos;s tasks
          </p>
        </div>
        <div className="mt-4 flex items-center gap-4 lg:mt-0">
          <Button variant="outlined" onClick={() => setIsNewTaskOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
          <Tooltip content="Task settings">
            <Button variant="outlined">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-4">
        <Card className="min-w-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-sm font-medium">Total Tasks</span>
            <CheckCircle className="text-primary h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.length}</div>
            <div className="text-muted-foreground mt-1 text-xs">
              Across all projects
            </div>
          </CardContent>
        </Card>
        <Card className="min-w-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-sm font-medium">In Progress</span>
            <Clock className="text-primary h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tasks.filter((t) => t.status === "in-progress").length}
            </div>
            <div className="text-muted-foreground mt-1 text-xs">
              Active tasks
            </div>
          </CardContent>
        </Card>
        <Card className="min-w-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-sm font-medium">Completed</span>
            <CheckCircle className="text-primary h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tasks.filter((t) => t.status === "completed").length}
            </div>
            <div className="text-muted-foreground mt-1 text-xs">
              Finished tasks
            </div>
          </CardContent>
        </Card>
        <Card className="min-w-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-sm font-medium">Overdue</span>
            <AlertCircle className="text-destructive h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                tasks.filter(
                  (t) =>
                    new Date(t.dueDate) < new Date() && t.status !== "completed"
                ).length
              }
            </div>
            <div className="text-muted-foreground mt-1 text-xs">
              Past due date
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 flex flex-col gap-4">
        <div className="grid grid-cols-2 items-center gap-4 lg:flex">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 lg:w-[150px]"
            />
          </div>
          <Select
            value={selectedPriority}
            onValueChange={setSelectedPriority}
            className="w-full"
          >
            <SelectItem value="all">All Priorities</SelectItem>
            {priorities.map((priority) => (
              <SelectItem key={priority.value} value={priority.value}>
                {priority.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            value={selectedStatus}
            onValueChange={setSelectedStatus}
            className="w-full"
          >
            <SelectItem value="all">All Status</SelectItem>
            {statuses.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            value={selectedAssignee}
            onValueChange={setSelectedAssignee}
            className="w-[200px] shrink-0"
          >
            <SelectItem value="all">All Assignees</SelectItem>
            {teamMembers.map((member) => (
              <SelectItem key={member.id} value={member.name}>
                {member.name} ({member.role})
              </SelectItem>
            ))}
          </Select>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button variant="outlined" className="w-[200px]">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from && dateRange?.to ? (
                  <>
                    {format(dateRange.from, "LLL dd")} -{" "}
                    {format(dateRange.to, "LLL dd")}
                  </>
                ) : (
                  "Select date range"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
              />
              <div className="mt-2 px-5 pb-2">
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={() => setDateRange(undefined)}
                >
                  Clear
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <Select
              value={sortBy}
              onValueChange={setSortBy}
              className="w-[150px]"
            >
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
            <IconButton
              className="shrink-0"
              color="neutral"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              {sortOrder === "asc" ? <ArrowUp /> : <ArrowDown />}
            </IconButton>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="text-muted-foreground h-4 w-4" />
            <span className="text-muted-foreground text-sm">
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="list">
        <TabList>
          <TabTrigger value="list">List View</TabTrigger>
          <TabTrigger value="board">Board View</TabTrigger>
          <TabTrigger value="calendar">Calendar</TabTrigger>
          <TabTrigger value="activity">Activity</TabTrigger>
        </TabList>
        <TabContent value="list">
          <div className="mt-8 space-y-4">
            {sortedAndFilteredTasks.map((task) => (
              <Card key={task.id} className="transition-all hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex w-full items-start gap-4">
                      <Checkbox
                        checked={task.status === "completed"}
                        className="mt-1"
                        onCheckedChange={() => handleCheckboxChange(task.id)}
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">
                              {task.title}
                            </h3>
                            <p className="text-muted-foreground mt-1 text-sm">
                              {task.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge
                              variant="outlined"
                              color={
                                priorities.find(
                                  (p) => p.value === task.priority
                                )?.color as BadgeProps["color"]
                              }
                            >
                              {task.priority}
                            </Badge>
                            <IconButton>
                              <MoreHorizontal />
                            </IconButton>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={task.assignee.avatar} />
                              <AvatarFallback>
                                {task.assignee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <span className="text-sm">
                                {task.assignee.name}
                              </span>
                              <span className="text-muted-foreground ml-1 text-xs">
                                ({task.assignee.role})
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="text-muted-foreground h-4 w-4" />
                            <span className="text-sm">
                              Due {format(new Date(task.dueDate), "MM/dd/yyyy")}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Tag className="text-muted-foreground h-4 w-4" />
                            <div className="flex gap-2">
                              {task.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outlined"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Tooltip content="View comments">
                              <Button
                                variant="text"
                                size="sm"
                                className="gap-1"
                              >
                                <MessageSquare className="h-4 w-4" />
                                <span className="text-sm">{task.comments}</span>
                              </Button>
                            </Tooltip>
                            <Tooltip content="View attachments">
                              <Button
                                variant="text"
                                size="sm"
                                className="gap-1"
                              >
                                <Code2 className="h-4 w-4" />
                                <span className="text-sm">
                                  {task.attachments}
                                </span>
                              </Button>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {task.status === "in-progress" && (
                    <div className="mt-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm">Progress</span>
                        <span className="text-sm">{task.progress}%</span>
                      </div>
                      <Progress value={task.progress} />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabContent>
        <TabContent value="board">
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {statuses.map((status) => (
                <div key={status.value} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{status.label}</h3>
                    <Badge variant="outlined">
                      {
                        filteredTasks.filter((t) => t.status === status.value)
                          .length
                      }
                    </Badge>
                  </div>
                  <div className="min-h-[200px] space-y-4 rounded-lg border border-dashed p-4">
                    {filteredTasks
                      .filter((task) => task.status === status.value)
                      .map((task) => (
                        <Card
                          key={task.id}
                          className="transition-all hover:shadow-md"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium">{task.title}</h4>
                                <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                                  {task.description}
                                </p>
                                <div className="mt-4 flex items-center gap-4">
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage src={task.assignee.avatar} />
                                      <AvatarFallback>
                                        {task.assignee.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm">
                                      {task.assignee.name}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <CalendarIcon className="text-muted-foreground h-4 w-4" />
                                    <span className="text-sm">
                                      {format(
                                        new Date(task.dueDate),
                                        "MM/dd/yyyy"
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <Button variant="text" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                              <Badge
                                variant="outlined"
                                color={
                                  priorities.find(
                                    (p) => p.value === task.priority
                                  )?.color as BadgeProps["color"]
                                }
                              >
                                {task.priority}
                              </Badge>
                              {task.status === "in-progress" && (
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">
                                    {task.progress}%
                                  </span>
                                  <Progress
                                    value={task.progress}
                                    className="w-[100px]"
                                  />
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabContent>
        <TabContent value="calendar">
          <Card className="mt-8">
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center">
                Calendar view coming soon...
              </p>
            </CardContent>
          </Card>
        </TabContent>
        <TabContent value="activity">
          <div className="mt-8">
            <Timeline>
              {taskActivities.map((activity, index) => (
                <TimelineItem key={activity.id} className="before:flex-0">
                  <TimelineSeparator>
                    <TimelineIndicator>
                      {activity.type === "comment" && (
                        <MessageSquare className="h-4 w-4" />
                      )}
                      {activity.type === "status" && (
                        <GitBranch className="h-4 w-4" />
                      )}
                      {activity.type === "complete" && (
                        <CheckCircle className="h-4 w-4" />
                      )}
                      {activity.type === "progress" && (
                        <Code2 className="h-4 w-4" />
                      )}
                      {activity.type === "assign" && (
                        <User className="h-4 w-4" />
                      )}
                    </TimelineIndicator>
                    {index < taskActivities.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent className="bg-card rounded-lg border p-4">
                    <TimelineTitle className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={activity.user.avatar} />
                        <AvatarFallback>
                          {activity.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm">{activity.user.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {activity.timestamp}
                        </p>
                      </div>
                    </TimelineTitle>
                    <p className="mt-3 text-sm">{activity.content}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="outlined" className="text-xs">
                        {activity.task}
                      </Badge>
                      <Badge variant="outlined" className="text-xs">
                        {activity.user.role}
                      </Badge>
                    </div>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        </TabContent>
      </Tabs>

      <Dialog open={isNewTaskOpen} onOpenChange={setIsNewTaskOpen}>
        <DialogContent>
          <DialogTitle>Create New Task</DialogTitle>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter task title" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <TextArea
                id="description"
                placeholder="Enter task description"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select defaultValue="medium">
                  {priorities.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="todo">
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assignee">Assignee</Label>
              <Select defaultValue="john">
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name} ({member.role})
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="grid gap-2">
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Input
                      placeholder="Select a date"
                      value={dateInputValue}
                      className="w-full pr-8"
                      readOnly
                      label="Due Date"
                    />
                    <IconButton
                      className="absolute top-7 right-1 h-7 w-7"
                      aria-label="Select Due date"
                    >
                      <CalendarDaysIcon className="text-muted-foreground h-4 w-4" />
                    </IconButton>
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    onSelect={handleDateChange}
                    selected={selectedDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outlined" onClick={() => setIsNewTaskOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsNewTaskOpen(false)}>Create Task</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
