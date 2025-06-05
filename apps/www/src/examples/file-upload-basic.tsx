import { FileUpload, FileUploadList, FileUploadTrigger } from "@bun-ui/react"
import { UploadIcon } from "lucide-react"

export const FileUploadBasic = () => {
  return (
    <FileUpload className="w-[400px]">
      <FileUploadTrigger>
        <UploadIcon />
        <p className="text-sm">Upload</p>
      </FileUploadTrigger>
      <FileUploadList />
    </FileUpload>
  )
}
