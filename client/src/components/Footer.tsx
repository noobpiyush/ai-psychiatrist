export default function Footer() {
    return (
      <footer className="bg-gray-100">
        <div className="container mx-auto px-6 py-4">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} MindfulAI. All rights reserved.
          </p>
        </div>
      </footer>
    )
  }
  
  