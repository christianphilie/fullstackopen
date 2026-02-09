import { useState } from 'react'

const Blog = ({ blog, handleLike }) => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const onLike = () => {
    handleLike(blog)
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
      <p>
        author: {blog.author}<br />
        url: <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a><br />
        likes: {blog.likes} <button onClick={onLike}>like</button><br />
      </p>
    )}
    </div>
  )
}

export default Blog