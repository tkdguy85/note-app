import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import api from '../api'
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants'

function ProtectedRoute({children}) {
  const [isAuthorized, setIsAuthorized] = useState(null)

  // Calls auth function
  useEffect(() => { 
    auth().catch(() => setIsAuthorized(false))
  }, [])


  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN)
    
    try {
      // Sends req to the BE with the refresh token to get a new access token
      const res = await api.post('/api/token/refresh/', {
        refresh: refreshToken
      })
      
      if (res.status === 200 ) {
        // Update the ACCESS_TOKEN var in local storage
        localStorage.setItem(ACCESS_TOKEN, res.data.access)
        setIsAuthorized(true)
      } else {
        setIsAuthorized(false)
      }
    
    } catch (error) {
      console.log(error)
      setIsAuthorized(false)
    }
  }

  const auth = async () => {
    // Check for token
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (!token) {
      setIsAuthorized(false)
      return
    }
    const decoded = jwtDecode(token)
    const tokenExpiration = decoded.exp
    const now = Date.now() / 1000 // Grabs today's date and returns it in seconds

    if (tokenExpiration < now) {
      await refreshToken() 
    } else {
      setIsAuthorized(true)
    }
  }

  if (isAuthorized === null) {
    return <div>Loading...</div>
  }

  return isAuthorized ? children : <Navigate to='/login' />
}

export default ProtectedRoute
