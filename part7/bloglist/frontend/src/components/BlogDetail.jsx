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
      <>
        <h2>{blog.title}</h2>
        <h3>by {blog.author}</h3>
        <p>
          url:{' '}
          <span className="blog-url">
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              {blog.url}
            </a>
          </span>
          <br />
          likes:{' '}
          <span className="blog-likes">
            {blog.likes}{' '}
            <button className="blog-like-button" onClick={onLike}>
              like
            </button>
          </span>
          <br />
          added by:{' '}
          <span className="blog-added-by">
            {blog.user.name} (@{blog.user.username})
          </span>
          <br />
        </p>
        {blog.user.id === user.id && (
          <button className="blog-delete-button" onClick={onDelete}>
            delete
          </button>
        )}
        <h3>comments</h3>
        <Comments blog={blog} />
      </>
    )
  )
}

export default BlogDetail
