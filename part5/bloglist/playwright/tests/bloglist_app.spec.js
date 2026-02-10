const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('bloglist app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'mluukkai',
        password: 'salainen',
        name: 'Matti Luukkainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('login form is shown', async ({ page }) => {
    const locator = page.getByText('log in to application')
    await expect(locator).toBeVisible()
  })

  describe('login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('salainen')
      
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('logout')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('wrong')
      await page.getByLabel('password').fill('wrong')

      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('username or password', { exact: false })).toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created and is listed in the blog list', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()

      await page.getByLabel('title').fill('Test Blog')
      await page.getByLabel('author').fill('Test Author')
      await page.getByLabel('url').fill('https://test.com')
      await page.getByRole('button', { name: 'create' }).click()

      const blogListSection = page.getByRole('heading', { name: 'all blogs' }).locator('..')
      await expect(blogListSection.getByText('Test Blog')).toBeVisible()
      await expect(blogListSection.getByText(/Test Author/)).toBeVisible()
    })
  })
})