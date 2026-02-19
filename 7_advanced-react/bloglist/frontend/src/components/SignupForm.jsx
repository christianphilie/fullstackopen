import { useState } from 'react'
import { useNotification } from '../hooks/useNotification'

const SignupForm = ({ handleSignup, onSuccess }) => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const { notifyWith } = useNotification()

  const onSubmit = (event) => {
    event.preventDefault()
    handleSignup(username, name, password)
      .then(() => {
        notifyWith('Account created successfully. Please log in.')
        setUsername('')
        setName('')
        setPassword('')
        onSuccess()
      })
      .catch((error) => {
        console.log('error signing up', error)
        const errorMessage = error.response?.data?.error || 'Failed to create account'
        notifyWith(errorMessage, true)
      })
  }

  return (
    <div className="card">
      <h2>Create Account</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
            className="form-input"
            placeholder="Choose a username"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            value={name}
            name="name"
            onChange={({ target }) => setName(target.value)}
            className="form-input"
            placeholder="Your full name"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
            className="form-input"
            placeholder="Enter a password"
          />
        </div>
        <button type="submit" className="btn-primary w-full">
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignupForm
