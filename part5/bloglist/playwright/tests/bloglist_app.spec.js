const { test, expect, beforeEach, describe } = require('@playwright/test')

import { loginWith, createBlog } from './helper'
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
      await createBlog(page, 'Test Blog', 'Test Author', 'https://test.com')

      const blogListSection = page.getByRole('heading', { name: 'all blogs' }).locator('..')
      await expect(blogListSection.getByText('Test Blog')).toBeVisible()
      await expect(blogListSection.getByText(/Test Author/)).toBeVisible()
    })
  })

  describe('after a blog is created', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await createBlog(page, 'Test Blog', 'Test Author', 'https://test.com')
    })

    test('a blog can be liked', async ({ page }) => {
      const blogElement = page.getByText('Test Blog').locator('..')
      
      await blogElement.getByRole('button', { name: 'view' }).click()
      await blogElement.getByRole('button', { name: 'like' }).click()
      await expect(blogElement.getByText('likes: 1')).toBeVisible()
    })
  })
})