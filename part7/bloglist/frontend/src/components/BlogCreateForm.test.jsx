import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogCreateForm from './BlogCreateForm'

describe('<BlogCreateForm />', () => {
  test('calls the createBlog handler with the input values when the submit button is clicked', async () => {
    const createBlog = vi.fn()
    render(<BlogCreateForm createBlog={createBlog} />)

    const titleInput = screen.getByLabelText('title')
    const authorInput = screen.getByLabelText('author')
    const urlInput = screen.getByLabelText('url')

    await userEvent.type(titleInput, 'Test Blog')
    await userEvent.type(authorInput, 'Test Author')
    await userEvent.type(urlInput, 'https://test.com')

    const submitButton = screen.getByText('create')
    await userEvent.click(submitButton)

    expect(createBlog).toHaveBeenCalledWith({
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://test.com',
    })
  })
})
