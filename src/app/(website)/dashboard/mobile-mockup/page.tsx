"use client"

import { useState, useRef, type ChangeEvent, type FormEvent, useEffect } from "react"
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
  title3: string
  appstorelink?: string
  googoleplaylink?: string
  loginlink?: string
  backgroundImage: File | null
  mobileImage2: File | null
  mobileImage3: File | null
}

interface FormErrors {
  title1?: string
  title2?: string
  title3?: string
  backgroundImage?: string
  mobileImage2?: string
  mobileImage3?: string
}

export default function Page() {
  const [formData, setFormData] = useState<FormData>({
    backgroundColor: "",
    title1: "",
    title2: "",
    title3: "",
    backgroundImage: null,
    mobileImage2: null,
    mobileImage3: null,
  })

  const [selectedColor, setSelectedColor] = useState<string>("")
  const [errors, setErrors] = useState<FormErrors>({})
  const [backgroundImagePreview, setbackgroundImagePreview] = useState<string | null>(null)
  const [mobileImage2Preview, setMobileImage2Preview] = useState<string | null>(null)
  const [mobileImage3Preview, setMobileImage3Preview] = useState<string | null>(null)

  const backgroundImageRef = useRef<HTMLInputElement>(null)
  const mobileImage2Ref = useRef<HTMLInputElement>(null)
  const mobileImage3Ref = useRef<HTMLInputElement>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    setFormData((prev) => ({ ...prev, backgroundColor: color }))
  }

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    imageKey: keyof FormData,
    setPreview: (preview: string | null) => void,
    errorKey: keyof FormErrors
  ) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, [imageKey]: file }))

    if (errors[errorKey]) {
      setErrors((prev) => ({ ...prev, [errorKey]: undefined }))
    }

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.title1.trim()) newErrors.title1 = "Title 1 is required"
    if (!formData.title2.trim()) newErrors.title2 = "Title 2 is required"
    if (!formData.title3.trim()) newErrors.title3 = "Title 3 is required"
    if (!formData.backgroundImage) newErrors.backgroundImage = "Mobile image 1 is required"
    if (!formData.mobileImage2) newErrors.mobileImage2 = "Mobile image 2 is required"
    if (!formData.mobileImage3) newErrors.mobileImage3 = "Mobile image 3 is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzQ0NzgzODk5LCJleHAiOjE3NDQ3ODc0OTksIm5iZiI6MTc0NDc4Mzg5OSwianRpIjoiamdjYmdOVElQY1JIaEFOaCIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.dcNhcXoB5_B6RWMPgZRYvwTqO15i7zl-Afi5RBi8tXc";


  

  useEffect(() => {
    const fetchMobileMockupData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobilemockup`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
  
        if (data) {
          const mobilemockup = data;
          console.log("mobilemockup", mobilemockup);
  
          setFormData({
            backgroundColor: mobilemockup.color || "",
            title1: mobilemockup.title1 || "",
            title2: mobilemockup.title2 || "",
            title3: mobilemockup.title3 || "",
            backgroundImage: null,
            mobileImage2: null,
            mobileImage3: null,
          });
  
          setEditingId(mobilemockup.id);
          setSelectedColor(mobilemockup.color || "");
  
          if (mobilemockup.back_img) {
            setbackgroundImagePreview(mobilemockup.back_img);
          }
          if (mobilemockup.mbl_img1) {
            setMobileImage2Preview(mobilemockup.mbl_img1);
          }
          if (mobilemockup.mbl_img2) {
            setMobileImage3Preview(mobilemockup.mbl_img2);
          }
        }
      } catch (err) {
        console.error("Error loading mobilemockup data", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchMobileMockupData();
  }, []);
  
  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    // Validate the form before submitting
    if (!validateForm()) {
      console.warn("Form has validation errors");
      return;
    }
  
    // Prepare form payload using FormData
    const formPayload = new FormData();
    formPayload.append("background_color", formData.backgroundColor);
    formPayload.append("title", formData.title1);
    formPayload.append("subtitle", formData.title2);
    formPayload.append("title3", formData.title3);
  
    // Add image files to the payload if they exist
    if (formData.backgroundImage) formPayload.append("img1", formData.backgroundImage);
    if (formData.mobileImage2) formPayload.append("img2", formData.mobileImage2);
    if (formData.mobileImage3) formPayload.append("img3", formData.mobileImage3);
  
    try {
      // Construct the appropriate API URL based on whether we're editing or creating
      const url = editingId
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobilemockup/${editingId}`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobilemockup`;
  
      // Send the request to the backend
      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",  // Use PUT if editing an existing record
        headers: {
          Authorization: `Bearer ${token}`,  // Authorization header
        },
        body: formPayload,  // Attach form data as the body
      });
  
      // Check for a successful response
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
      const result = await response.json();
      console.log("Form submitted successfully:", result);
      alert("Mobile Mockup data saved successfully!");
  
      // Clear the form after successful submission
      setFormData({
        backgroundColor: "",
        title1: "",
        title2: "",
        title3: "",
        backgroundImage: null,
        mobileImage2: null,
        mobileImage3: null,
      });
  
      // Clear the preview images and other states
      setEditingId(null);
      setbackgroundImagePreview(null);
      setMobileImage2Preview(null);
      setMobileImage3Preview(null);
      setSelectedColor("");
  
    } catch (err) {
      console.error("Form submission error:", err);
      alert("Failed to submit Mobile Mockup. Check console for details.");
    }
  };
  
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="pb-10">
      <h1 className="text-2xl font-bold mb-6">Mobile Mockup</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label>Background Color</Label>
          <ColorPicker
            selectedColor={selectedColor}
            onColorChange={handleColorChange}
            previousColor={formData.backgroundColor}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Background Image */}
          <div className="space-y-2">
            <Label htmlFor="backgroundImage">Left section Background image</Label>
            <input
              type="file"
              id="backgroundImage"
              ref={backgroundImageRef}
              onChange={(e) => handleImageChange(e, "backgroundImage", setbackgroundImagePreview, "backgroundImage")}
              accept="image/*"
              className="hidden"
            />
            <div
              onClick={() => backgroundImageRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            >
              {backgroundImagePreview ? (
                <div className="space-y-2">
                  <Image
                    src={backgroundImagePreview}
                    alt="Mobile Preview 1"
                    className="max-h-40 mx-auto object-contain"
                    width={200}
                    height={200}
                  />
                  <p className="text-sm text-gray-500">Click to change image</p>
                </div>
              ) : (
                <div className="py-4 flex flex-col items-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload image</p>
                </div>
              )}
            </div>
            {errors.backgroundImage && <p className="text-sm text-red-500 mt-1">{errors.backgroundImage}</p>}
          </div>

          {/* Mobile Image 2 */}
          <div className="space-y-2">
            <Label htmlFor="mobileImage2">Upload mobile image 1</Label>
            <input
              type="file"
              id="mobileImage2"
              ref={mobileImage2Ref}
              onChange={(e) => handleImageChange(e, "mobileImage2", setMobileImage2Preview, "mobileImage2")}
              accept="image/*"
              className="hidden"
            />
            <div
              onClick={() => mobileImage2Ref.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            >
              {mobileImage2Preview ? (
                <div className="space-y-2">
                  <Image
                    src={mobileImage2Preview}
                    alt="Mobile Preview 2"
                    className="max-h-40 mx-auto object-contain"
                    width={200}
                    height={200}
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
            <Label htmlFor="mobileImage3">Upload mobile image 2</Label>
            <input
              type="file"
              id="mobileImage3"
              ref={mobileImage3Ref}
              onChange={(e) => handleImageChange(e, "mobileImage3", setMobileImage3Preview, "mobileImage3")}
              accept="image/*"
              className="hidden"
            />
            <div
              onClick={() => mobileImage3Ref.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            >
              {mobileImage3Preview ? (
                <div className="space-y-2">
                  <Image
                    src={mobileImage3Preview}
                    alt="Mobile Preview 3"
                    className="max-h-40 mx-auto object-contain"
                    width={200}
                    height={200}
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
        </div>

        {/* Titles */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="title1">Title 1</Label>
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

          <div>
            <Label htmlFor="title2">Title 2</Label>
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

          <div>
            <Label htmlFor="title3">Title 3</Label>
            <Input
              id="title3"
              name="title3"
              type="text"
              value={formData.title3}
              onChange={handleInputChange}
              className={errors.title3 ? "border-red-500" : ""}
            />
            {errors.title3 && <p className="text-sm text-red-500 mt-1">{errors.title3}</p>}
          </div>
        </div>

        {Object.keys(errors).length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Please fix the errors above before submitting the form.</AlertDescription>
          </Alert>
        )}

        <Button type="submit" className="w-full">
          Submit section
        </Button>
      </form>
    </div>
  )
}
