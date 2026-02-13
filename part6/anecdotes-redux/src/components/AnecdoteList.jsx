import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => 
    [...state.anecdotes]
    .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes)
  )

  const vote = id => {
    dispatch(voteFor(id))
  }

  return (
    <div>
      <ul>
        {anecdotes.map(anecdote => (
          <li key={anecdote.id} style={{ marginBottom: 10 }}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes} <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AnecdoteList