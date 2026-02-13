import { createSlice, current } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteFor(state, action) {
      const id = action.payload
      return state.map(anecdote => anecdote.id === id
        ? { ...anecdote, votes: anecdote.votes + 1 }
        : anecdote)
    },
    createAnecdote(state, action) {
      return [...state, {
        content: action.payload, 
        id: getId(), 
        votes: 0 }]
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  } 
})

export const { voteFor, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
