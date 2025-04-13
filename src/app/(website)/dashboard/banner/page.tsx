"use client"

import { useState, useRef, type ChangeEvent, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Upload } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

interface FormData {
  title: string
  subtitle: string
  appstorelink: string
  googoleplaylink: string
  loginlink: string
  backgroundImage: File | null
  mobileImage: File | null
}

interface FormErrors {
  title?: string
  subtitle?: string
  appstorelink?: string
  googoleplaylink?: string
  loginlink?: string
  backgroundImage?: string
  mobileImage?: string
}

export default function Page() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    subtitle: "",
    appstorelink: "",
    googoleplaylink: "",
    loginlink: "",
    backgroundImage: null,
    mobileImage: null,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [backgroundImagePreview, setBackgroundImagePreview] = useState<string | null>(null)
  const [mobileImagePreview, setMobileImagePreview] = useState<string | null>(null)
  const backgroundImageInputRef = useRef<HTMLInputElement>(null)
  const mobileImageInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleBackgroundImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, backgroundImage: file }))

    // Clear previous error
    if (errors.backgroundImage) {
      setErrors((prev) => ({ ...prev, backgroundImage: undefined }))
    }

    // Create preview
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setBackgroundImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setBackgroundImagePreview(null)
    }
  }

  const handleMobileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, mobileImage: file }))

    // Clear previous error
    if (errors.mobileImage) {
      setErrors((prev) => ({ ...prev, mobileImage: undefined }))
    }

    // Create preview
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setMobileImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setMobileImagePreview(null)
    }
  }

  const triggerBackgroundImageInput = () => {
    backgroundImageInputRef.current?.click()
  }

  const triggerMobileImageInput = () => {
    mobileImageInputRef.current?.click()
  }

  // Helper function to validate URLs
  const isValidUrl = (url: string): boolean => {
    // Basic URL validation - checks if starts with http:// or https://
    return /^(https?:\/\/)/.test(url)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    // Subtitle validation (optional)

    // App store link validation - should be a valid URL if provided
    if (formData.appstorelink && !isValidUrl(formData.appstorelink)) {
      newErrors.appstorelink = "App Store link must be a valid URL (start with http:// or https://)"
    }

    // Google Play link validation - should be a valid URL if provided
    if (formData.googoleplaylink && !isValidUrl(formData.googoleplaylink)) {
      newErrors.googoleplaylink = "Google Play link must be a valid URL (start with http:// or https://)"
    }

    // Login link validation - should be a valid URL if provided
    if (formData.loginlink && !isValidUrl(formData.loginlink)) {
      newErrors.loginlink = "Login link must be a valid URL (start with http:// or https://)"
    }

    // Background image validation
    if (!formData.backgroundImage) {
      newErrors.backgroundImage = "Background image is required"
    }

    // Mobile image validation
    if (!formData.mobileImage) {
      newErrors.mobileImage = "Mobile image is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Log all form data to console
      console.log("Form data submitted:", {
        title: formData.title,
        subtitle: formData.subtitle,
        appstorelink: formData.appstorelink,
        googoleplaylink: formData.googoleplaylink,
        loginlink: formData.loginlink,
        backgroundImage: formData.backgroundImage ? formData.backgroundImage.name : "No image uploaded",
        mobileImage: formData.mobileImage ? formData.mobileImage.name : "No image uploaded",
      })

      // Reset form after successful submission
      setFormData({
        title: "",
        subtitle: "",
        appstorelink: "",
        googoleplaylink: "",
        loginlink: "",
        backgroundImage: null,
        mobileImage: null,
      })
      setBackgroundImagePreview(null)
      setMobileImagePreview(null)

      alert("Form submitted successfully! Check the console for form data.")
    } else {
      console.log("Form has validation errors")
    }
  }

  return (
    <div className="pb-10">
      <h1 className="text-2xl font-bold mb-6">Banner area</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Background Image Upload */}
        <div className="space-y-2">
          <Label htmlFor="backgroundImage">Upload background image</Label>
          <input
            type="file"
            id="backgroundImage"
            ref={backgroundImageInputRef}
            onChange={handleBackgroundImageChange}
            accept="image/*"
            className="hidden"
          />
          <div
            onClick={triggerBackgroundImageInput}
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            {backgroundImagePreview ? (
              <div className="space-y-2">
                <Image
                  src={backgroundImagePreview || "/placeholder.svg"}
                  alt="Background Preview"
                  className="max-h-40 mx-auto object-contain"
                />
                <p className="text-sm text-gray-500">Click to change background image</p>
              </div>
            ) : (
              <div className="py-4 flex flex-col items-center">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Click to upload background image</p>
              </div>
            )}
          </div>
          {errors.backgroundImage && <p className="text-sm text-red-500 mt-1">{errors.backgroundImage}</p>}
        </div>

        {/* Mobile Image Upload */}
        <div className="space-y-2">
          <Label htmlFor="mobileImage">Upload mobile image</Label>
          <input
            type="file"
            id="mobileImage"
            ref={mobileImageInputRef}
            onChange={handleMobileImageChange}
            accept="image/*"
            className="hidden"
          />
          <div
            onClick={triggerMobileImageInput}
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            {mobileImagePreview ? (
              <div className="space-y-2">
                <Image
                  src={mobileImagePreview || "/placeholder.svg"}
                  alt="Mobile Preview"
                  className="max-h-40 mx-auto object-contain"
                />
                <p className="text-sm text-gray-500">Click to change mobile image</p>
              </div>
            ) : (
              <div className="py-4 flex flex-col items-center">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Click to upload mobile image</p>
              </div>
            )}
          </div>
          {errors.mobileImage && <p className="text-sm text-red-500 mt-1">{errors.mobileImage}</p>}
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
        </div>

        {/* Subtitle */}
        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            id="subtitle"
            name="subtitle"
            type="text"
            value={formData.subtitle}
            onChange={handleInputChange}
            className={errors.subtitle ? "border-red-500" : ""}
          />
          {errors.subtitle && <p className="text-sm text-red-500 mt-1">{errors.subtitle}</p>}
        </div>

        {/* App Store Link */}
        <div className="space-y-2">
          <Label htmlFor="appstorelink">App store</Label>
          <Input
            id="appstorelink"
            name="appstorelink"
            placeholder="https://apps.apple.com/..."
            value={formData.appstorelink}
            onChange={handleInputChange}
            className={errors.appstorelink ? "border-red-500" : ""}
          />
          {errors.appstorelink && <p className="text-sm text-red-500 mt-1">{errors.appstorelink}</p>}
        </div>

        {/* Google Play Link */}
        <div className="space-y-2">
          <Label htmlFor="googoleplaylink">Google play</Label>
          <Input
            id="googoleplaylink"
            name="googoleplaylink"
            placeholder="https://play.google.com/..."
            value={formData.googoleplaylink}
            onChange={handleInputChange}
            className={errors.googoleplaylink ? "border-red-500" : ""}
          />
          {errors.googoleplaylink && <p className="text-sm text-red-500 mt-1">{errors.googoleplaylink}</p>}
        </div>

        {/* Login Link */}
        <div className="space-y-2">
          <Label htmlFor="loginlink">Log in</Label>
          <Input
            id="loginlink"
            name="loginlink"
            placeholder="https://example.com/login"
            value={formData.loginlink}
            onChange={handleInputChange}
            className={errors.loginlink ? "border-red-500" : ""}
          />
          {errors.loginlink && <p className="text-sm text-red-500 mt-1">{errors.loginlink}</p>}
        </div>

        {Object.keys(errors).length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Please fix the errors above before submitting the form.</AlertDescription>
          </Alert>
        )}

        <Button type="submit" className="w-full">
          Submit banner section
        </Button>
      </form>
    </div>
  )
}
