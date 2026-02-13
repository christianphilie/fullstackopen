import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state =>
    [...state.anecdotes]
      .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => b.votes - a.votes)
  )

  const vote = (id, content) => {
    dispatch(voteFor(id))
    dispatch(setNotification(`You voted for "${content}"`))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }

  return (
    <div>
      <ul>
        {anecdotes.map(anecdote => (
          <li key={anecdote.id} style={{ marginBottom: 10 }}>
            <div>{anecdote.content}</div>
            <div>
              votes: {anecdote.votes} <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AnecdoteList