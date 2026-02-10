import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://test.com',
    likes: 555,
    user: {
      id: '123',
      name: 'Test User',
      username: 'testuser'
    }
  }

  const mockUser = { id: '123' }

  const defaultProps = {
    blog: mockBlog,
    user: mockUser,
    handleLike: vi.fn(),
    handleDelete: vi.fn()
  }

  test('renders blog title and author but not url and likes by default', () => {
    render(<Blog {...defaultProps} />)

    expect(screen.getByText('Test Blog')).toBeInTheDocument()
    expect(screen.getByText(/Test Author/)).toBeInTheDocument()

    expect(screen.queryByText('https://test.com')).not.toBeInTheDocument()
    expect(screen.queryByText(/555/)).not.toBeInTheDocument()
  })

  test('shows url and likes when view button is clicked', async () => {
    render(<Blog {...defaultProps} />)

    const viewButton = screen.getByText('view')
    await userEvent.click(viewButton)

    await waitFor(() => {
      expect(screen.getByText('https://test.com')).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(screen.getByText(/555/)).toBeInTheDocument()
    })
  })

  test('the like counter is incremented by 2 when the like button is clicked twice', async () => {
    render(<Blog {...defaultProps} />)

    const viewButton = screen.getByText('view')
    await userEvent.click(viewButton)

    const likeButton = screen.getByText('like')
    await userEvent.click(likeButton)
    await userEvent.click(likeButton)

    expect(defaultProps.handleLike).toHaveBeenCalledTimes(2)
  })

  test('the delete button is not shown when the blog is not owned by the user', async () => {
    const user = { id: '456' }
    render(<Blog {...defaultProps} user={user} />)

    const viewButton = screen.getByText('view')
    await userEvent.click(viewButton)

    expect(screen.queryByText('delete')).not.toBeInTheDocument()
  })

  test('the delete handler is called when the delete button is clicked and the user confirms the deletion', async () => {
    render(<Blog {...defaultProps} />)

    const viewButton = screen.getByText('view')
    await userEvent.click(viewButton)

    const deleteButton = screen.getByText('delete')
    window.confirm = vi.fn(() => true)
    await userEvent.click(deleteButton)

    expect(defaultProps.handleDelete).toHaveBeenCalledWith(mockBlog)
  })

  test('the delete handler is not called when the delete button is clicked and the user cancels the deletion', async () => {
    render(<Blog {...defaultProps} />)

    const viewButton = screen.getByText('view')
    await userEvent.click(viewButton)

    const deleteButton = screen.getByText('delete')
    window.confirm = vi.fn(() => false)
    await userEvent.click(deleteButton)

    expect(defaultProps.handleDelete).not.toHaveBeenCalled()
  })
})