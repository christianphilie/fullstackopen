import { Link } from 'react-router-dom'

const BlogListItem = ({ blog }) => {
  const blogItemStyle = {
    padding: 10,
    border: 'solid 1px',
    borderRadius: 5,
    marginTop: 5,
  }

  return (
    <div style={blogItemStyle}>
      <Link to={`/blogs/${blog.id}`}>
        <span className="blog-title">{blog.title}</span>
      </Link>{' '}
      <span className="blog-author">(by {blog.author})</span>
    </div>
  )
}

export default BlogListItem
