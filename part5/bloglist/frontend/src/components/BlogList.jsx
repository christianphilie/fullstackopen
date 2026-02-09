import Blog from './Blog'

const BlogList = ({ blogs, handleLike }) => {
  return (
    <>
      <h2>all blogs</h2>  
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} handleLike={handleLike} />
      ))}
    </>
  )
}

export default BlogList