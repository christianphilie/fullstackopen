import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => 
    [...state].sort((a, b) => b.votes - a.votes)
  )

  const vote = id => {
    dispatch(voteFor(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;
