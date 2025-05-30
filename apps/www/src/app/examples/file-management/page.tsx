"use client"

import { useCallback, useMemo, useState } from "react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  Button,
  Card,
  CardContent,
  CardHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  FileUpload,
  FileUploadTrigger,
  Input,
  Progress,
  Select,
  SelectItem,
  TabContent,
  TabList,
  Tabs,
  TabTrigger,
} from "@bun-ui/react"
import { format, formatDistanceToNow } from "date-fns"
import {
  ArrowDown,
  ArrowUp,
  Clock,
  Cloud,
  Download,
  File,
  FileArchive,
  FileAudio,
  FileCode,
  FileIcon,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileVideo,
  Folder,
  Grid,
  List,
  MoreVertical,
  Presentation,
  Share2,
  Star,
  Trash2,
  Upload,
} from "lucide-react"

interface BaseFile {
  id: number
  name: string
  updatedAt: string
  shared: boolean
  starred: boolean
}

interface DocumentFile extends BaseFile {
  type: string
  size: number // bytes
  displaySize: string // human readable
}

interface FolderFile extends BaseFile {
  type: "folder"
  count: number
  size: number // bytes
  displaySize: string // human readable
}

interface MediaFile extends BaseFile {
  type: string
  size: number // bytes
  displaySize: string // human readable
  duration?: string
}

type FileItem = DocumentFile | FolderFile | MediaFile

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

const files = {
  documents: [
    {
      id: 1,
      name: "Project Proposal.pdf",
      size: 2.4 * 1024 * 1024, // 2.4 MB in bytes
      displaySize: "2.4 MB",
      type: "pdf",
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      shared: true,
      starred: true,
    },
    {
      id: 2,
      name: "User Research Report.docx",
      size: 1.8 * 1024 * 1024, // 1.8 MB in bytes
      displaySize: "1.8 MB",
      type: "docx",
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      shared: false,
      starred: false,
    },
    {
      id: 3,
      name: "Product Roadmap.xlsx",
      size: 3.2 * 1024 * 1024, // 3.2 MB in bytes
      displaySize: "3.2 MB",
      type: "xlsx",
      updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      shared: true,
      starred: true,
    },
  ] as FileItem[],
  images: [
    {
      id: 4,
      name: "Product Screenshots",
      count: 12,
      size: 45 * 1024 * 1024, // 45 MB in bytes
      displaySize: "45 MB",
      type: "folder",
      updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      shared: true,
      starred: false,
    },
    {
      id: 5,
      name: "Team Photos",
      count: 8,
      size: 32 * 1024 * 1024, // 32 MB in bytes
      displaySize: "32 MB",
      type: "folder",
      updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      shared: false,
      starred: true,
    },
  ] as FileItem[],
  videos: [
    {
      id: 6,
      name: "Product Demo.mp4",
      size: 128 * 1024 * 1024, // 128 MB in bytes
      displaySize: "128 MB",
      type: "mp4",
      duration: "5:30",
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      shared: true,
      starred: false,
    },
    {
      id: 7,
      name: "Tutorial Series",
      count: 5,
      size: 450 * 1024 * 1024, // 450 MB in bytes
      displaySize: "450 MB",
      type: "folder",
      updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      shared: false,
      starred: true,
    },
  ] as FileItem[],
  audio: [
    {
      id: 8,
      name: "Interview Recording.mp3",
      size: 45 * 1024 * 1024, // 45 MB in bytes
      displaySize: "45 MB",
      type: "mp3",
      duration: "32:15",
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      shared: false,
      starred: false,
    },
    {
      id: 9,
      name: "Team Meeting Notes",
      count: 3,
      size: 28 * 1024 * 1024, // 28 MB in bytes
      displaySize: "28 MB",
      type: "folder",
      updatedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      shared: true,
      starred: true,
    },
  ] as FileItem[],
}

const recentFiles = [
  {
    id: 10,
    name: "Project Proposal.pdf",
    type: "pdf",
    size: 2.4 * 1024 * 1024, // 2.4 MB in bytes
    displaySize: "2.4 MB",
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    shared: true,
    starred: true,
  },
  {
    id: 11,
    name: "Product Screenshots",
    type: "folder",
    count: 12,
    size: 45 * 1024 * 1024, // 45 MB in bytes
    displaySize: "45 MB",
    updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    shared: true,
    starred: false,
  },
  {
    id: 12,
    name: "User Research Report.docx",
    type: "docx",
    size: 1.8 * 1024 * 1024, // 1.8 MB in bytes
    displaySize: "1.8 MB",
    updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    shared: false,
    starred: false,
  },
] as FileItem[]

type SortBy = "name" | "date" | "size"

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  )

  if (diffInDays > 7) {
    return format(date, "MM/dd/yyyy")
  }
  return formatDistanceToNow(date, { addSuffix: true })
}

export default function FileManagementDashboard() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<SortBy>("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const handleFileUpload = useCallback(() => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate file upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }, [])

  const isFolder = (file: FileItem): file is FolderFile => {
    return file.type === "folder"
  }

  const getFileIcon = (file: FileItem) => {
    if (isFolder(file)) return <Folder className="h-5 w-5" />
    switch (file.type) {
      case "pdf":
        return <FileText className="h-5 w-5" />
      case "docx":
        return <FileText className="h-5 w-5" />
      case "xlsx":
        return <FileSpreadsheet className="h-5 w-5" />
      case "pptx":
        return <Presentation className="h-5 w-5" />
      case "jpg":
      case "png":
      case "gif":
        return <FileImage className="h-5 w-5" />
      case "mp4":
      case "mov":
        return <FileVideo className="h-5 w-5" />
      case "mp3":
      case "wav":
        return <FileAudio className="h-5 w-5" />
      case "zip":
      case "rar":
        return <FileArchive className="h-5 w-5" />
      case "js":
      case "ts":
      case "html":
      case "css":
        return <FileCode className="h-5 w-5" />
      default:
        return <FileIcon className="h-5 w-5" />
    }
  }

  const getFileSize = (file: FileItem) => {
    if (file.type === "folder") {
      const folderFile = file as FolderFile
      return `${folderFile.count} items`
    }
    return file.displaySize
  }

  const filteredFiles = useMemo(() => {
    let result = [
      ...files.documents,
      ...files.images,
      ...files.videos,
      ...files.audio,
    ] as FileItem[]
    if (searchQuery) {
      result = result.filter((file) =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    return result.sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      }
      if (sortBy === "date") {
        return sortOrder === "asc"
          ? new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          : new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
      }
      if (sortBy === "size") {
        return sortOrder === "asc" ? a.size - b.size : b.size - a.size
      }
      return 0
    })
  }, [searchQuery, sortBy, sortOrder])

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Files</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Projects</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">File Management</h1>
          <p className="text-muted-foreground mt-1">
            Organize and manage your files efficiently
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outlined" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download All
          </Button>
          <FileUpload onFileSelect={handleFileUpload}>
            <FileUploadTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Files
              </Button>
            </FileUploadTrigger>
          </FileUpload>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-sm font-medium">Total Files</span>
            <File className="text-primary h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <div className="text-muted-foreground mt-1 text-xs">
              234 files added this week
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-sm font-medium">Storage Used</span>
            <Cloud className="text-primary h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <div className="text-muted-foreground mt-1 text-xs">
              3.5GB of 5GB used
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-sm font-medium">Shared Files</span>
            <Share2 className="text-primary h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <div className="text-muted-foreground mt-1 text-xs">
              12 new shares today
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-sm font-medium">Recent Activity</span>
            <Clock className="text-primary h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="text-muted-foreground mt-1 text-xs">
              Files modified today
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[300px]"
          />
          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as SortBy)}
            className="min-w-[140px]"
            placeholder="Sort by"
          >
            <SelectItem value="name">Sort by Name</SelectItem>
            <SelectItem value="date">Sort by Date</SelectItem>
            <SelectItem value="size">Sort by Size</SelectItem>
          </Select>
          <Button
            variant="outlined"
            className="shrink-0"
            size="icon"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "contained" : "outlined"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "contained" : "outlined"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isUploading && (
        <Alert className="mb-8">
          <Upload className="h-4 w-4" />
          <AlertTitle>Uploading Files</AlertTitle>
          <AlertDescription>
            <Progress value={uploadProgress} className="mt-2" />
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="all">
        <TabList>
          <TabTrigger value="all">All Files</TabTrigger>
          <TabTrigger value="recent">Recent</TabTrigger>
          <TabTrigger value="starred">Starred</TabTrigger>
          <TabTrigger value="trash">Trash</TabTrigger>
        </TabList>
        <TabContent value="all">
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "space-y-4"
            }
          >
            {filteredFiles.map((file) => (
              <Card
                key={file.id}
                className={`relative overflow-hidden transition-all hover:shadow-lg ${
                  viewMode === "list" ? "flex items-center" : ""
                }`}
              >
                <CardContent
                  className={`p-4 ${viewMode === "list" ? "flex items-center justify-between" : ""}`}
                >
                  <div
                    className={`flex items-center gap-4 ${viewMode === "list" ? "flex-1" : ""}`}
                  >
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                      {getFileIcon(file)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{file.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-xs">
                          {getFileSize(file)}
                        </span>
                        <span className="text-muted-foreground text-xs">•</span>
                        <span className="text-muted-foreground text-xs">
                          {formatDate(file.updatedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`flex items-center gap-2 ${viewMode === "list" ? "ml-4" : "mt-4"}`}
                  >
                    {file.shared && (
                      <Badge
                        variant="outlined"
                        className="flex items-center gap-1"
                      >
                        <Share2 className="h-3 w-3" />
                        Shared
                      </Badge>
                    )}
                    {file.starred && (
                      <Badge
                        variant="outlined"
                        className="flex items-center gap-1"
                      >
                        <Star className="h-3 w-3" />
                        Starred
                      </Badge>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="text" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Star className="mr-2 h-4 w-4" />
                          Star
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabContent>
        <TabContent value="recent">
          <div className="mt-8 space-y-4">
            {recentFiles.map((file) => (
              <Card key={file.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                      {getFileIcon(file)}
                    </div>
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {getFileSize(file)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {file.shared && (
                      <Badge
                        variant="outlined"
                        className="flex items-center gap-1"
                      >
                        <Share2 className="h-3 w-3" />
                        Shared
                      </Badge>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="text" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Star className="mr-2 h-4 w-4" />
                          Star
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabContent>
      </Tabs>
    </div>
  )
}
