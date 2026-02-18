import BlogListItem from './BlogListItem'

const BlogList = ({ blogs, children }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>all blogs</h2>
      {children}
      {sortedBlogs.map((blog) => (
        <BlogListItem key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
