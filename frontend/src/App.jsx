import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"

// Logout Logic
function Logout() {
  localStorage.clear()
  return <Navigate to='/login'/>
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register/>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/'
          element={
            // Navigation to home only possible with access token
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        {/* Navigation to function defined routes */}
        <Route path='/login' element={<Login />}/>
        <Route path='/logout' element={<Logout />}/>
        <Route path='/register' element={<RegisterAndLogout />}/>
        {/* 404 Page */}
        <Route path='*' element={<NotFound />}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
