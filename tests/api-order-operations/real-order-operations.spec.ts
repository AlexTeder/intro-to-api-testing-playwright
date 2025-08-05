import { test } from '../fixtures/real-order-operations-fixture'
import { StatusCodes } from 'http-status-codes'
import { LoginDto, LoginDtoWithDotEnv } from '../dto/login-dto'
import { OrderDTO } from '../dto/order-dto'
import { OrderCustomerData, OrderStatus } from '../../test-data/order-api'
import { expect } from '@playwright/test'
import { baseResponseValidatorAndLogging } from '../../helpers/response-validator'

const ORDER_URL = 'orders'
const STUDENT_LOGIN_URL = 'login/student'

test.describe('Real Order operations API', () => {
  test.describe('POST Order operations API with JWT', () => {
    test('creates order with correct response with 200', async ({ api }) => {
      const loginData = new LoginDtoWithDotEnv()
      const loginResponse = await api.post<LoginDto, string>(STUDENT_LOGIN_URL, loginData)
      const jwt = await loginResponse.body
      console.log('jwt:', jwt)

      const postOrderResponse = await api.post<OrderDTO, OrderDTO>(
        ORDER_URL,
        new OrderDTO(OrderStatus.OPEN),
        { Authorization: `Bearer ${jwt}` },
      )
      baseResponseValidatorAndLogging(postOrderResponse, StatusCodes.OK)

      expect(postOrderResponse.body).toMatchObject({
        status: OrderStatus.OPEN,
        customerName: OrderCustomerData.CUSTOMER_NAME,
        customerPhone: OrderCustomerData.CUSTOMER_PHONE,
        comment: OrderCustomerData.CUSTOMER_COMMENT,
      })
    })
  })
  test.describe('DELETE Order operations API with JWT', () => {
    test('creates order and deletes it with 200', async ({ api, orderData }) => {
      const { jwt, orderId } = orderData

      const getOrderResponse = await api.get<OrderDTO>(ORDER_URL, orderId, {
        Authorization: `Bearer ${jwt}`,
      })
      baseResponseValidatorAndLogging(getOrderResponse, StatusCodes.OK)

      const deleteOrderResponse = await api.delete(ORDER_URL, orderId, {
        Authorization: `Bearer ${jwt}`,
      })

      baseResponseValidatorAndLogging(deleteOrderResponse, StatusCodes.OK)
      console.log('Order is DELETED Order_ID: %s ', deleteOrderResponse.body)

      await api.get<OrderDTO>(ORDER_URL, orderId, { Authorization: `Bearer ${jwt}` })
      console.log('Order is DELETED Order_ID: %s ', deleteOrderResponse.body)
    })
  })

  test.describe('GET Order operations API with JWT', () => {
    test('creates order and returns order details with 200', async ({ api, orderData }) => {
      const { jwt, orderId, order } = orderData

      const getOrderResponse = await api.get<OrderDTO>(ORDER_URL, orderId, {
        Authorization: `Bearer ${jwt}`,
      })
      baseResponseValidatorAndLogging(getOrderResponse, StatusCodes.OK)
      expect(getOrderResponse.body).toMatchObject({
        status: order.status,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        comment: order.comment,
        id: orderId,
      })
    })
  })
})
