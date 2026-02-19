import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state =>
    [...state.anecdotes]
      .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => b.votes - a.votes)
  )

  const vote = (id, content) => {
    dispatch(voteForAnecdote(id))
    dispatch(showNotification(`you voted for '${content}'`, 5))
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