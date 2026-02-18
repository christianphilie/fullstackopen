import { useState } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import { useAuth } from '../hooks/useAuth'

const AuthView = () => {
  const [showSignup, setShowSignup] = useState(false)
  const { handleLogin, handleSignup } = useAuth()

  if (showSignup) {
    return (
      <>
        <SignupForm handleSignup={handleSignup} onSuccess={() => setShowSignup(false)} />
        <button onClick={() => setShowSignup(false)}>back to login</button>
      </>
    )
  }

  return (
    <>
      <LoginForm handleLogin={handleLogin} />
      <button onClick={() => setShowSignup(true)}>sign up</button>
    </>
  )
}

export default AuthView
