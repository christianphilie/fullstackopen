import Blog from './Blog'

const BlogList = ({ blogs, handleLike, handleDelete, user, children }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>all blogs</h2>
      {children}
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleDelete={handleDelete}
          user={user}
        />
      ))}
    </div>
  )
}

export default BlogList
