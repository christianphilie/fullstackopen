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
      {blog.title} <button onClick={toggleExpanded}>{expanded ? 'hide' : 'view'}</button>
      {expanded && (
        <>
          <p>
            author: {blog.author}<br />
            url: <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a><br />
            likes: {blog.likes} <button onClick={onLike}>like</button><br />
            added by: {blog.user.name} (@{blog.user.username})<br />
          </p>
          {blog.user.id === user.id && <button onClick={onDelete}>delete</button>}
        </>
      
    )}
    </div>
  )
}

export default Blog