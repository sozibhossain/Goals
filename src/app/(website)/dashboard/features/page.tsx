"use client"

import { useState, useRef, type ChangeEvent, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Upload } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

interface FormData {
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

export default function Page() {
  const [formData, setFormData] = useState<FormData>({
    title1: "",
    title2: "",
    mobileImage1: null,
    mobileImage2: null,
    mobileImage3: null,
    mobileImage4: null,
    allmobileImage: null,
  })

  const [errors, setErrors] = useState<FormErrors>({})

  // Image previews
  const [mobileImage1Preview, setMobileImage1Preview] = useState<string | null>(null)
  const [mobileImage2Preview, setMobileImage2Preview] = useState<string | null>(null)
  const [mobileImage3Preview, setMobileImage3Preview] = useState<string | null>(null)
  const [mobileImage4Preview, setMobileImage4Preview] = useState<string | null>(null)
  const [allmobileImagePreview, setAllmobileImagePreview] = useState<string | null>(null)

  // Create separate refs for each mobile image
  const mobileImage1Ref = useRef<HTMLInputElement>(null)
  const mobileImage2Ref = useRef<HTMLInputElement>(null)
  const mobileImage3Ref = useRef<HTMLInputElement>(null)
  const mobileImage4Ref = useRef<HTMLInputElement>(null)
  const allmobileImageRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  // Individual image change handlers
  const handleMobileImage1Change = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, mobileImage1: file }))

    if (errors.mobileImage1) {
      setErrors((prev) => ({ ...prev, mobileImage1: undefined }))
    }

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setMobileImage1Preview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setMobileImage1Preview(null)
    }
  }

  const handleMobileImage2Change = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, mobileImage2: file }))

    if (errors.mobileImage2) {
      setErrors((prev) => ({ ...prev, mobileImage2: undefined }))
    }

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setMobileImage2Preview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setMobileImage2Preview(null)
    }
  }

  const handleMobileImage3Change = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, mobileImage3: file }))

    if (errors.mobileImage3) {
      setErrors((prev) => ({ ...prev, mobileImage3: undefined }))
    }

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setMobileImage3Preview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setMobileImage3Preview(null)
    }
  }

  const handleMobileImage4Change = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, mobileImage4: file }))

    if (errors.mobileImage4) {
      setErrors((prev) => ({ ...prev, mobileImage4: undefined }))
    }

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setMobileImage4Preview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setMobileImage4Preview(null)
    }
  }

  const handleAllmobileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, allmobileImage: file }))

    if (errors.allmobileImage) {
      setErrors((prev) => ({ ...prev, allmobileImage: undefined }))
    }

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAllmobileImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setAllmobileImagePreview(null)
    }
  }

  // Trigger functions for file inputs
  const triggerMobileImage1Input = () => mobileImage1Ref.current?.click()
  const triggerMobileImage2Input = () => mobileImage2Ref.current?.click()
  const triggerMobileImage3Input = () => mobileImage3Ref.current?.click()
  const triggerMobileImage4Input = () => mobileImage4Ref.current?.click()
  const triggerAllmobileImageInput = () => allmobileImageRef.current?.click()

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Title validation
    if (!formData.title1.trim()) {
      newErrors.title1 = "Title 1 is required"
    }

    // Mobile images validation
    if (!formData.mobileImage1) {
      newErrors.mobileImage1 = "Mobile image 1 is required"
    }

    if (!formData.mobileImage2) {
      newErrors.mobileImage2 = "Mobile image 2 is required"
    }

    if (!formData.mobileImage3) {
      newErrors.mobileImage3 = "Mobile image 3 is required"
    }

    if (!formData.mobileImage4) {
      newErrors.mobileImage4 = "Mobile image 4 is required"
    }

    // All mobile image validation
    if (!formData.allmobileImage) {
      newErrors.allmobileImage = "All mobile image is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Log all form data to console
      console.log("Form data submitted:", {
        title1: formData.title1,
        title2: formData.title2,
        mobileImage1: formData.mobileImage1 ? formData.mobileImage1.name : "No image uploaded",
        mobileImage2: formData.mobileImage2 ? formData.mobileImage2.name : "No image uploaded",
        mobileImage3: formData.mobileImage3 ? formData.mobileImage3.name : "No image uploaded",
        mobileImage4: formData.mobileImage4 ? formData.mobileImage4.name : "No image uploaded",
        allmobileImage: formData.allmobileImage ? formData.allmobileImage.name : "No image uploaded",
      })

      // Reset form after successful submission
      setFormData({
        title1: "",
        title2: "",
        mobileImage1: null,
        mobileImage2: null,
        mobileImage3: null,
        mobileImage4: null,
        allmobileImage: null,
      })

      // Reset previews
      setMobileImage1Preview(null)
      setMobileImage2Preview(null)
      setMobileImage3Preview(null)
      setMobileImage4Preview(null)
      setAllmobileImagePreview(null)

      alert("Form submitted successfully! Check the console for form data.")
    } else {
      console.log("Form has validation errors")
    }
  }

  return (
    <div className="pb-10">
      <h1 className="text-2xl font-bold mb-6">Banner area</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          {/* Mobile Images Upload */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Mobile Image 1 */}
            <div className="space-y-2">
              <Label htmlFor="mobileImage1">Upload mobile image 1</Label>
              <input
                type="file"
                id="mobileImage1"
                ref={mobileImage1Ref}
                onChange={handleMobileImage1Change}
                accept="image/*"
                className="hidden"
              />
              <div
                onClick={triggerMobileImage1Input}
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              >
                {mobileImage1Preview ? (
                  <div className="space-y-2">
                    <Image
                      src={mobileImage1Preview || "/placeholder.svg"}
                      alt="Mobile Preview 1"
                      className="max-h-40 mx-auto object-contain"
                    />
                    <p className="text-sm text-gray-500">Click to change image</p>
                  </div>
                ) : (
                  <div className="py-4 flex flex-col items-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload image 1</p>
                  </div>
                )}
              </div>
              {errors.mobileImage1 && <p className="text-sm text-red-500 mt-1">{errors.mobileImage1}</p>}
            </div>

            {/* Mobile Image 2 */}
            <div className="space-y-2">
              <Label htmlFor="mobileImage2">Upload mobile image 2</Label>
              <input
                type="file"
                id="mobileImage2"
                ref={mobileImage2Ref}
                onChange={handleMobileImage2Change}
                accept="image/*"
                className="hidden"
              />
              <div
                onClick={triggerMobileImage2Input}
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              >
                {mobileImage2Preview ? (
                  <div className="space-y-2">
                    <Image
                      src={mobileImage2Preview || "/placeholder.svg"}
                      alt="Mobile Preview 2"
                      className="max-h-40 mx-auto object-contain"
                    />
                    <p className="text-sm text-gray-500">Click to change image</p>
                  </div>
                ) : (
                  <div className="py-4 flex flex-col items-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload image 2</p>
                  </div>
                )}
              </div>
              {errors.mobileImage2 && <p className="text-sm text-red-500 mt-1">{errors.mobileImage2}</p>}
            </div>

            {/* Mobile Image 3 */}
            <div className="space-y-2">
              <Label htmlFor="mobileImage3">Upload mobile image 3</Label>
              <input
                type="file"
                id="mobileImage3"
                ref={mobileImage3Ref}
                onChange={handleMobileImage3Change}
                accept="image/*"
                className="hidden"
              />
              <div
                onClick={triggerMobileImage3Input}
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              >
                {mobileImage3Preview ? (
                  <div className="space-y-2">
                    <Image
                      src={mobileImage3Preview || "/placeholder.svg"}
                      alt="Mobile Preview 3"
                      className="max-h-40 mx-auto object-contain"
                    />
                    <p className="text-sm text-gray-500">Click to change image</p>
                  </div>
                ) : (
                  <div className="py-4 flex flex-col items-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload image 3</p>
                  </div>
                )}
              </div>
              {errors.mobileImage3 && <p className="text-sm text-red-500 mt-1">{errors.mobileImage3}</p>}
            </div>

            {/* Mobile Image 4 */}
            <div className="space-y-2">
              <Label htmlFor="mobileImage4">Upload mobile image 4</Label>
              <input
                type="file"
                id="mobileImage4"
                ref={mobileImage4Ref}
                onChange={handleMobileImage4Change}
                accept="image/*"
                className="hidden"
              />
              <div
                onClick={triggerMobileImage4Input}
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              >
                {mobileImage4Preview ? (
                  <div className="space-y-2">
                    <Image
                      src={mobileImage4Preview || "/placeholder.svg"}
                      alt="Mobile Preview 4"
                      className="max-h-40 mx-auto object-contain"
                    />
                    <p className="text-sm text-gray-500">Click to change image</p>
                  </div>
                ) : (
                  <div className="py-4 flex flex-col items-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload image 4</p>
                  </div>
                )}
              </div>
              {errors.mobileImage4 && <p className="text-sm text-red-500 mt-1">{errors.mobileImage4}</p>}
            </div>
          </div>

          {/* Title 1 */}
          <div className="space-y-2">
            <Label htmlFor="title1">Title1</Label>
            <Input
              id="title1"
              name="title1"
              type="text"
              value={formData.title1}
              onChange={handleInputChange}
              className={errors.title1 ? "border-red-500" : ""}
            />
            {errors.title1 && <p className="text-sm text-red-500 mt-1">{errors.title1}</p>}
          </div>
        </div>

        <div>
          {/* All Mobile Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="allmobileImage">Upload all mobile image</Label>
            <input
              type="file"
              id="allmobileImage"
              ref={allmobileImageRef}
              onChange={handleAllmobileImageChange}
              accept="image/*"
              className="hidden"
            />
            <div
              onClick={triggerAllmobileImageInput}
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            >
              {allmobileImagePreview ? (
                <div className="space-y-2">
                  <Image
                    src={allmobileImagePreview || "/placeholder.svg"}
                    alt="All Mobile Preview"
                    className="max-h-40 mx-auto object-contain"
                  />
                  <p className="text-sm text-gray-500">Click to change image</p>
                </div>
              ) : (
                <div className="py-4 flex flex-col items-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload all mobile image</p>
                </div>
              )}
            </div>
            {errors.allmobileImage && <p className="text-sm text-red-500 mt-1">{errors.allmobileImage}</p>}
          </div>

          {/* Title 2 */}
          <div className="space-y-2 mt-4">
            <Label htmlFor="title2">Title2</Label>
            <Input
              id="title2"
              name="title2"
              type="text"
              value={formData.title2}
              onChange={handleInputChange}
              className={errors.title2 ? "border-red-500" : ""}
            />
            {errors.title2 && <p className="text-sm text-red-500 mt-1">{errors.title2}</p>}
          </div>
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
