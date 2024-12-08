import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <ul className="flex justify-between items-center">
          <li>
            <Link to="/" className="text-xl font-bold text-gray-800">
              MindfulAI
            </Link>
          </li>
          <li className="flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link>
            <Link to="/features" className="text-gray-600 hover:text-gray-800">Features</Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-800">About</Link>
            <Link to="/signin" className="text-gray-600 hover:text-gray-800">Sign In</Link>
            <Link to="/signup" className="text-gray-600 hover:text-gray-800">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

