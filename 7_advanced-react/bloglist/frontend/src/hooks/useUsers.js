import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

export const useUsers = () => {
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getAll(),
  })

  return {
    users: usersQuery.data || [],
    isLoading: usersQuery.isLoading,
    error: usersQuery.error,
  }
}
