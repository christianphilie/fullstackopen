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
    <>
      <form onSubmit={handleComment}>
        <input type="text" value={comment} onChange={(event) => setComment(event.target.value)} />
        <button type="submit">add comment</button>
      </form>
      {blog.comments && blog.comments.length > 0 ? (
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      ) : (
        <p>no comments yet</p>
      )}
    </>
  )
}

export default Comments
