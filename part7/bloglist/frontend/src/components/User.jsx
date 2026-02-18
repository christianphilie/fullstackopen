const User = ({ user }) => {
  return (
    user && (
      <>
        <h2>blogs added by {user.name}</h2>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </>
    )
  )
}

export default User
