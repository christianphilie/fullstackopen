import Blog from './Blog'

const BlogList = ({ blogs }) => {
  return (
    <div>
      <h2>all blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogList