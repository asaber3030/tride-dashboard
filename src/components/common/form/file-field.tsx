"use client"

import React, { useCallback } from "react"
import { UploadIcon, XIcon, ImageIcon, FileIcon } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SingleFileUploadProps = {
  file?: File
  setFile: (file: File | undefined) => void
  accept?: { [key: string]: string[] } // e.g. { "image/*": [] }
  className?: string
  label?: string
}

function getFileTypeIcon(file: File) {
  if (file.type.startsWith("image/")) return <ImageIcon className='h-6 w-6 text-blue-500' />
  return <FileIcon className='h-6 w-6 text-gray-400' />
}

export const SingleFileUpload: React.FC<SingleFileUploadProps> = ({ file, setFile, accept, className, label = "Profile picture" }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles[0]) {
        setFile(acceptedFiles[0])
      }
    },
    [setFile]
  )

  const onRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    setFile(undefined)
  }

  const { getRootProps, getInputProps, isDragActive, fileRejections, acceptedFiles } = useDropzone({
    onDrop,
    accept,
    multiple: false,
    maxFiles: 1
  })

  return (
    <div className={cn("flex flex-col items-start w-full gap-2", className)}>
      {label && <label className='block font-medium text-sm text-gray-700 dark:text-gray-300'>{label}</label>}
      <Button
        type='button'
        variant='outline'
        className={cn("relative h-36 w-full rounded-xl p-0 flex items-center justify-center border-2 border-dashed bg-muted transition-all overflow-hidden group", isDragActive && "bg-blue-50 border-blue-400", file ? "border-green-400" : "border-gray-300")}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {file ? (
          <div className='flex flex-col items-center justify-center w-full h-full'>
            {file.type.startsWith("image/") ? <img src={URL.createObjectURL(file)} alt='Preview' className='object-cover rounded-lg w-24 h-24 mb-2 shadow' onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)} /> : <div className='mb-2'>{getFileTypeIcon(file)}</div>}
            <span className='truncate text-xs font-medium text-gray-700 dark:text-gray-200 w-28 text-center'>{file.name}</span>
            <Button type='button' variant='ghost' size='icon' className='absolute top-2 right-2 h-6 w-6 bg-white/90 hover:bg-red-100' onClick={onRemove} tabIndex={-1}>
              <XIcon className='h-4 w-4 text-red-600' />
            </Button>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center w-full'>
            <div className='flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 h-14 w-14 mb-2'>
              <UploadIcon className='h-7 w-7 text-blue-500' />
            </div>
            <span className='text-xs font-semibold text-gray-700 dark:text-gray-200'>Drag & drop or click to upload</span>
            <span className='text-xs text-gray-400 mt-1'>{accept ? Object.keys(accept).join(", ") : "Any file type"}</span>
          </div>
        )}
      </Button>
      {fileRejections.length > 0 && <div className='text-xs text-red-500 mt-1'>{fileRejections[0].errors[0]?.message}</div>}
    </div>
  )
}
