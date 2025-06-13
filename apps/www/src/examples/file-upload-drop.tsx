import { FileUpload, FileUploadDropZone, FileUploadList } from "@bun-ui/react"
import { UploadIcon } from "lucide-react"

export const FileUploadDrop = () => {
  return (
    <FileUpload className="w-[450px]">
      <FileUploadDropZone>
        <UploadIcon className="h-8 w-8" />
        <p className="text-sm">
          Drag and drop files here, or click to select files
        </p>
      </FileUploadDropZone>
      <FileUploadList />
    </FileUpload>
  )
}
