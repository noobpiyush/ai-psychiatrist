import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function Contact() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
      <div className="max-w-md mx-auto">
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Name</label>
            <Input type="text" id="name" placeholder="Your name" required />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <Input type="email" id="email" placeholder="your@email.com" required />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">Message</label>
            <Textarea id="message" placeholder="Your message" rows={4} required />
          </div>
          <Button type="submit" className="w-full">Send Message</Button>
        </form>
      </div>
    </div>
  )
}

