import BlogListItem from './BlogListItem'

const BlogList = ({ blogs, children }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div className="container-main">
      <h1 className="mb-4">All Blogs</h1>
      <div className="mb-6">{children}</div>
      <div className="card">
        {sortedBlogs.map((blog) => (
          <BlogListItem key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

export default BlogList
