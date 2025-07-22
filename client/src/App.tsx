"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Button } from "./components/ui/button"
import { Separator } from "./components/ui/separator"
import { Badge } from "./components/ui/badge"
import { ImageUpload } from "./components/ImageUpload"
import { ImagePreview } from "./components/ImagePreview"
import { OCRResults } from "./components/OCRResults"
import { LoadingSpinner } from "./components/LoadingSpinner"
import { AlertCircle, CreditCard, Upload, Zap } from "lucide-react"
import { Alert, AlertDescription } from "./components/ui/alert"
import "./App.css"
import { getAadhaarData, saveAadhaarData } from "./service/services"
import { uploadProfileImageCloudinary } from "./utils/uploadImageToClaudinary"
import type { AadhaarData } from "./types/IAadhaarData"
import { toast } from "sonner"

interface UploadedImage {
  file: File
  preview: string
}

function App() {
  const [frontImage, setFrontImage] = useState<UploadedImage | null>(null)
  const [backImage, setBackImage] = useState<UploadedImage | null>(null)
  const [frontImageUrl, setFrontImageUrl] = useState<string | null>(null)
  const [backImageUrl, setBackImageUrl] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [ocrResults, setOcrResults] = useState<AadhaarData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = async (file: File, type: "front" | "back") => {
    const preview = URL.createObjectURL(file)
    const uploadedImage = { file, preview }
    const frontUrl = await uploadProfileImageCloudinary(file)
    const backUrl = await uploadProfileImageCloudinary(file)
    console.log("Uploaded Image URL:", frontUrl || backUrl)
    if (type === "front") {
      setFrontImageUrl(frontUrl)
      setFrontImage(uploadedImage)
    } else {
      setBackImageUrl(backUrl)
      setBackImage(uploadedImage)
    }
    setOcrResults(null)
    setError(null)
  }

  const handleRemoveImage = (type: "front" | "back") => {
    if (type === "front") {
      if (frontImage) {
        URL.revokeObjectURL(frontImage.preview)
        setFrontImage(null)
      }
    } else {
      if (backImage) {
        URL.revokeObjectURL(backImage.preview)
        setBackImage(null)
      }
    }
    setOcrResults(null)
    setError(null)
  }

  const processOCR = async () => {
    if (!frontImage || !backImage) {
      setError("Please upload both front and back images of the Aadhaar card")
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const data  = await getAadhaarData(frontImageUrl, backImageUrl)
      setOcrResults(data)
    } catch (err) {
      setError("Failed to process OCR. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleUpdate= async (data:AadhaarData)=>{
    if(data){
      const response = await saveAadhaarData(data)
      if(response){
        toast.success("Data Saved")
      }
      setOcrResults(data)
    }
  }

  const canProcessOCR = frontImage && backImage && !isProcessing

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CreditCard className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Aadhaar OCR Scanner</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload front and back images of your Aadhaar card to extract information automatically using OCR technology
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Upload className="h-3 w-3" />
              Upload Images
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              OCR Processing
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <CreditCard className="h-3 w-3" />
              Extract Data
            </Badge>
          </div>
        </div>

        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Aadhaar Card Images
            </CardTitle>
            <CardDescription>
              Please upload clear, high-quality images of both sides of your Aadhaar card
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Front Side</h3>
                <ImageUpload
                  onImageUpload={(file) => handleImageUpload(file, "front")}
                  accept="image/*"
                  maxSize={5 * 1024 * 1024} 
                />
                {frontImage && (
                  <ImagePreview image={frontImage} onRemove={() => handleRemoveImage("front")} title="Front Side" />
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Back Side</h3>
                <ImageUpload
                  onImageUpload={(file) => handleImageUpload(file, "back")}
                  accept="image/*"
                  maxSize={5 * 1024 * 1024} // 5MB
                />
                {backImage && (
                  <ImagePreview image={backImage} onRemove={() => handleRemoveImage("back")} title="Back Side" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Process Button */}
        <div className="flex justify-center">
          <Button onClick={processOCR} disabled={!canProcessOCR} size="lg" className="px-8 py-3 text-lg">
            {isProcessing ? (
              <>
                <LoadingSpinner className="mr-2" />
                Processing OCR...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-5 w-5" />
                Extract Information
              </>
            )}
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {ocrResults && (
          <>
            <Separator />
            <OCRResults data={ocrResults} onDataUpdate={handleUpdate} />
          </>
        )}
      </div>
    </div>
  )
}

export default App
