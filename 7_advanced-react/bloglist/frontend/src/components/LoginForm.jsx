import { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    handleLogin(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <div className="container-main">
      <div className="max-w-md mx-auto mt-12">
        <h1 className="text-center mb-8">Login</h1>
        <form onSubmit={onSubmit} className="card">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              value={username}
              name="username"
              onChange={({ target }) => setUsername(target.value)}
              className="form-input"
              placeholder="Enter your username"
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
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
