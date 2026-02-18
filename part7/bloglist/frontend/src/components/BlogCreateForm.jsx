import { useState } from 'react'

const BlogCreateForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className="card">
      <h2>Add Blog</h2>
      <form onSubmit={addBlog} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="form-input"
            placeholder="Blog title"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Author</label>
          <input
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            className="form-input"
            placeholder="Author name"
          />
        </div>
        <div className="form-group">
          <label className="form-label">URL</label>
          <input
            type="text"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            className="form-input"
            placeholder="Blog URL"
          />
        </div>
        <button type="submit" className="btn-primary w-full">
          Create
        </button>
      </form>
    </div>
  )
}

export default BlogCreateForm
