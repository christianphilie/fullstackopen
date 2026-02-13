import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

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
        content: action.payload.content, 
        id: action.payload.id, 
        votes: 0 }]
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  } 
})

const { createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(anecdote)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const { voteFor } = anecdoteSlice.actions
export default anecdoteSlice.reducer
