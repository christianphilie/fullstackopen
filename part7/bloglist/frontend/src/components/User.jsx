const User = ({ user }) => {
  return (
    user && (
      <div className="container-main">
        <div className="card">
          <h1>{user.name}</h1>
          <p className="text-sm text-slate-500 mb-6">@{user.username}</p>

          <h2 className="mb-3">Blogs</h2>
          {user.blogs && user.blogs.length > 0 ? (
            <ul className="space-y-1 text-sm">
              {user.blogs.map((blog) => (
                <li key={blog.id} className="py-2 border-b border-slate-100 last:border-0">
                  {blog.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-400">No blogs yet</p>
          )}
        </div>
      </div>
    )
  )
}

export default User
