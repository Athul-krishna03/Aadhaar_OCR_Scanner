"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Upload, ImageIcon, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "./ui/alert"

interface ImageUploadProps {
    onImageUpload: (file: File) => void
    accept?: string
    maxSize?: number
    className?: string
}

export function ImageUpload({
    onImageUpload,
    accept = "image/*",
    maxSize = 5 * 1024 * 1024,
    className = "",
}: ImageUploadProps) {
    const [error, setError] = useState<string | null>(null)

    const onDrop = useCallback(
        (acceptedFiles: File[], rejectedFiles: any[]) => {
        setError(null)

        if (rejectedFiles.length > 0) {
            const rejection = rejectedFiles[0]
            if (rejection.errors[0]?.code === "file-too-large") {
            setError(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`)
            } else if (rejection.errors[0]?.code === "file-invalid-type") {
            setError("Please upload a valid image file")
            } else {
            setError("Invalid file. Please try again.")
            }
            return
        }

        if (acceptedFiles.length > 0) {
            onImageUpload(acceptedFiles[0])
        }
        },
        [onImageUpload, maxSize],
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { [accept]: [] },
        maxSize,
        multiple: false,
    })

    return (
        <div className={className}>
        <Card
            {...getRootProps()}
            className={`cursor-pointer transition-colors border-2 border-dashed ${
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
            }`}
        >
            <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <input {...getInputProps()} />
            <div className="space-y-4">
                <div className="flex justify-center">
                {isDragActive ? (
                    <Upload className="h-12 w-12 text-blue-500" />
                ) : (
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                )}
                </div>
                <div className="space-y-2">
                <p className="text-lg font-medium">{isDragActive ? "Drop the image here" : "Upload Aadhaar Image"}</p>
                <p className="text-sm text-gray-500">Drag and drop an image here, or click to select</p>
                <p className="text-xs text-gray-400">
                    Supports: JPG, PNG, GIF (Max: {Math.round(maxSize / (1024 * 1024))}MB)
                </p>
                </div>
                <Button variant="outline" type="button">
                Choose File
                </Button>
            </div>
            </CardContent>
        </Card>

        {error && (
            <Alert variant="destructive" className="mt-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        </div>
    )
}
