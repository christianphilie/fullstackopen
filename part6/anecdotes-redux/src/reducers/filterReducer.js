import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      console.log('state now: ', state)
      console.log('action', action)
      return action.payload ?? state
    }
  }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer