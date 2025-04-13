"use client"

import { useState, useRef, type ChangeEvent, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Upload } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

interface FormData {
  itemname: string
  itemlink: string
  itemname2: string
  itemlink2: string
  loginlink: string
  appstorelink: string
  googoleplaylink: string
  image: File | null
}

interface FormErrors {
  itemname?: string
  itemlink?: string
  itemname2?: string
  itemlink2?: string
  loginlink?: string
  appstorelink?: string
  googoleplaylink?: string
  image?: string
}

export default function Page() {
  const [formData, setFormData] = useState<FormData>({
    itemname: "",
    itemlink: "",
    itemname2: "",
    itemlink2: "",
    loginlink: "",
    appstorelink: "",
    googoleplaylink: "",
    image: null,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, image: file }))

    // Clear previous error
    if (errors.image) {
      setErrors((prev) => ({ ...prev, image: undefined }))
    }

    // Create preview
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // Helper function to validate URLs
  const isValidUrl = (url: string): boolean => {
    // Basic URL validation - checks if starts with http:// or https://
    return /^(https?:\/\/)/.test(url)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Item name validation
    if (!formData.itemname.trim()) {
      newErrors.itemname = "Item name is required"
    }

    // Item link validation - should include a # character
    if (formData.itemlink && !formData.itemlink.includes("#")) {
      newErrors.itemlink = "Item link must include a # character"
    }

    // Item name 2 validation (if provided)
    if (formData.itemname2 && !formData.itemlink2) {
      newErrors.itemlink2 = "Item link is required when item name is provided"
    }

    // Item link 2 validation (if provided)
    if (formData.itemlink2 && !formData.itemlink2.includes("#")) {
      newErrors.itemlink2 = "Item link must include a # character"
    }

    // Login link validation - should be a valid URL
    if (formData.loginlink && !isValidUrl(formData.loginlink)) {
      newErrors.loginlink = "Login link must be a valid URL (start with http:// or https://)"
    }

    // App store link validation - should be a valid URL
    if (formData.appstorelink && !isValidUrl(formData.appstorelink)) {
      newErrors.appstorelink = "App Store link must be a valid URL (start with http:// or https://)"
    }

    // Google Play link validation - should be a valid URL
    if (formData.googoleplaylink && !isValidUrl(formData.googoleplaylink)) {
      newErrors.googoleplaylink = "Google Play link must be a valid URL (start with http:// or https://)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Log all form data to console
      console.log("Form data submitted:", {
        itemname: formData.itemname,
        itemlink: formData.itemlink,
        itemname2: formData.itemname2,
        itemlink2: formData.itemlink2,
        loginlink: formData.loginlink,
        appstorelink: formData.appstorelink,
        googoleplaylink: formData.googoleplaylink,
        image: formData.image ? formData.image.name : "No image uploaded",
      })

      // Reset form after successful submission
      setFormData({
        itemname: "",
        itemlink: "",
        itemname2: "",
        itemlink2: "",
        loginlink: "",
        appstorelink: "",
        googoleplaylink: "",
        image: null,
      })
      setImagePreview(null)

      alert("Form submitted successfully! Check the console for form data.")
    } else {
      console.log("Form has validation errors")
    }
  }

  return (
    <div className="pb-10">
      <h1 className="text-2xl font-bold mb-6">Header</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image upload */}
        <div className="space-y-2">
          <Label htmlFor="image">Upload logo</Label>
          <input
            type="file"
            id="image"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
          <div
            onClick={triggerFileInput}
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            {imagePreview ? (
              <div className="space-y-2">
                <Image
                  src={imagePreview || "/placeholder.svg"}
                  alt="Preview"
                  className="max-h-40 mx-auto object-contain"
                />
                <p className="text-sm text-gray-500">Click to change image</p>
              </div>
            ) : (
              <div className="py-4 flex flex-col items-center">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Click to upload an image</p>
              </div>
            )}
          </div>
          {errors.image && <p className="text-sm text-red-500 mt-1">{errors.image}</p>}
        </div>

        {/* Text inputs */}
        <div className="">
          <h1 className="py-4 text-[20px] font-medium">Header menu item</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div>
                <Input
                  id="itemname"
                  name="itemname"
                  value={formData.itemname}
                  placeholder="Item name"
                  onChange={handleInputChange}
                  className={errors.itemname ? "border-red-500" : ""}
                />
                {errors.itemname && <p className="text-sm text-red-500 mt-1">{errors.itemname}</p>}
              </div>
              <div>
                <Input
                  id="itemlink"
                  name="itemlink"
                  placeholder="#Itemlink"
                  value={formData.itemlink}
                  onChange={handleInputChange}
                  className={errors.itemlink ? "border-red-500" : ""}
                />
                {errors.itemlink && <p className="text-sm text-red-500 mt-1">{errors.itemlink}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <Input
                  id="itemname2"
                  name="itemname2"
                  placeholder="Item name"
                  value={formData.itemname2}
                  onChange={handleInputChange}
                  className={errors.itemname2 ? "border-red-500" : ""}
                />
                {errors.itemname2 && <p className="text-sm text-red-500 mt-1">{errors.itemname2}</p>}
              </div>
              <div>
                <Input
                  id="itemlink2"
                  name="itemlink2"
                  placeholder="#Itemlink"
                  value={formData.itemlink2}
                  onChange={handleInputChange}
                  className={errors.itemlink2 ? "border-red-500" : ""}
                />
                {errors.itemlink2 && <p className="text-sm text-red-500 mt-1">{errors.itemlink2}</p>}
              </div>
            </div>
          </div>
        </div>

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

        {Object.keys(errors).length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Please fix the errors above before submitting the form.</AlertDescription>
          </Alert>
        )}

        <Button type="submit" className="w-full">
          Submit Header
        </Button>
      </form>
    </div>
  )
}
