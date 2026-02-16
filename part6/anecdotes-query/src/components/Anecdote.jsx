import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAnecdote, deleteAnecdote } from '../requests'

const Anecdote = ({ anecdote }) => {
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'], 
        anecdotes.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a)
      )
    }
  })

  const onVote = () => {
    updateAnecdoteMutation.mutate({ 
      ...anecdote, 
      votes: anecdote.votes + 1 
    })
  }

  const deleteAnecdoteMutation = useMutation({
    mutationFn: deleteAnecdote,
    onSuccess: (_, id) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'], 
        anecdotes.filter(a => a.id !== id)
      )
    }
  })

  const onDelete = () => {
    deleteAnecdoteMutation.mutate(anecdote.id)
  }

  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes} <button onClick={() => onVote(anecdote)}>vote</button>
        <button onClick={() => onDelete(anecdote)}>delete</button>
      </div>
    </>
  )
}

export default Anecdote