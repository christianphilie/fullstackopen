import Comments from './Comments'

const BlogDetail = ({ blog, handleLike, handleDelete, user }) => {
  const onLike = () => {
    handleLike(blog)
  }

  const onDelete = () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      handleDelete(blog)
    }
  }

  return (
    blog && (
      <div className="container-main">
        <div className="card">
          <h1>{blog.title}</h1>
          <p className="text-sm text-slate-500 mb-6">by {blog.author}</p>

          <div className="space-y-2 text-sm mb-6">
            <div className="flex gap-3 py-2 border-b border-slate-100">
              <span className="w-20 text-slate-500 shrink-0">URL</span>
              <a
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate hover:underline"
              >
                {blog.url}
              </a>
            </div>
            <div className="flex gap-3 py-2 border-b border-slate-100 items-center">
              <span className="w-20 text-slate-500 shrink-0">Likes</span>
              <span className="font-medium">{blog.likes}</span>
              <button className="btn-secondary ml-2 py-1 text-xs" onClick={onLike}>
                Like
              </button>
            </div>
            <div className="flex gap-3 py-2">
              <span className="w-20 text-slate-500 shrink-0">Added by</span>
              <span>
                {blog.user.name} (@{blog.user.username})
              </span>
            </div>
          </div>

          {blog.user.id === user.id && (
            <button className="btn-danger text-xs py-1.5 mb-6" onClick={onDelete}>
              Delete
            </button>
          )}

          <div className="pt-6 border-t border-slate-100">
            <h2 className="mb-4">Comments</h2>
            <Comments blog={blog} />
          </div>
        </div>
      </div>
    )
  )
}

export default BlogDetail
