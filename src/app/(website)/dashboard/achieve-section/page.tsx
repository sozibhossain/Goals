"use client"

import { useState, useRef, type ChangeEvent, type FormEvent, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Upload } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"
import { useSession } from "next-auth/react"

interface FormData {
  title1: string
  title2: string
  backgroundImage: File | null
  mobileImage2: File | null
  mobileImage3: File | null
  mobileImage4: File | null
  logoImage: File | null
}

interface FormErrors {
  title1?: string
  title2?: string
  backgroundImage?: string
  mobileImage2?: string
  mobileImage3?: string
  mobileImage4?: string
  logoImage?: string
}

type ImageFieldKey = "backgroundImage" | "mobileImage2" | "mobileImage3" | "mobileImage4" | "logoImage"

export default function Page() {
  const [formData, setFormData] = useState<FormData>({
    title1: "",
    title2: "",
    backgroundImage: null,
    mobileImage2: null,
    mobileImage3: null,
    mobileImage4: null,
    logoImage: null,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [backgroundImagePreview, setbackgroundImagePreview] = useState<string | null>(null)
  const [mobileImage2Preview, setMobileImage2Preview] = useState<string | null>(null)
  const [mobileImage3Preview, setMobileImage3Preview] = useState<string | null>(null)
  const [mobileImage4Preview, setMobileImage4Preview] = useState<string | null>(null)
  const [logoImagePreview, setlogoImagePreview] = useState<string | null>(null)

  const backgroundImageRef = useRef<HTMLInputElement>(null)
  const mobileImage2Ref = useRef<HTMLInputElement>(null)
  const mobileImage3Ref = useRef<HTMLInputElement>(null)
  const mobileImage4Ref = useRef<HTMLInputElement>(null)
  const logoImageRef = useRef<HTMLInputElement>(null)

  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  const previewSetters: Record<ImageFieldKey, React.Dispatch<React.SetStateAction<string | null>>> = {
    backgroundImage: setbackgroundImagePreview,
    mobileImage2: setMobileImage2Preview,
    mobileImage3: setMobileImage3Preview,
    mobileImage4: setMobileImage4Preview,
    logoImage: setlogoImagePreview,
  }

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
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }

  const triggerInput = (ref: React.RefObject<HTMLInputElement>) => () => ref.current?.click()

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.title1.trim()) newErrors.title1 = "Title 1 is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const session = useSession();
    const token = (session?.data?.user as { token: string })?.token

  useEffect(() => {
    const fetchAchieveMockupData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/achieve`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await response.json()

        if (data) {
          setFormData({
            title1: data.title1 || "",
            title2: data.title2 || "",
            backgroundImage: null,
            mobileImage2: null,
            mobileImage3: null,
            mobileImage4: null,
            logoImage: null,
          })

          setEditingId(data.id)

          if (data.back_img) setbackgroundImagePreview(data.back_img)
          if (data.mbl_img1) setMobileImage2Preview(data.mbl_img1)
          if (data.mbl_img2) setMobileImage3Preview(data.mbl_img2)
          if (data.mbl_img3) setMobileImage4Preview(data.mbl_img3)
          if (data.logo_img) setlogoImagePreview(data.logo_img)
        }
      } catch (err) {
        console.error("Error loading Achieve mockup data", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAchieveMockupData()
  }, [token])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const formPayload = new FormData()
    formPayload.append("title1", formData.title1)
    formPayload.append("title2", formData.title2)

    if (formData.backgroundImage) formPayload.append("back_img", formData.backgroundImage)
    if (formData.mobileImage2) formPayload.append("mbl_img1", formData.mobileImage2)
    if (formData.mobileImage3) formPayload.append("mbl_img2", formData.mobileImage3)
    if (formData.mobileImage4) formPayload.append("mbl_img3", formData.mobileImage4)
    if (formData.logoImage) formPayload.append("logo_img", formData.logoImage)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/achieve`, {
        method: editingId ? "POST" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formPayload,
      })

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      const result = await response.json()
      console.log("Form data submitted successfully:", result)

      // setFormData({
      //   title1: "",
      //   title2: "",
      //   backgroundImage: null,
      //   mobileImage2: null,
      //   mobileImage3: null,
      //   mobileImage4: null,
      //   logoImage: null,
      // })

      // setbackgroundImagePreview(null)
      // setMobileImage2Preview(null)
      // setMobileImage3Preview(null)
      // setMobileImage4Preview(null)
      // setlogoImagePreview(null)

      alert("Mobile mockup submitted successfully!")
    } catch (error) {
      console.error("Error submitting mobile mockup:", error)
      alert("Failed to submit the form. Check the console for errors.")
    }
  }
  

  const renderImageInput = (
    label: string,
    inputId: ImageFieldKey,
    inputRef: React.RefObject<HTMLInputElement>,
    triggerFn: () => void,
    preview: string | null,
    error: string | undefined
  ) => (
    <div className="space-y-2">
      <Label htmlFor={inputId}>{label}</Label>
      <input
        type="file"
        id={inputId}
        ref={inputRef}
        onChange={createImagePreviewHandler(inputId, previewSetters[inputId], inputId)}
        accept="image/*"
        className="hidden"
      />
      <div
        onClick={triggerFn}
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
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
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )

  if (loading) {
    return <div>Loading...</div>;
  } 
  
  return (
    <div className="pb-10">
      <h1 className="text-2xl font-bold mb-6">Achieve section area</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {renderImageInput("Upload Background image", "backgroundImage", backgroundImageRef, triggerInput(backgroundImageRef), backgroundImagePreview, errors.backgroundImage)}
            {renderImageInput("Upload mobile image 1", "mobileImage2", mobileImage2Ref, triggerInput(mobileImage2Ref), mobileImage2Preview, errors.mobileImage2)}
            {renderImageInput("Upload mobile image 2", "mobileImage3", mobileImage3Ref, triggerInput(mobileImage3Ref), mobileImage3Preview, errors.mobileImage3)}
            {renderImageInput("Upload mobile image 3", "mobileImage4", mobileImage4Ref, triggerInput(mobileImage4Ref), mobileImage4Preview, errors.mobileImage4)}
          </div>

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

        <div>
          {renderImageInput("Upload Logo image", "logoImage", logoImageRef, triggerInput(logoImageRef), logoImagePreview, errors.logoImage)}
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

