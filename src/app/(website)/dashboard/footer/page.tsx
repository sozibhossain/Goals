"use client"

import type React from "react"
import { useState, useRef, type ChangeEvent } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
const QuillEditor = dynamic(() => import('./_components/quill-editor'), {
  ssr: false,
})

import Image from "next/image"
import dynamic from "next/dynamic"

interface FormData {
  loginlink: string
  appstorelink: string
  googleplaylink: string
  whatWeDo: string
  whoWeAre: string
  whyUseGoals: string
}

interface FormErrors {
  image?: string
  loginlink?: string
  appstorelink?: string
  googleplaylink?: string
  whatWeDo?: string
  whoWeAre?: string
  whyUseGoals?: string
}

export default function Page() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    loginlink: "",
    appstorelink: "",
    googleplaylink: "",
    whatWeDo: "",
    whoWeAre: "",
    whyUseGoals: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "Please upload an image file" }))
      return
    }

    // Clear any previous errors
    setErrors((prev) => ({ ...prev, image: undefined }))

    // Create preview
    const reader = new FileReader()
    reader.onload = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleEditorChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user edits
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // URL validation regex
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

    if (!imagePreview) {
      newErrors.image = "Please upload a logo image"
    }

    if (!formData.loginlink) {
      newErrors.loginlink = "Login link is required"
    } else if (!urlRegex.test(formData.loginlink)) {
      newErrors.loginlink = "Please enter a valid URL"
    }

    if (formData.appstorelink && !urlRegex.test(formData.appstorelink)) {
      newErrors.appstorelink = "Please enter a valid App Store URL"
    }

    if (formData.googleplaylink && !urlRegex.test(formData.googleplaylink)) {
      newErrors.googleplaylink = "Please enter a valid Google Play URL"
    }

    if (!formData.whatWeDo || formData.whatWeDo === "<p><br></p>") {
      newErrors.whatWeDo = "What We Do content is required"
    }

    if (!formData.whoWeAre || formData.whoWeAre === "<p><br></p>") {
      newErrors.whoWeAre = "Who We Are content is required"
    }

    if (!formData.whyUseGoals || formData.whyUseGoals === "<p><br></p>") {
      newErrors.whyUseGoals = "Why Use Goals content is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Here you would typically send the data to your API
      // const response = await fetch('/api/footer', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     ...formData,
      //     logo: imagePreview
      //   })
      // });

      // if (!response.ok) throw new Error('Failed to save footer data');

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      alert("Footer information saved successfully!")
      // You could redirect or clear the form here
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Failed to save footer information. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pb-10">
      <h1 className="text-2xl font-bold mb-6">Footer Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-6">
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
                      src={imagePreview || "/placeholder.svg?height=160&width=320"}
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

            {/* Links */}
            <div className="space-y-4">
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
                <Label htmlFor="googleplaylink">Google play</Label>
                <Input
                  id="googleplaylink"
                  name="googleplaylink"
                  placeholder="https://play.google.com/..."
                  value={formData.googleplaylink}
                  onChange={handleInputChange}
                  className={errors.googleplaylink ? "border-red-500" : ""}
                />
                {errors.googleplaylink && <p className="text-sm text-red-500 mt-1">{errors.googleplaylink}</p>}
              </div>
            </div>
          </div>

          {/* Right column - Rich text editors */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="whatWeDo">What we do</Label>
              <QuillEditor
                value={formData.whatWeDo}
                onChange={(value) => handleEditorChange("whatWeDo", value)}
                id="whatWeDo"
              />
              {errors.whatWeDo && <p className="text-sm text-red-500 mt-1">{errors.whatWeDo}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="whoWeAre">Who we are</Label>
              <QuillEditor
                value={formData.whoWeAre}
                onChange={(value) => handleEditorChange("whoWeAre", value)}
                id="whoWeAre"
              />
              {errors.whoWeAre && <p className="text-sm text-red-500 mt-1">{errors.whoWeAre}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="whyUseGoals">Why use goals</Label>
              <QuillEditor
                value={formData.whyUseGoals}
                onChange={(value) => handleEditorChange("whyUseGoals", value)}
                id="whyUseGoals"
              />
              {errors.whyUseGoals && <p className="text-sm text-red-500 mt-1">{errors.whyUseGoals}</p>}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}
