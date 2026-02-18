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
    <>
      <h2>sign up for application</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              name="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            name
            <input
              type="text"
              value={name}
              name="name"
              onChange={({ target }) => setName(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              name="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">sign up</button>
      </form>
    </>
  )
}

export default SignupForm
