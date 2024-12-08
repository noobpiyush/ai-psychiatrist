import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData.email, formData.password)

    const response = await axios.post("https://backend.100xprojects.online/api/v1/user/signin", formData)
      

    if (response.status != 201) {
        alert("something went wrong");
        return;
    }

    localStorage.setItem('token', response.data.token);

    alert("you are logged in");

    navigate('/chat');

  }
  return (
    <div className="container mx-auto px-6 py-12">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">Sign In</Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

