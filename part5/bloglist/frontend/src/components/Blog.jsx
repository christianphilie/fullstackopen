import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const onLike = () => {
    handleLike(blog)
  }

  const onDelete = () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      handleDelete(blog)
    }
  }

  const blogStyle = {
    padding: 10,
    border: 'solid 1px',
    borderRadius: 5,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <span className="blog-title">{blog.title}</span> <span className="blog-author">(by {blog.author})</span> <button onClick={toggleExpanded}>{expanded ? 'hide' : 'view'}</button>
      {expanded && (
        <>
          <p>
            url: <span className="blog-url"><a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a></span><br />
            likes: <span className="blog-likes">{blog.likes} <button className="blog-like-button" onClick={onLike}>like</button></span><br />
            added by: <span className="blog-added-by">{blog.user.name} (@{blog.user.username})</span><br />
          </p>
          {blog.user.id === user.id && <button className="blog-delete-button" onClick={onDelete}>delete</button>}
        </>
      )}
    </div>
  )
}

export default Blog