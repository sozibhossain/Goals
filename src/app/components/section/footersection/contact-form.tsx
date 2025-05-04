"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

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

      // Show success alert
      alert("Thank you for reaching out! We appreciate your message and will get back to you shortly.")

      // Reset form
      setFormData({
        name: "",
        number: "",
        email: "",
        message: ""
      })

    } catch  {
      // Show error alert
      alert("There was an error sending your message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          className="bg-white border-gray-200"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Input
          type="tel"
          name="number"
          placeholder="Phone Number"
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
          required
        />
      </div>
      <div>
        <Textarea
          name="message"
          placeholder="Message"
          className="bg-white border-gray-200"
          value={formData.message}
          onChange={handleChange}
          required
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
  )
}