import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const updated = action.payload
      return state.map(a => a.id === updated.id ? updated : a)
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

const { createAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions

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

export const voteForAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes.find(a => a.id === id)
    const updated = await anecdoteService.update(id, {
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch(updateAnecdote(updated))
  }
}

export default anecdoteSlice.reducer
