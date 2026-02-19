import { useState } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import { useAuth } from '../hooks/useAuth'

const AuthView = () => {
  const [showSignup, setShowSignup] = useState(false)
  const { handleLogin, handleSignup } = useAuth()

  if (showSignup) {
    return (
      <div className="container-main">
        <div className="max-w-md mx-auto mt-12">
          <SignupForm handleSignup={handleSignup} onSuccess={() => setShowSignup(false)} />
          <button onClick={() => setShowSignup(false)} className="btn-secondary w-full mt-4">
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container-main">
      <LoginForm handleLogin={handleLogin} />
      <div className="max-w-md mx-auto mt-4 text-center">
        <button
          onClick={() => setShowSignup(true)}
          className="text-slate-600 hover:text-slate-800 hover:underline"
        >
          Don't have an account? Sign up
        </button>
      </div>
    </div>
  )
}

export default AuthView
