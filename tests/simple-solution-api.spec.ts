// THIS IS SANDBOX NO NEED TO CODE REVIEW!!!

import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { OrderDTO } from './dto/order-dto'
import { LoginDtoWithDotEnv } from './dto/login-dto'

const testOrderUrl = 'https://backend.tallinn-learning.ee/test-orders'
const orderUrl = 'https://backend.tallinn-learning.ee/orders'
const ORDER_STATUS_OPEN = 'OPEN'
const TEST_CUSTOMER_NAME = 'Alex Test'
const TEST_CUSTOMER_PHONE = '555-5555'
const loginUrl = 'https://backend.tallinn-learning.ee/login/student'

test('get order with correct id should receive code 200', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get(testOrderUrl + '/1')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check if the response status is 200
  expect.soft(response.status()).toBe(200)
})

test('get order with incorrect id should receive code 400', async ({ request }) => {
  const response = await request.get(testOrderUrl + '/11')
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  expect.soft(response.status()).toBe(400)
})

test('post order with correct data should receive code 200', async ({ request }) => {
  // prepare request body
  // Using dto now
  const requestBody = new OrderDTO('OPEN')
  // Send a POST request to the server
  const response = await request.post(testOrderUrl, {
    data: requestBody,
  })
  const responseBody = await response.json()
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.status).toBe(ORDER_STATUS_OPEN)
  expect.soft(responseBody.customerName).toBe(TEST_CUSTOMER_NAME)
  expect.soft(responseBody.customerPhone).toBe(TEST_CUSTOMER_PHONE)
})

test('post order with incorrect payload should receive code 400', async ({ request }) => {
  // prepare request body
  const requestBody = {
    status: 'CLOSED',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }

  const response = await request.post(testOrderUrl, {
    data: requestBody,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('student receive token then create order returns order details and 200', async ({
  request,
}) => {
  const loginData = new LoginDtoWithDotEnv()
  const loginResponse = await request.post(loginUrl, {
    data: loginData,
  })
  const jwt = await loginResponse.text()
  console.log('jwt:', jwt)

  const postOrderResponse = await request.post(orderUrl, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    data: new OrderDTO(ORDER_STATUS_OPEN),
  })
  const postOrderResponseBody = await postOrderResponse.json()
  console.log('response body:', postOrderResponseBody)
  expect.soft(postOrderResponse.status()).toBe(StatusCodes.OK)
  expect.soft(postOrderResponseBody.status).toBe(ORDER_STATUS_OPEN)
  expect.soft(postOrderResponseBody.customerName).toBe(TEST_CUSTOMER_NAME) // data is taken from const above
  expect.soft(postOrderResponseBody.customerPhone).toBe(TEST_CUSTOMER_PHONE)

  const orderId = postOrderResponseBody.id

  const getOrderResponse = await request.get(orderUrl + '/' + orderId, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  const getOrderResponseBody = await getOrderResponse.json()

  console.log('response body:', getOrderResponseBody)
  expect.soft(getOrderResponse.status()).toBe(StatusCodes.OK)
  expect.soft(getOrderResponseBody.id).toBe(orderId)
})
