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
  Dialog,
  DialogContent,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  FileUpload,
  FileUploadTrigger,
  IconButton,
  Input,
  Label,
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
  Copy,
  Download,
  Eye,
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
  FolderOpen,
  Grid,
  List,
  Lock,
  MoreVertical,
  Presentation,
  Share2,
  Star,
  Trash2,
  Unlock,
  Upload,
} from "lucide-react"

import { cx } from "@/lib/classnames"

interface BaseFile {
  id: number
  name: string
  updatedAt: string
  shared?: boolean
  starred?: boolean
  recent?: boolean
  trashed?: boolean
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

const files = {
  documents: [
    {
      id: 1,
      name: "Project Proposal.pdf",
      size: 2.4 * 1024 * 1024,
      displaySize: "2.4 MB",
      type: "pdf",
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      shared: true,
      starred: true,
      recent: true,
    },
    {
      id: 2,
      name: "User Research Report.docx",
      size: 1.8 * 1024 * 1024,
      displaySize: "1.8 MB",
      type: "docx",
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      shared: false,
      starred: false,
      recent: true,
    },
    {
      id: 3,
      name: "Product Roadmap.xlsx",
      size: 3.2 * 1024 * 1024,
      displaySize: "3.2 MB",
      type: "xlsx",
      updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      shared: true,
      starred: true,
      recent: true,
    },
    {
      id: 13,
      name: "Marketing Strategy.pptx",
      size: 4.5 * 1024 * 1024,
      displaySize: "4.5 MB",
      type: "pptx",
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      shared: true,
      starred: false,
      recent: true,
    },
    {
      id: 14,
      name: "Technical Documentation.pdf",
      size: 5.1 * 1024 * 1024,
      displaySize: "5.1 MB",
      type: "pdf",
      updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      shared: false,
      starred: true,
      recent: false,
    },
    {
      id: 15,
      name: "Budget Report.xlsx",
      size: 2.8 * 1024 * 1024,
      displaySize: "2.8 MB",
      type: "xlsx",
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      shared: true,
      starred: false,
      recent: true,
    },
  ] as FileItem[],
  images: [
    {
      id: 4,
      name: "Product Screenshots",
      count: 12,
      size: 45 * 1024 * 1024,
      displaySize: "45 MB",
      type: "folder",
      updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      shared: true,
      starred: false,
      recent: true,
    },
    {
      id: 5,
      name: "Team Photos",
      count: 8,
      size: 32 * 1024 * 1024,
      displaySize: "32 MB",
      type: "folder",
      updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      shared: false,
      starred: true,
      recent: true,
    },
    {
      id: 16,
      name: "Website Banner.png",
      size: 2.1 * 1024 * 1024,
      displaySize: "2.1 MB",
      type: "png",
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      shared: true,
      starred: true,
      recent: true,
    },
    {
      id: 17,
      name: "Logo Assets",
      count: 5,
      size: 8.4 * 1024 * 1024,
      displaySize: "8.4 MB",
      type: "folder",
      updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      shared: true,
      starred: true,
      recent: false,
    },
    {
      id: 18,
      name: "Event Photos.jpg",
      size: 15.7 * 1024 * 1024,
      displaySize: "15.7 MB",
      type: "jpg",
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      shared: false,
      starred: false,
      recent: true,
    },
  ] as FileItem[],
  videos: [
    {
      id: 6,
      name: "Product Demo.mp4",
      size: 128 * 1024 * 1024,
      displaySize: "128 MB",
      type: "mp4",
      duration: "5:30",
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      shared: true,
      starred: false,
      recent: true,
    },
    {
      id: 7,
      name: "Tutorial Series",
      count: 5,
      size: 450 * 1024 * 1024,
      displaySize: "450 MB",
      type: "folder",
      updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      shared: false,
      starred: true,
      recent: true,
    },
    {
      id: 19,
      name: "Company Overview.mp4",
      size: 85 * 1024 * 1024,
      displaySize: "85 MB",
      type: "mp4",
      duration: "3:45",
      updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      shared: true,
      starred: true,
      recent: true,
    },
    {
      id: 20,
      name: "Training Videos",
      count: 8,
      size: 320 * 1024 * 1024,
      displaySize: "320 MB",
      type: "folder",
      updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      trashed: true,
    },
  ] as FileItem[],
  audio: [
    {
      id: 8,
      name: "Interview Recording.mp3",
      size: 45 * 1024 * 1024,
      displaySize: "45 MB",
      type: "mp3",
      duration: "32:15",
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      shared: false,
      starred: false,
      recent: true,
    },
    {
      id: 9,
      name: "Team Meeting Notes",
      count: 3,
      size: 28 * 1024 * 1024,
      displaySize: "28 MB",
      type: "folder",
      updatedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      shared: true,
      starred: true,
      recent: true,
    },
    {
      id: 21,
      name: "Podcast Episode.wav",
      size: 65 * 1024 * 1024,
      displaySize: "65 MB",
      type: "wav",
      duration: "45:20",
      updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      trashed: true,
    },
    {
      id: 22,
      name: "Voice Memos",
      count: 12,
      size: 95 * 1024 * 1024,
      displaySize: "95 MB",
      type: "folder",
      updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      shared: false,
      starred: false,
      recent: false,
    },
  ] as FileItem[],
  code: [
    {
      id: 23,
      name: "Frontend Source",
      count: 24,
      size: 15 * 1024 * 1024,
      displaySize: "15 MB",
      type: "folder",
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      shared: true,
      starred: true,
      recent: true,
    },
    {
      id: 24,
      name: "Backend API.ts",
      size: 2.3 * 1024 * 1024,
      displaySize: "2.3 MB",
      type: "ts",
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      shared: true,
      starred: false,
      recent: true,
    },
    {
      id: 25,
      name: "Database Schema.sql",
      size: 1.5 * 1024 * 1024,
      displaySize: "1.5 MB",
      type: "sql",
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      shared: false,
      starred: true,
      recent: false,
    },
  ] as FileItem[],
  archives: [
    {
      id: 26,
      name: "Project Backup.zip",
      size: 250 * 1024 * 1024,
      displaySize: "250 MB",
      type: "zip",
      updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      shared: false,
      starred: false,
      recent: false,
    },
    {
      id: 27,
      name: "Old Versions",
      count: 8,
      size: 180 * 1024 * 1024,
      displaySize: "180 MB",
      type: "folder",
      updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      shared: false,
      starred: false,
      recent: false,
    },
  ] as FileItem[],
}

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

const storageData = {
  total: 5 * 1024 * 1024 * 1024,
  used: 3.5 * 1024 * 1024 * 1024,
  byType: {
    documents: 1.2 * 1024 * 1024 * 1024,
    images: 1.5 * 1024 * 1024 * 1024,
    videos: 0.5 * 1024 * 1024 * 1024,
    audio: 0.3 * 1024 * 1024 * 1024,
    code: 0.2 * 1024 * 1024 * 1024,
    archives: 0.3 * 1024 * 1024 * 1024,
  },
}

const fileTypes = [
  { value: "all", label: "All Files" },
  { value: "documents", label: "Documents" },
  { value: "images", label: "Images" },
  { value: "videos", label: "Videos" },
  { value: "audio", label: "Audio" },
  { value: "code", label: "Code" },
  { value: "archives", label: "Archives" },
  { value: "folders", label: "Folders" },
]

export default function FileManagementDashboard() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<SortBy>("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [selectedFileType, setSelectedFileType] = useState("all")
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isShareOpen, setIsShareOpen] = useState(false)

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

  const handlePreview = (file: FileItem) => {
    setSelectedFile(file)
    setIsPreviewOpen(true)
  }

  const handleShare = (file: FileItem) => {
    setSelectedFile(file)
    setIsShareOpen(true)
  }

  const getStoragePercentage = (bytes: number) => {
    return (bytes / storageData.total) * 100
  }

  const formatStorageSize = (bytes: number) => {
    const gb = bytes / (1024 * 1024 * 1024)
    return `${gb.toFixed(1)} GB`
  }

  const filteredFiles = useMemo(() => {
    let result = [
      ...files.documents,
      ...files.images,
      ...files.videos,
      ...files.audio,
      ...files.code,
      ...files.archives,
    ] as FileItem[]

    if (searchQuery) {
      result = result.filter((file) =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedFileType !== "all") {
      result = result.filter((file) => {
        if (selectedFileType === "folders") return file.type === "folder"
        if (selectedFileType === "documents")
          return ["pdf", "docx", "xlsx", "pptx"].includes(file.type)
        if (selectedFileType === "images")
          return ["jpg", "png", "gif"].includes(file.type)
        if (selectedFileType === "videos")
          return ["mp4", "mov"].includes(file.type)
        if (selectedFileType === "audio")
          return ["mp3", "wav"].includes(file.type)
        if (selectedFileType === "code")
          return ["js", "ts", "html", "css", "sql"].includes(file.type)
        if (selectedFileType === "archives")
          return ["zip", "rar"].includes(file.type)
        return true
      })
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
  }, [searchQuery, sortBy, sortOrder, selectedFileType])

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
              <BreadcrumbLink currentLink href="#">
                Projects
              </BreadcrumbLink>
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
            <div className="text-2xl font-bold">
              {getStoragePercentage(storageData.used).toFixed(0)}%
            </div>
            <div className="text-muted-foreground mt-1 text-xs">
              {formatStorageSize(storageData.used)} of{" "}
              {formatStorageSize(storageData.total)} used
            </div>
            <Progress
              value={getStoragePercentage(storageData.used)}
              className="mt-2"
            />
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

      <Card className="mb-8">
        <CardHeader>
          <h3 className="text-lg font-semibold">Storage Usage by Type</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Documents</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {formatStorageSize(storageData.byType.documents)}
                </span>
                <Progress
                  value={getStoragePercentage(storageData.byType.documents)}
                  className="w-32"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileImage className="h-4 w-4" />
                <span>Images</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {formatStorageSize(storageData.byType.images)}
                </span>
                <Progress
                  value={getStoragePercentage(storageData.byType.images)}
                  className="w-32"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileVideo className="h-4 w-4" />
                <span>Videos</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {formatStorageSize(storageData.byType.videos)}
                </span>
                <Progress
                  value={getStoragePercentage(storageData.byType.videos)}
                  className="w-32"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileAudio className="h-4 w-4" />
                <span>Audio</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {formatStorageSize(storageData.byType.audio)}
                </span>
                <Progress
                  value={getStoragePercentage(storageData.byType.audio)}
                  className="w-32"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="h-4 w-4" />
                <span>Code</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {formatStorageSize(storageData.byType.code)}
                </span>
                <Progress
                  value={getStoragePercentage(storageData.byType.code)}
                  className="w-32"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileArchive className="h-4 w-4" />
                <span>Archives</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {formatStorageSize(storageData.byType.archives)}
                </span>
                <Progress
                  value={getStoragePercentage(storageData.byType.archives)}
                  className="w-32"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[300px]"
          />
          <Select
            value={selectedFileType}
            onValueChange={setSelectedFileType}
            className="min-w-[140px]"
          >
            {fileTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as SortBy)}
            className="min-w-[140px]"
          >
            <SelectItem value="name">Sort by Name</SelectItem>
            <SelectItem value="date">Sort by Date</SelectItem>
            <SelectItem value="size">Sort by Size</SelectItem>
          </Select>
          <IconButton
            className="shrink-0"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
          </IconButton>
        </div>
        <div className="flex items-center gap-2">
          <IconButton onClick={() => setViewMode("grid")}>
            <Grid className="h-4 w-4" />
          </IconButton>
          <IconButton onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </IconButton>
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
          <TabTrigger value="shared">Shared</TabTrigger>
          <TabTrigger value="trashed">Trash</TabTrigger>
        </TabList>
        {["all", "recent", "starred", "shared", "trashed"].map((tab) => (
          <TabContent value={tab} key={tab}>
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "space-y-4"
              }
            >
              {filteredFiles
                .filter((file) => {
                  if (tab === "all") return !file.trashed
                  if (tab === "trashed") return file.trashed
                  if (tab === "recent") return file.recent
                  if (tab === "starred") return file.starred
                  if (tab === "shared") return file.shared
                })
                .map((file) => (
                  <Card
                    key={file.id}
                    className={`relative overflow-hidden transition-all hover:shadow-lg ${
                      viewMode === "list" ? "flex items-center" : ""
                    }`}
                  >
                    <CardContent
                      className={cx(
                        "w-full p-4",
                        viewMode === "list" &&
                          "flex items-center justify-between"
                      )}
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
                            <span className="text-muted-foreground text-xs">
                              •
                            </span>
                            <span className="text-muted-foreground text-xs">
                              {formatDate(file.updatedAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={cx(
                          "flex items-center justify-between gap-2",
                          viewMode === "list" ? "ml-4" : "mt-4"
                        )}
                      >
                        <div className="flex gap-2">
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
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <IconButton>
                              <MoreVertical />
                            </IconButton>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => handlePreview(file)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShare(file)}>
                              <Share2 className="mr-2 h-4 w-4" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Make a Copy
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              {file.starred ? (
                                <>
                                  <Star className="mr-2 h-4 w-4" />
                                  Remove Star
                                </>
                              ) : (
                                <>
                                  <Star className="mr-2 h-4 w-4" />
                                  Star
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              {file.shared ? (
                                <>
                                  <Lock className="mr-2 h-4 w-4" />
                                  Remove Share
                                </>
                              ) : (
                                <>
                                  <Unlock className="mr-2 h-4 w-4" />
                                  Share
                                </>
                              )}
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
        ))}
      </Tabs>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogTitle>File Preview</DialogTitle>
          {selectedFile && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                  {getFileIcon(selectedFile)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedFile.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {getFileSize(selectedFile)} • Updated{" "}
                    {formatDate(selectedFile.updatedAt)}
                  </p>
                </div>
              </div>
              <div className="border-border rounded-lg border p-4">
                {selectedFile.type === "folder" ? (
                  <div className="flex items-center justify-center py-8">
                    <FolderOpen className="text-muted-foreground h-16 w-16" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-8">
                    <FileIcon className="text-muted-foreground h-16 w-16" />
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
        <DialogContent>
          <DialogTitle>Share File</DialogTitle>
          {selectedFile && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  {getFileIcon(selectedFile)}
                </div>
                <div>
                  <h3 className="font-medium">{selectedFile.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {getFileSize(selectedFile)}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Share with</Label>
                <Input placeholder="Enter email addresses" />
              </div>
              <div className="space-y-2">
                <Label>Permission</Label>
                <Select defaultValue="view">
                  <SelectItem value="view">Can view</SelectItem>
                  <SelectItem value="edit">Can edit</SelectItem>
                  <SelectItem value="comment">Can comment</SelectItem>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outlined"
                  onClick={() => setIsShareOpen(false)}
                >
                  Cancel
                </Button>
                <Button>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
