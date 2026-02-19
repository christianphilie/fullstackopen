const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, logout, createBlog, getBlogListSection } = require('./helper')

describe('bloglist app', () => {

  let blogListSection
  let blogElement
  const testBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://test.com'
  }
  
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        username: 'mluukkai',
        password: 'salainen',
        name: 'Matti Luukkainen'
      }
    })

    await page.goto('/')
  })

  test('login form is shown', async ({ page }) => {
    const locator = page.getByText('log in to application')
    await expect(locator).toBeVisible()
  })

  describe('login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('logout')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'wrong', 'wrong')
      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('username or password')
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created and is listed in the blog list', async ({ page }) => {
      await createBlog(page, testBlog.title, testBlog.author, testBlog.url)

      blogListSection = await getBlogListSection(page)
      await expect(blogListSection.getByText('Test Blog')).toBeVisible()
      await expect(blogListSection.getByText(/Test Author/)).toBeVisible()
    })
  })

  describe('after a blog is created', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await createBlog(page, testBlog.title, testBlog.author, testBlog.url)
    })

    test('a blog can be liked', async ({ page }) => {
      blogListSection = await getBlogListSection(page)
      blogElement = blogListSection.getByText(testBlog.title).locator('..')

      await blogElement.getByRole('button', { name: 'view' }).click()
      await blogElement.getByRole('button', { name: 'like' }).click()

      await expect(blogListSection.getByText('likes: 1')).toBeVisible()
    })

    test('user who added the blog can delete it', async ({ page }) => {
      blogListSection = await getBlogListSection(page)
      blogElement = blogListSection.getByText(testBlog.title).locator('..')

      await blogElement.getByRole('button', { name: 'view' }).click()
      page.once('dialog', dialog => dialog.accept())
      await blogElement.getByRole('button', { name: 'delete' }).click()

      await expect(blogListSection.getByText(testBlog.title)).not.toBeVisible()
    })

    test('only the user who added the blog sees the delete button', async ({ page, request }) => {
      await logout(page)

      await request.post('/api/users', {
        data: { username: 'otheruser', password: 'secret', name: 'Other User' }
      })
      await loginWith(page, 'otheruser', 'secret')

      blogListSection = await getBlogListSection(page)
      blogElement = blogListSection.getByText(testBlog.title).locator('..')

      await blogElement.getByRole('button', { name: 'view' }).click()

      await expect(blogElement.getByRole('button', { name: 'delete' })).not.toBeVisible()
    })
  })

  describe('blog ordering by likes', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('blogs are arranged by likes with most likes first', async ({ page }) => {
      test.slow()

      await createBlog(page, 'Blog With No Likes', 'Author A', 'https://a.com')
      await createBlog(page, 'Blog With Most Likes', 'Author B', 'https://b.com')
      await createBlog(page, 'Blog With Few Likes', 'Author C', 'https://c.com')

      blogListSection = await getBlogListSection(page)

      const likeBlog = async (title, times) => {
        const blog = blogListSection.getByText(title).locator('..')
        await blog.getByRole('button', { name: 'view' }).click()
        for (let i = 0; i < times; i++) {
          await blog.getByRole('button', { name: 'like' }).click()
          await blog.getByText('likes: ' + (i + 1)).waitFor()
        }
      }

      await likeBlog('Blog With Most Likes', 3)
      await likeBlog('Blog With Few Likes', 1)
      await likeBlog('Blog With No Likes', 0)

      const blogTitles = blogListSection.locator('.blog-title')
      await expect(blogTitles.nth(0)).toHaveText('Blog With Most Likes')
      await expect(blogTitles.nth(1)).toHaveText('Blog With Few Likes')
      await expect(blogTitles.nth(2)).toHaveText('Blog With No Likes')
    })
  })
})