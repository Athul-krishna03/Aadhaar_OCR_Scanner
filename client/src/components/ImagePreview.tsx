"use client"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { X, Eye } from "lucide-react"

interface UploadedImage {
    file: File
    preview: string
}

interface ImagePreviewProps {
    image: UploadedImage
    onRemove: () => void
    title: string
    className?: string
}

export function ImagePreview({ image, onRemove, title, className = "" }: ImagePreviewProps) {
    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const sizes = ["Bytes", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }

    return (
        <Card className={className}>
        <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Button
                variant="ghost"
                size="sm"
                onClick={onRemove}
                className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
            >
                <X className="h-4 w-4" />
            </Button>
            </div>
        </CardHeader>
        <CardContent className="space-y-3">
            <div className="relative aspect-[3/2] overflow-hidden rounded-lg border">
            <img src={image.preview || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                <Button variant="secondary" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                View
                </Button>
            </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="truncate max-w-[120px]">{image.file.name}</span>
            <Badge variant="secondary" className="text-xs">
                {formatFileSize(image.file.size)}
            </Badge>
            </div>
        </CardContent>
        </Card>
    )
}
