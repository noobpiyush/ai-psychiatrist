import {  Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Features from './pages/Features'
import About from './pages/About'
import Contact from './pages/Contact'
import Chat from './pages/Chat'
import SignUp from './pages/Signup'
import SignIn from './pages/Signin'

function App() {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </main>
        <Footer />
      </div>

    </div>
  )
}

export default App

