import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
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
})