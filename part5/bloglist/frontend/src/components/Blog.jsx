const Blog = ({ blog }) => (
  <li key={blog.id}>
    <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.title}</a> (by {blog.author})
  </li>  
)

export default Blog