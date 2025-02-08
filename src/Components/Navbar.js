import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const username = localStorage.getItem("username")
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate("/auth/login")
  }
  return (
    <nav className="p-4 text-white flex justify-between items-center">
      <span className="text-black">Welcome, {username}</span>
      <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
    </nav>
  )
}

export default Navbar