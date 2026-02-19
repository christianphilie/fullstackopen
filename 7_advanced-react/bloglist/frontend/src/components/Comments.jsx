import { useState } from 'react'
import { useBlogs } from '../hooks/useBlogs'
import { useNotification } from '../hooks/useNotification'

const Comments = ({ blog }) => {
  const [comment, setComment] = useState('')

  const { addComment } = useBlogs()
  const { notifyWith } = useNotification()

  const handleComment = (event) => {
    event.preventDefault()
    addComment(
      { blog, comment },
      {
        onSuccess: (newComment) => {
          notifyWith(`Comment "${newComment.comments[newComment.comments.length - 1]}" added`)
          setComment('')
        },
        onError: (error) => {
          console.log('error adding comment', error)
          notifyWith('Failed to add comment', true)
        },
      }
    )
  }

  return (
    <div className="space-y-3">
      <form onSubmit={handleComment} className="flex gap-2">
        <input
          type="text"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          className="form-input flex-1"
          placeholder="Add a comment..."
        />
        <button type="submit" className="btn-secondary text-xs">
          Add
        </button>
      </form>
      {blog.comments && blog.comments.length > 0 ? (
        <ul className="text-sm">
          {blog.comments.map((comment) => (
            <li
              key={comment}
              className="py-2 border-b border-slate-100 last:border-0 text-slate-700"
            >
              {comment}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-400">No comments yet</p>
      )}
    </div>
  )
}

export default Comments
