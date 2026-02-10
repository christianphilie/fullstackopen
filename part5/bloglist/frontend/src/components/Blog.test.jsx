import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not url and likes by default', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://test.com',
    likes: 10,
    user: {
      name: 'Test User',
      username: 'testuser'
    }
  }

  const { container } = render(<Blog blog={blog} />)

  const title = screen.getByText('Test Blog', { exact: false })
  expect(title).toBeDefined()

  const author = screen.getByText('Test Author', { exact: false })
  expect(author).toBeDefined()

  const url = screen.queryByText('https://test.com')
  expect(url).toBeNull()

  const likes = screen.queryByText('10')
  expect(likes).toBeNull()
})