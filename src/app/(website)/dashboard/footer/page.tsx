"use client"

import dynamic from "next/dynamic"
import type React from "react"
import { useState, useRef, useEffect, type ChangeEvent } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import Image from "next/image"
import { ColorPicker } from "./_components/color-picker"
import { useSession } from "next-auth/react"

// Dynamically import QuillEditor for client-only rendering
const QuillEditor = dynamic(() => import("./_components/quill-editor"), {
  ssr: false,
})

interface FormData {
  backgroundColor: string
  appstorelink: string
  googleplaylink: string
  whatWeDo: string
  whoWeAre: string
  whyUseGoals: string
  whatWeDoColor: string
  whoWeAreColor: string
  whyUseGoalsColor: string
  imageFile: File | null
  existingImageName: string
}

interface FormErrors {
  imageFile?: string
  appstorelink?: string
  googleplaylink?: string
  whatWeDo?: string
  whoWeAre?: string
  whyUseGoals?: string
}

export default function Page() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState<FormData>({
    backgroundColor: "",
    appstorelink: "",
    googleplaylink: "",
    whatWeDo: "",
    whoWeAre: "",
    whyUseGoals: "",
    whatWeDoColor: "",
    whoWeAreColor: "",
    whyUseGoalsColor: "",
    imageFile: null,
    existingImageName: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const session = useSession()
  const token = (session?.data?.user as { token: string })?.token

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/footer`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) throw new Error("Failed to fetch footer data")

        const data = await response.json()

        if (data) {
          const footer = data
          const logoImageName = footer.logo ? footer.logo.split('/').pop() : ""

          setFormData({
            backgroundColor: footer.color || "",
            appstorelink: footer.app_store_link || "",
            googleplaylink: footer.google_play_link || "",
            whatWeDo: footer.first_text || "",
            whoWeAre: footer.second_text || "",
            whyUseGoals: footer.third_text || "",
            whatWeDoColor: footer.first_text_color || "",
            whoWeAreColor: footer.second_text_color || "",
            whyUseGoalsColor: footer.third_text_color || "",
            imageFile: null,
            existingImageName: logoImageName,
          })

          setEditingId(footer.id)

          if (logoImageName) {
            setImagePreview(`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/settings/${logoImageName}`)
          }
        }
      } catch (err) {
        console.error("Error loading footer data", err)
      } finally {
        setLoading(false)
      }
    }

    fetchFooterData()
  }, [token])

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, imageFile: "Please upload an image file" }))
      return
    }

    setErrors((prev) => ({ ...prev, imageFile: undefined }))

    // Create preview URL
    const previewUrl = URL.createObjectURL(file)
    setImagePreview(previewUrl)

    setFormData((prev) => ({
      ...prev,
      imageFile: file,
      existingImageName: "",
    }))
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleEditorChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleColorChange = (color: string, field: keyof FormData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: color,
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

    if (!formData.imageFile && !formData.existingImageName) {
      newErrors.imageFile = "Please upload a logo image"
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
      console.warn("Form has validation errors")
      return
    }

    setIsSubmitting(true)

    const formPayload = new FormData()
    
    // Append all fields to FormData
    formPayload.append("color", formData.backgroundColor)
    formPayload.append("app_store_link", formData.appstorelink)
    formPayload.append("google_play_link", formData.googleplaylink)
    formPayload.append("first_text", formData.whatWeDo)
    formPayload.append("first_text_color", formData.whatWeDoColor)
    formPayload.append("second_text", formData.whoWeAre)
    formPayload.append("second_text_color", formData.whoWeAreColor)
    formPayload.append("third_text", formData.whyUseGoals)
    formPayload.append("third_text_color", formData.whyUseGoalsColor)
    
    // Only append the image if a new one was uploaded
    if (formData.imageFile) {
      formPayload.append("logo", formData.imageFile)
    } else if (formData.existingImageName) {
      formPayload.append("existing_logo", formData.existingImageName)
    }

    // Include the ID if we're editing
    if (editingId) {
      formPayload.append("id", editingId.toString())
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/footer`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formPayload,
      })

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

      const result = await response.json()
      console.log("Form submitted successfully:", result)
      alert("Footer information saved successfully!")

      // Update editingId if this was a create operation
      if (!editingId && result.id) {
        setEditingId(result.id)
      }

    } catch (err) {
      console.error("Form submission error:", err)
      alert("Failed to submit Footer. Check console for details.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      backgroundColor: "",
      appstorelink: "",
      googleplaylink: "",
      whatWeDo: "",
      whoWeAre: "",
      whyUseGoals: "",
      whatWeDoColor: "",
      whoWeAreColor: "",
      whyUseGoalsColor: "",
      imageFile: null,
      existingImageName: "",
    })
    setErrors({})
    setImagePreview(null)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="pb-10">
      <h1 className="text-2xl font-bold mb-6">Footer Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Background Color Picker */}
        <div className="space-y-2">
          <Label htmlFor="backgroundColor">Background Color</Label>
          <div className="mt-0">
            <ColorPicker
              selectedColor={formData.backgroundColor}
              onColorChange={(color) => handleColorChange(color, "backgroundColor")}
              previousColor={formData.backgroundColor}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Image Upload Section */}
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
                {imagePreview || formData.existingImageName ? (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">
                      {formData.imageFile?.name || formData.existingImageName} - Click to change image
                    </p>
                    <div className="flex justify-center">
                      <Image
                        src={imagePreview || `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${formData.existingImageName}`}
                        alt="Uploaded Logo"
                        width={150}
                        height={100}
                        className="mx-auto object-contain border rounded-lg"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="py-4 flex flex-col items-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload an image</p>
                  </div>
                )}
              </div>
              {errors.imageFile && (
                <p className="text-sm text-red-500 mt-1">{errors.imageFile}</p>
              )}
            </div>

            {/* Other form inputs for login, app store, etc. */}
            <div className="space-y-4">
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

          <div className="space-y-6">
            {/* What We Do Section */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="whatWeDo">What we do</Label>
                <div className="flex items-center gap-2">
                  <Label className="text-sm text-gray-500">Text Color:</Label>
                  <ColorPicker
                    selectedColor={formData.whatWeDoColor}
                    onColorChange={(color) => handleColorChange(color, "whatWeDoColor")}
                    previousColor={formData.whatWeDoColor}
                  />
                </div>
              </div>
              <QuillEditor
                value={formData.whatWeDo}
                onChange={(value) => handleEditorChange("whatWeDo", value)}
                id="whatWeDo"
              />
              {errors.whatWeDo && <p className="text-sm text-red-500 mt-1">{errors.whatWeDo}</p>}
            </div>

            {/* Who We Are Section */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="whoWeAre">Who we are</Label>
                <div className="flex items-center gap-2">
                  <Label className="text-sm text-gray-500">Text Color:</Label>
                  <ColorPicker
                    selectedColor={formData.whoWeAreColor}
                    onColorChange={(color) => handleColorChange(color, "whoWeAreColor")}
                    previousColor={formData.whoWeAreColor}
                  />
                </div>
              </div>
              <QuillEditor
                value={formData.whoWeAre}
                onChange={(value) => handleEditorChange("whoWeAre", value)}
                id="whoWeAre"
              />
              {errors.whoWeAre && <p className="text-sm text-red-500 mt-1">{errors.whoWeAre}</p>}
            </div>

            {/* Why Use Goals Section */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="whyUseGoals">Why use goals</Label>
                <div className="flex items-center gap-2">
                  <Label className="text-sm text-gray-500">Text Color:</Label>
                  <ColorPicker
                    selectedColor={formData.whyUseGoalsColor}
                    onColorChange={(color) => handleColorChange(color, "whyUseGoalsColor")}
                    previousColor={formData.whyUseGoalsColor}
                  />
                </div>
              </div>
              <QuillEditor
                value={formData.whyUseGoals}
                onChange={(value) => handleEditorChange("whyUseGoals", value)}
                id="whyUseGoals"
              />
              {errors.whyUseGoals && <p className="text-sm text-red-500 mt-1">{errors.whyUseGoals}</p>}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" onClick={resetForm} className="min-w-[120px]">
            Reset
          </Button>
          <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}