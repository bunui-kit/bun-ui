"use client"

import { createContext, useContext } from "react"

interface FileUploadContextValue {
  files: File[]
  setFiles: React.Dispatch<React.SetStateAction<File[] | undefined>>
  inputId: string
  onFileSelect?: (files: File[]) => void
  onFileRemove?: (file: File) => void
  maxFiles?: number
  accept?: string
  multiple?: boolean
  disabled?: boolean
  fileInputRef?: React.RefObject<HTMLInputElement | null>
}

const FileUploadContext = createContext<FileUploadContextValue | undefined>(
  undefined
)

function useFileUploadContext() {
  const context = useContext(FileUploadContext)
  if (!context) {
    throw new Error("useFileUploadContext must be used within FileUpload")
  }
  return context
}

export { FileUploadContext, type FileUploadContextValue, useFileUploadContext }
