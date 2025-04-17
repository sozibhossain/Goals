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
  loginlink: string
  appstorelink: string
  googleplaylink: string
  whatWeDo: string
  whoWeAre: string
  whyUseGoals: string
  imageFile: File | null
  existingImageName: string
}

interface FormErrors {
  imageFile?: string
  loginlink?: string
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
    loginlink: "",
    appstorelink: "",
    googleplaylink: "",
    whatWeDo: "",
    whoWeAre: "",
    whyUseGoals: "",
    imageFile: null,
    existingImageName: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedColor, setSelectedColor] = useState<string>("")
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
            loginlink: footer.login_link || "",
            appstorelink: footer.app_store_link || "",
            googleplaylink: footer.google_play_link || "",
            whatWeDo: footer.first_text || "",
            whoWeAre: footer.second_text || "",
            whyUseGoals: footer.third_text || "",
            imageFile: null,
            existingImageName: logoImageName,
          })

          setSelectedColor(footer.color || "")
          setEditingId(footer.id)

          if (logoImageName) {
            setImagePreview(`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads//settings/${logoImageName}`)
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

  const handleColorChange = (color: string) => {
    setFormData((prev) => ({
      ...prev,
      backgroundColor: color,
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

    if (!formData.imageFile && !formData.existingImageName) {
      newErrors.imageFile = "Please upload a logo image"
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
      console.warn("Form has validation errors")
      return
    }

    setIsSubmitting(true)

    const formPayload = new FormData()
    
    // Append all fields to FormData
    formPayload.append("color", formData.backgroundColor)
    formPayload.append("login_link", formData.loginlink)
    formPayload.append("app_store_link", formData.appstorelink)
    formPayload.append("google_play_link", formData.googleplaylink)
    formPayload.append("first_text", formData.whatWeDo)
    formPayload.append("second_text", formData.whoWeAre)
    formPayload.append("third_text", formData.whyUseGoals)
    
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
      loginlink: "",
      appstorelink: "",
      googleplaylink: "",
      whatWeDo: "",
      whoWeAre: "",
      whyUseGoals: "",
      imageFile: null,
      existingImageName: "",
    })
    setErrors({})
    setSelectedColor("")
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
              selectedColor={selectedColor}
              onColorChange={handleColorChange}
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

          <div className="space-y-6">
            {/* Quill editors for "What We Do", "Who We Are", and "Why Use Goals" */}
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