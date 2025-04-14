"use client"

import { useState, useRef, type ChangeEvent, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Upload } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"
import { ColorPicker } from "../footer/_components/color-picker"

interface FormData {
  backgroundColor: string
  title1: string
  title2: string
  appstorelink?: string
  googoleplaylink?: string
  loginlink?: string
  mobileImage1: File | null
  mobileImage2: File | null
  mobileImage3: File | null
  mobileImage4: File | null
  allmobileImage: File | null
}

interface FormErrors {
  title1?: string
  title2?: string
  mobileImage1?: string
  mobileImage2?: string
  mobileImage3?: string
  mobileImage4?: string
  allmobileImage?: string
}

type ImageFieldKey =
  | "mobileImage1"
  | "mobileImage2"
  | "mobileImage3"
  | "mobileImage4"
  | "allmobileImage"

export default function Page() {
  const [formData, setFormData] = useState<FormData>({
    backgroundColor: "",
    title1: "",
    title2: "",
    mobileImage1: null,
    mobileImage2: null,
    mobileImage3: null,
    mobileImage4: null,
    allmobileImage: null,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [selectedColor, setSelectedColor] = useState<string>("")

  const [mobileImage1Preview, setMobileImage1Preview] = useState<string | null>(null)
  const [mobileImage2Preview, setMobileImage2Preview] = useState<string | null>(null)
  const [mobileImage3Preview, setMobileImage3Preview] = useState<string | null>(null)
  const [mobileImage4Preview, setMobileImage4Preview] = useState<string | null>(null)
  const [allmobileImagePreview, setAllmobileImagePreview] = useState<string | null>(null)

  const previewSetters: Record<ImageFieldKey, React.Dispatch<React.SetStateAction<string | null>>> = {
    mobileImage1: setMobileImage1Preview,
    mobileImage2: setMobileImage2Preview,
    mobileImage3: setMobileImage3Preview,
    mobileImage4: setMobileImage4Preview,
    allmobileImage: setAllmobileImagePreview,
  }

  const refs = {
    mobileImage1: useRef<HTMLInputElement>(null),
    mobileImage2: useRef<HTMLInputElement>(null),
    mobileImage3: useRef<HTMLInputElement>(null),
    mobileImage4: useRef<HTMLInputElement>(null),
    allmobileImage: useRef<HTMLInputElement>(null),
  }

  const triggerInput = (ref: React.RefObject<HTMLInputElement>) => () => ref.current?.click()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const createImagePreviewHandler = (
    field: ImageFieldKey,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>,
    errorField: keyof FormErrors
  ) => (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, [field]: file }))
    if (errors[errorField]) {
      setErrors((prev) => ({ ...prev, [errorField]: undefined }))
    }
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    setFormData((prev) => ({ ...prev, backgroundColor: color }))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.title1.trim()) newErrors.title1 = "Title 1 is required"
    if (!formData.mobileImage1) newErrors.mobileImage1 = "Mobile image 1 is required"
    if (!formData.mobileImage2) newErrors.mobileImage2 = "Mobile image 2 is required"
    if (!formData.mobileImage3) newErrors.mobileImage3 = "Mobile image 3 is required"
    if (!formData.mobileImage4) newErrors.mobileImage4 = "Mobile image 4 is required"
    if (!formData.allmobileImage) newErrors.allmobileImage = "All mobile image is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Form data submitted:", {
        ...formData,
        mobileImage1: formData.mobileImage1?.name ?? "No image uploaded",
        mobileImage2: formData.mobileImage2?.name ?? "No image uploaded",
        mobileImage3: formData.mobileImage3?.name ?? "No image uploaded",
        mobileImage4: formData.mobileImage4?.name ?? "No image uploaded",
        allmobileImage: formData.allmobileImage?.name ?? "No image uploaded",
      })

      alert("Form submitted successfully! Check console for full data.")

      setFormData({
        backgroundColor: "",
        title1: "",
        title2: "",
        mobileImage1: null,
        mobileImage2: null,
        mobileImage3: null,
        mobileImage4: null,
        allmobileImage: null,
      })
      setSelectedColor("")
      setMobileImage1Preview(null)
      setMobileImage2Preview(null)
      setMobileImage3Preview(null)
      setMobileImage4Preview(null)
      setAllmobileImagePreview(null)
    } else {
      console.log("Form validation failed")
    }
  }

  const renderImageInput = (
    label: string,
    inputId: ImageFieldKey,
    preview: string | null,
    error: string | undefined
  ) => (
    <div className="space-y-2">
      <Label htmlFor={inputId}>{label}</Label>
      <input
        type="file"
        id={inputId}
        ref={refs[inputId]}
        onChange={createImagePreviewHandler(inputId, previewSetters[inputId], inputId)}
        accept="image/*"
        className="hidden"
      />
      <div
        onClick={triggerInput(refs[inputId])}
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50"
      >
        {preview ? (
          <div className="space-y-2">
            <Image
              src={preview}
              alt={label}
              className="max-h-40 mx-auto object-contain"
              unoptimized
              width={300}
              height={300}
            />
            <p className="text-sm text-gray-500">Click to change image</p>
          </div>
        ) : (
          <div className="py-4 flex flex-col items-center">
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Click to upload {label.toLowerCase()}</p>
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )

  return (
    <div className="pb-10">
      <h1 className="text-2xl font-bold mb-6">Features Area</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label>Background Color</Label>
          <ColorPicker
            selectedColor={selectedColor}
            onColorChange={handleColorChange}
            previousColor={formData.backgroundColor}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderImageInput("Upload mobile image 1", "mobileImage1", mobileImage1Preview, errors.mobileImage1)}
          {renderImageInput("Upload mobile image 2", "mobileImage2", mobileImage2Preview, errors.mobileImage2)}
          {renderImageInput("Upload mobile image 3", "mobileImage3", mobileImage3Preview, errors.mobileImage3)}
          {renderImageInput("Upload mobile image 4", "mobileImage4", mobileImage4Preview, errors.mobileImage4)}
        </div>

        <div className="space-y-2">
          <Label htmlFor="title1">Title 1</Label>
          <Input id="title1" name="title1" value={formData.title1} onChange={handleInputChange} />
          {errors.title1 && <p className="text-sm text-red-500">{errors.title1}</p>}
        </div>

        {renderImageInput("Upload all mobile image", "allmobileImage", allmobileImagePreview, errors.allmobileImage)}

        <div className="space-y-2">
          <Label htmlFor="title2">Title 2</Label>
          <Input id="title2" name="title2" value={formData.title2} onChange={handleInputChange} />
        </div>

        {Object.keys(errors).length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Please fix the errors above before submitting the form.</AlertDescription>
          </Alert>
        )}

        <Button type="submit" className="w-full">Submit banner section</Button>
      </form>
    </div>
  )
}
