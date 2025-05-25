"use client"

import { useMemo, useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
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
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  FileUpload,
  FileUploadTrigger,
  Input,
  Progress,
  TabContent,
  TabList,
  Tabs,
  TabTrigger,
  Toggle,
  Tooltip,
} from "@bun-ui/react"
import {
  Clock,
  Cloud,
  Download,
  File,
  FileText,
  ImageIcon,
  MoreVertical,
  Music,
  Plus,
  Search,
  Share2,
  Star,
  Trash2,
  Upload,
  Video,
} from "lucide-react"

const files = {
  documents: [
    {
      id: 1,
      name: "Project Proposal.pdf",
      size: "2.4 MB",
      type: "pdf",
      updatedAt: "2 hours ago",
      shared: true,
      starred: true,
    },
    {
      id: 2,
      name: "User Research Report.docx",
      size: "1.8 MB",
      type: "docx",
      updatedAt: "1 day ago",
      shared: false,
      starred: false,
    },
    {
      id: 3,
      name: "Product Roadmap.xlsx",
      size: "3.2 MB",
      type: "xlsx",
      updatedAt: "3 days ago",
      shared: true,
      starred: true,
    },
  ],
  images: [
    {
      id: 1,
      name: "Product Screenshots",
      count: 12,
      size: "45 MB",
      updatedAt: "5 hours ago",
      shared: true,
      starred: false,
    },
    {
      id: 2,
      name: "Team Photos",
      count: 8,
      size: "32 MB",
      updatedAt: "2 days ago",
      shared: false,
      starred: true,
    },
  ],
  videos: [
    {
      id: 1,
      name: "Product Demo.mp4",
      size: "128 MB",
      duration: "5:30",
      updatedAt: "1 day ago",
      shared: true,
      starred: false,
    },
    {
      id: 2,
      name: "Tutorial Series",
      count: 5,
      size: "450 MB",
      updatedAt: "1 week ago",
      shared: false,
      starred: true,
    },
  ],
  audio: [
    {
      id: 1,
      name: "Interview Recording.mp3",
      size: "45 MB",
      duration: "32:15",
      updatedAt: "3 days ago",
      shared: false,
      starred: false,
    },
    {
      id: 2,
      name: "Team Meeting Notes",
      count: 3,
      size: "28 MB",
      updatedAt: "1 week ago",
      shared: true,
      starred: true,
    },
  ],
}

const recentFiles = [
  {
    id: 1,
    name: "Project Proposal.pdf",
    type: "pdf",
    size: "2.4 MB",
    updatedAt: "2 hours ago",
    shared: true,
  },
  {
    id: 2,
    name: "Product Screenshots",
    type: "folder",
    count: 12,
    updatedAt: "5 hours ago",
    shared: true,
  },
  {
    id: 3,
    name: "User Research Report.docx",
    type: "docx",
    size: "1.8 MB",
    updatedAt: "1 day ago",
    shared: false,
  },
]

export default function FileManagementDashboard() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")

  const handleFileSelect = () => {
    setIsUploading(true)
    setUploadProgress(0)
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
  }

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
            Organize and manage your project files
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Folder
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Create New Folder</DialogTitle>
              <DialogDescription>
                Enter a name for your new folder
              </DialogDescription>
              <div className="py-4">
                <Input placeholder="Folder name" />
              </div>
            </DialogContent>
          </Dialog>
          <FileUpload
            onFileSelect={handleFileSelect}
            accept="image/*,video/*,application/pdf"
            multiple
          >
            <FileUploadTrigger asChild>
              <Button variant="outlined">
                <Upload className="mr-2 h-4 w-4" />
                Upload Files
              </Button>
            </FileUploadTrigger>
          </FileUpload>
        </div>
      </div>

      {isUploading && (
        <Alert
          className="mb-8 [&>div]:nth-2:w-full"
          icon={<Cloud className="h-4 w-4 nth-2:w-full" />}
        >
          <AlertTitle>Uploading Files</AlertTitle>
          <AlertDescription className="w-full">
            <Progress value={uploadProgress} className="mt-2" />
          </AlertDescription>
        </Alert>
      )}

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
            <div className="text-2xl font-bold">45</div>
            <div className="text-muted-foreground mt-1 text-xs">
              15 updates in the last hour
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="relative w-[300px]">
          <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabList>
          <TabTrigger value="all">All Files</TabTrigger>
          <TabTrigger value="recent">Recent</TabTrigger>
          <TabTrigger value="starred">Starred</TabTrigger>
          <TabTrigger value="trash">Trash</TabTrigger>
        </TabList>
        <TabContent value="all">
          <Accordion
            type="multiple"
            className="mt-8"
            defaultValue={["documents", "images", "videos", "audio"]}
          >
            <AccordionItem value="documents">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Documents
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {files.documents.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <FileText className="text-primary h-8 w-8" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-muted-foreground text-sm">
                            {file.size} • Updated {file.updatedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tooltip content="Add to starred">
                          <Toggle
                            size="sm"
                            className="text-foreground group h-8 w-8 p-0 not-hover:data-[state=on]:bg-transparent"
                            defaultPressed={file.starred}
                          >
                            <Star className="h-4 w-4 group-data-[state=on]:fill-yellow-500 group-data-[state=on]:text-yellow-500" />
                          </Toggle>
                        </Tooltip>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="text"
                              size="icon"
                              className="h-8 w-8"
                              color="neutral"
                            >
                              <MoreVertical />
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
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="images">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Images
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {files.images.map((folder) => (
                    <div
                      key={folder.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <ImageIcon className="text-primary h-8 w-8" />
                        <div>
                          <p className="font-medium">{folder.name}</p>
                          <p className="text-muted-foreground text-sm">
                            {folder.count} files • {folder.size} • Updated{" "}
                            {folder.updatedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tooltip content="Add to starred">
                          <Toggle
                            size="sm"
                            className="text-foreground group h-8 w-8 p-0 not-hover:data-[state=on]:bg-transparent"
                            defaultPressed={folder.starred}
                          >
                            <Star className="h-4 w-4 group-data-[state=on]:fill-yellow-500 group-data-[state=on]:text-yellow-500" />
                          </Toggle>
                        </Tooltip>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="text"
                              size="icon"
                              className="h-8 w-8"
                              color="neutral"
                            >
                              <MoreVertical />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download All
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="mr-2 h-4 w-4" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="videos">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Videos
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {files.videos.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <Video className="text-primary h-8 w-8" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-muted-foreground text-sm">
                            {file.size} •{" "}
                            {file.duration || `${file.count} videos`} • Updated{" "}
                            {file.updatedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tooltip content="Add to starred">
                          <Toggle
                            size="sm"
                            className="text-foreground group h-8 w-8 p-0 not-hover:data-[state=on]:bg-transparent"
                            defaultPressed={file.starred}
                          >
                            <Star className="h-4 w-4 group-data-[state=on]:fill-yellow-500 group-data-[state=on]:text-yellow-500" />
                          </Toggle>
                        </Tooltip>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="text"
                              size="icon"
                              className="h-8 w-8"
                              color="neutral"
                            >
                              <MoreVertical />
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
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="audio">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Music className="h-4 w-4" />
                  Audio
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {files.audio.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <Music className="text-primary h-8 w-8" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-muted-foreground text-sm">
                            {file.size} •{" "}
                            {file.duration || `${file.count} files`} • Updated{" "}
                            {file.updatedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tooltip content="Add to starred">
                          <Toggle
                            size="sm"
                            className="text-foreground group h-8 w-8 p-0 not-hover:data-[state=on]:bg-transparent"
                            defaultPressed={file.starred}
                          >
                            <Star className="h-4 w-4 group-data-[state=on]:fill-yellow-500 group-data-[state=on]:text-yellow-500" />
                          </Toggle>
                        </Tooltip>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="text"
                              size="icon"
                              className="h-8 w-8"
                              color="neutral"
                            >
                              <MoreVertical />
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
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabContent>
        <TabContent value="recent">
          <div className="mt-8">
            <Card>
              <CardHeader>Recent Files</CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-4">
                        {file.type === "folder" ? (
                          <ImageIcon className="text-primary h-8 w-8" />
                        ) : (
                          <FileText className="text-primary h-8 w-8" />
                        )}
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-muted-foreground text-sm">
                            {file.type === "folder"
                              ? `${file.count} files`
                              : file.size}{" "}
                            • Updated {file.updatedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="text"
                          size="icon"
                          className="h-8 w-8"
                          color="neutral"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="text"
                          size="icon"
                          className="h-8 w-8"
                          color="neutral"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabContent>
        <TabContent value="starred">
          <div className="mt-8">
            <Card>
              <CardHeader>Starred Files</CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Star className="text-muted-foreground mb-4 h-12 w-12" />
                  <h3 className="text-lg font-medium">No starred files</h3>
                  <p className="text-muted-foreground mt-1">
                    Star important files to find them quickly
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabContent>
        <TabContent value="trash">
          <div className="mt-8">
            <Card>
              <CardHeader>Trash</CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Trash2 className="text-muted-foreground mb-4 h-12 w-12" />
                  <h3 className="text-lg font-medium">Trash is empty</h3>
                  <p className="text-muted-foreground mt-1">
                    Files you delete will appear here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabContent>
      </Tabs>
    </div>
  )
}
