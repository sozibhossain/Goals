"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contactMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      // Show success toast
      toast.success("Thank you for reaching out! We appreciate your message and will get back to you shortly.")

      // Reset form
      setFormData({
        name: "",
        number: "",
        email: "",
        message: ""
      })

    } catch {
      // Show error toast
      toast.error("Failed to send message. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            className="bg-white border-gray-200"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <Input
            type="tel"
            name="number"
            placeholder="Phone Number (optional)"
            className="bg-white border-gray-200"
            value={formData.number}
            onChange={handleChange}
          />
        </div>
        <div>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="bg-white border-gray-200"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <Textarea
            name="message"
            placeholder="Message"
            className="bg-white border-gray-200"
            value={formData.message}
            onChange={handleChange}
            rows={5}
          />
        </div>
        <Button 
          type="submit" 
          className="w-full bg-black hover:bg-gray-800"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Submit"}
        </Button>
      </form>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}