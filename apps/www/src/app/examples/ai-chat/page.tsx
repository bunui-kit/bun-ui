"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  FileUpload,
  FileUploadList,
  FileUploadTrigger,
  IconButton,
  Label,
  Select,
  SelectItem,
  TextArea,
  Typography,
} from "@bun-ui/react"
import { formatDistanceToNow } from "date-fns"
import {
  Bot,
  Copy,
  Download,
  FileText,
  ImageIcon,
  MoreVertical,
  Paperclip,
  Send,
  Settings,
  Share2,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  User,
  Wand2,
} from "lucide-react"

import { cx } from "@/lib/classnames"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  files?: File[]
  model?: string
  isStreaming?: boolean
  isError?: boolean
}

interface ChatSession {
  id: string
  title: string
  messages: Message[]
  model: string
  createdAt: Date
  updatedAt: Date
}

const models = [
  { value: "gpt-4", label: "GPT-4", description: "Most capable model" },
  {
    value: "gpt-3.5-turbo",
    label: "GPT-3.5 Turbo",
    description: "Fast and efficient",
  },
  {
    value: "claude-3",
    label: "Claude 3",
    description: "Anthropic's latest model",
  },
  {
    value: "gemini-pro",
    label: "Gemini Pro",
    description: "Google's advanced model",
  },
]

const examplePrompts = [
  "Write a Python function to sort a list of dictionaries by a specific key",
  "Explain quantum computing in simple terms",
  "Create a React component for a todo list",
  "Help me plan a week-long vacation to Japan",
  "Write a professional email to request a meeting",
]

export default function AIChatApplication() {
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "New Chat",
      messages: [],
      model: "gpt-4",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])
  const [currentSessionId, setCurrentSessionId] = useState("1")
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [showSettings, setShowSettings] = useState(false)
  const [selectedModel, setSelectedModel] = useState("gpt-4")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentSession = useMemo(
    () => sessions.find((s) => s.id === currentSessionId),
    [sessions, currentSessionId]
  )

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() && uploadedFiles.length === 0) return

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
      files: uploadedFiles.length > 0 ? [...uploadedFiles] : undefined,
    }

    // Add user message
    setSessions((prev) =>
      prev.map((session) =>
        session.id === currentSessionId
          ? {
              ...session,
              messages: [...session.messages, newMessage],
              updatedAt: new Date(),
              title:
                session.messages.length === 0
                  ? inputValue.slice(0, 50) + "..."
                  : session.title,
            }
          : session
      )
    )

    setInputValue("")
    setUploadedFiles([])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateAIResponse(inputValue, uploadedFiles),
        timestamp: new Date(),
        model: selectedModel,
      }

      setSessions((prev) =>
        prev.map((session) =>
          session.id === currentSessionId
            ? {
                ...session,
                messages: [...session.messages, aiResponse],
                updatedAt: new Date(),
              }
            : session
        )
      )
      setIsLoading(false)
    }, 2000)
  }, [inputValue, uploadedFiles, currentSessionId, selectedModel])

  const generateAIResponse = (userInput: string, files: File[]): string => {
    const responses = [
      "I understand you're asking about that. Let me provide you with a comprehensive answer...",
      "That's an interesting question! Here's what I can tell you about this topic...",
      "Based on your request, I'll help you with this. Here's a detailed explanation...",
      "Great question! Let me break this down for you step by step...",
      "I'd be happy to help you with that. Here's what you need to know...",
    ]

    if (files.length > 0) {
      return `I can see you've uploaded ${files.length} file(s). Let me analyze the content and provide you with insights based on what I can extract from these documents. ${responses[Math.floor(Math.random() * responses.length)]}`
    }

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      model: selectedModel,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setSessions((prev) => [newSession, ...prev])
    setCurrentSessionId(newSession.id)
  }

  const handleDeleteSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId))
    if (currentSessionId === sessionId && sessions.length > 1) {
      setCurrentSessionId(sessions[1].id)
    }
  }

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const handleFileRemove = (file: File) => {
    setUploadedFiles((prev) => prev.filter((f) => f !== file))
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-4 w-4" />
    }
    return <FileText className="h-4 w-4" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="bg-background flex h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <div className="border-border bg-muted/20 w-80 border-r">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-border border-b p-4">
            <Button onClick={handleNewChat} className="w-full" size="lg">
              <Wand2 className="mr-2 h-4 w-4" />
              New Chat
            </Button>
          </div>

          {/* Chat Sessions */}
          <div className="flex-1 overflow-y-auto p-2">
            <div className="space-y-1">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className={cx(
                    "group hover:bg-muted/50 flex items-center justify-between rounded-lg p-3 text-sm transition-colors",
                    currentSessionId === session.id && "bg-muted"
                  )}
                >
                  <button
                    onClick={() => setCurrentSessionId(session.id)}
                    className="flex-1 truncate text-left"
                  >
                    <div className="font-medium">{session.title}</div>
                    <div className="text-muted-foreground text-xs">
                      {formatDistanceToNow(session.updatedAt, {
                        addSuffix: true,
                      })}
                    </div>
                  </button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <IconButton
                        size="sm"
                        className="opacity-0 group-hover:opacity-100"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </IconButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteSession(session.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-border border-t p-4">
            <Button
              variant="outlined"
              onClick={() => setShowSettings(true)}
              className="w-full"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        {/* Chat Header */}
        <div className="border-border border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Typography variant="h4" className="font-semibold">
                {currentSession?.title || "New Chat"}
              </Typography>
              <Badge variant="outlined">{selectedModel}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <IconButton>
                <Share2 className="h-4 w-4" />
              </IconButton>
              <IconButton>
                <Download className="h-4 w-4" />
              </IconButton>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {currentSession?.messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <Bot className="text-muted-foreground mx-auto" />
                <Typography variant="h3" className="mt-4 font-semibold">
                  How can I help you today?
                </Typography>
                <Typography className="text-muted-foreground mt-2">
                  Ask me anything, upload files, or try one of these examples:
                </Typography>
                <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
                  {examplePrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outlined"
                      className="justify-start text-left"
                      onClick={() => setInputValue(prompt)}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {currentSession?.messages.map((message) => (
                <div
                  key={message.id}
                  className={cx(
                    "flex gap-4",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "assistant" && (
                    <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                  <div
                    className={cx(
                      "max-w-3xl rounded-lg p-4",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    {message.files && message.files.length > 0 && (
                      <div className="mb-3 space-y-2">
                        {message.files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 rounded border p-2"
                          >
                            {getFileIcon(file)}
                            <span className="text-sm">{file.name}</span>
                            <span className="text-muted-foreground text-xs">
                              ({formatFileSize(file.size)})
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    <Typography>{message.content}</Typography>
                    {message.role === "assistant" && (
                      <div className="mt-3 flex items-center gap-2">
                        <IconButton size="sm">
                          <ThumbsUp className="h-4 w-4" />
                        </IconButton>
                        <IconButton size="sm">
                          <ThumbsDown className="h-4 w-4" />
                        </IconButton>
                        <IconButton size="sm">
                          <Copy className="h-4 w-4" />
                        </IconButton>
                        <Badge variant="outlined" className="ml-auto">
                          {message.model}
                        </Badge>
                      </div>
                    )}
                  </div>
                  {message.role === "user" && (
                    <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-full">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4">
                  <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-muted-foreground h-2 w-2 animate-bounce rounded-full" />
                      <div className="bg-muted-foreground h-2 w-2 animate-bounce rounded-full [animation-delay:0.1s]" />
                      <div className="bg-muted-foreground h-2 w-2 animate-bounce rounded-full [animation-delay:0.2s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-border border-t p-4">
          <div className="mx-auto max-w-4xl">
            {/* File Upload Preview */}
            {uploadedFiles.length > 0 && (
              <div className="mb-4 rounded-lg border p-3">
                <Typography variant="h6" className="mb-2">
                  Attached Files ({uploadedFiles.length})
                </Typography>
                <FileUploadList />
              </div>
            )}

            {/* Input and Ations */}
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <TextArea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Message AI..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  className="min-h-[60px] resize-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <FileUpload
                  onFileSelect={handleFileUpload}
                  onFileRemove={handleFileRemove}
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                >
                  <FileUploadTrigger asChild>
                    <IconButton disabled={isLoading}>
                      <Paperclip className="h-4 w-4" />
                    </IconButton>
                  </FileUploadTrigger>
                </FileUpload>
                <Button
                  onClick={handleSendMessage}
                  disabled={
                    (!inputValue.trim() && uploadedFiles.length === 0) ||
                    isLoading
                  }
                  size="lg"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Model Info */}
            <div className="text-muted-foreground mt-2 flex items-center justify-between text-xs">
              <span>
                Using {models.find((m) => m.value === selectedModel)?.label}
              </span>
              <span>AI may produce inaccurate information</span>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-md">
          <DialogTitle>Settings</DialogTitle>
          <div className="space-y-4">
            <div>
              <Label htmlFor="model">Default Model</Label>
              <Select
                value={selectedModel}
                onValueChange={setSelectedModel}
                className="mt-1"
              >
                {models.map((model) => (
                  <SelectItem key={model.value} value={model.value}>
                    <div>
                      <div className="font-medium">{model.label}</div>
                      <div className="text-muted-foreground text-xs">
                        {model.description}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

