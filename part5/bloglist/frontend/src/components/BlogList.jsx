import Blog from './Blog'

const BlogList = ({ blogs, handleLike, handleDelete, user }) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <>
      <h2>all blogs</h2>
      {sortedBlogs.map(blog => (
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} user={user} />
      ))}
    </>
  )
}

export default BlogList