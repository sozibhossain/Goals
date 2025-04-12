import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  return (
    <form className="space-y-4">
      <div>
        <Input type="text" placeholder="Name" className="bg-white border-gray-200" />
      </div>
      <div>
        <Input type="tel" placeholder="Number" className="bg-white border-gray-200" />
      </div>
      <div>
        <Input type="email" placeholder="Email" className="bg-white border-gray-200" />
      </div>
      <div>
        <Textarea placeholder="Message" className="bg-white border-gray-200" />
      </div>
      <Button className="w-full bg-black hover:bg-gray-800">Submit</Button>
    </form>
  )
}
