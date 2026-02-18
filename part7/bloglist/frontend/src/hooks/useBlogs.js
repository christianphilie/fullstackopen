import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

export const useBlogs = () => {
  const queryClient = useQueryClient()

  const blogsQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll(),
  })

  const createMutation = useMutation({
    mutationFn: (blog) => blogService.create(blog),
    onSuccess: (newBlog) => {
      queryClient.setQueryData(['blogs'], (oldBlogs) => oldBlogs.concat(newBlog))
    },
  })

  const likeMutation = useMutation({
    mutationFn: (blog) => blogService.like(blog),
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(['blogs'], (oldBlogs) =>
        oldBlogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
      )
    },
  })

  const addCommentMutation = useMutation({
    mutationFn: ({ blog, comment }) => blogService.addComment(blog, comment),
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(['blogs'], (oldBlogs) =>
        oldBlogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
      )
    },
  })
  const deleteMutation = useMutation({
    mutationFn: (blog) => blogService.remove(blog),
    onSuccess: (_, deletedBlog) => {
      queryClient.setQueryData(['blogs'], (oldBlogs) =>
        oldBlogs.filter((b) => b.id !== deletedBlog.id)
      )
    },
  })

  return {
    blogs: blogsQuery.data || [],
    isLoading: blogsQuery.isLoading,
    error: blogsQuery.error,
    createBlog: createMutation.mutate,
    likeBlog: likeMutation.mutate,
    addComment: addCommentMutation.mutate,
    deleteBlog: deleteMutation.mutate,
  }
}
