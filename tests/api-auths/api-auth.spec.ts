import { expect, test } from '@playwright/test'
import { LoginDto } from '../dto/login-dto'
import { StatusCodes } from 'http-status-codes'

const authUrl = 'https://backend.tallinn-learning.ee/login/student'

test('login to a student with incorrect credentials', async ({ request }) => {
  const loginData = new LoginDto('string123', 'string123')
  const response = await request.post(authUrl, {
    data: loginData,
  })
  expect.soft(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('login to a student returns jwt', async ({ request }) => {
  const loginData = LoginDto.createLoginWithCorrectData()
  const response = await request.post(authUrl, {
    data: loginData,
  })

  const responseBody = await response.text()
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody).toBeDefined()
})
