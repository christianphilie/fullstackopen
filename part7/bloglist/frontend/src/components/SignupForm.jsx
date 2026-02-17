const SignupForm = ({
  username,
  name,
  password,
  setUsername,
  setName,
  setPassword,
  handleSignup,
}) => {
  return (
    <>
      <h2>sign up for application</h2>
      <form onSubmit={handleSignup}>
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
