import { test } from './fixtures-api'
import { StatusCodes } from 'http-status-codes'
import { OrderDTO } from './dto/order-dto'
import { validateEmptyResponse, validateResponse } from '../helpers/response-validator'
import { expect } from '@playwright/test'
import { FaultyOrderIdData, OrderId, OrderStatus } from '../test-data/order-api'

const ORDER_URL = 'test-orders'

test.describe('Order operations API', () => {
  test.describe('GET order', () => {
    test('with correct id should receive code 200', async ({ api }) => {
      const response = await api.get<OrderDTO>(ORDER_URL, OrderId.ORDER_ID_POSITIVE_VALUE)
      validateResponse(response, StatusCodes.OK)
      expect(response.body).toMatchObject({
        status: OrderStatus.OPEN,
      })
    })

    test('with incorrect id should receive code 400', async ({ api }) => {
      const response = await api.get<OrderDTO>(ORDER_URL, 'abc')
      validateResponse(response, StatusCodes.BAD_REQUEST)
    })

    test('with not existent id should receive code 400', async ({ api }) => {
      const response = await api.get<OrderDTO>(ORDER_URL, OrderId.ORDER_ID_NEGATIVE_VALUE)
      validateResponse(response, StatusCodes.BAD_REQUEST)
    })
  })

  test.describe('Update order status', () => {
    for (const status of Object.values(OrderStatus)) {
      test(`should successfully update to ${status}`, async ({ api }) => {
        const updateData = new OrderDTO(status)
        const response = await api.put<OrderDTO, OrderDTO>(
          ORDER_URL,
          updateData,
          OrderId.ORDER_ID_POSITIVE_VALUE,
        )
        validateResponse(response, StatusCodes.OK)
        expect(response.body).toMatchObject({
          status: status,
        })
      })
    }

    test('with invalid ID and valid payload should receive 400', async ({ api }) => {
      const updateData = new OrderDTO(OrderStatus.ACCEPTED)
      const response = await api.put<OrderDTO, OrderDTO>(
        ORDER_URL,
        updateData,
        OrderId.ORDER_ID_NEGATIVE_VALUE,
      )
      validateResponse(response, StatusCodes.BAD_REQUEST)
    })

    test('with valid ID and invalid payload should receive 400', async ({ api }) => {
      const updateData = new OrderDTO(FaultyOrderIdData.ORDER_STATUS_CLOSED)
      const response = await api.put<OrderDTO, OrderDTO>(
        ORDER_URL,
        updateData,
        OrderId.ORDER_ID_NEGATIVE_VALUE,
      )
      validateResponse(response, StatusCodes.BAD_REQUEST)
    })

    test('with without a payload should receive 400', async ({ api }) => {
      const response = await api.put<OrderDTO, void>(
        ORDER_URL,
        null,
        OrderId.ORDER_ID_NEGATIVE_VALUE,
      )
      validateResponse(response, StatusCodes.BAD_REQUEST)
    })
  })

  test.describe('Delete order', () => {
    test('with correct id should receive code 204', async ({ api }) => {
      const response = await api.delete<OrderDTO>(ORDER_URL, OrderId.ORDER_ID_POSITIVE_VALUE)
      validateEmptyResponse(response, StatusCodes.NO_CONTENT)
    })

    test('with incorrect id should receive code 400', async ({ api }) => {
      const response = await api.delete<OrderDTO>(ORDER_URL, 'abc')
      validateResponse(response, StatusCodes.BAD_REQUEST)
    })

    test('with not existent id should receive code 400', async ({ api }) => {
      const response = await api.delete<OrderDTO>(ORDER_URL, OrderId.ORDER_ID_NEGATIVE_VALUE)
      validateResponse(response, StatusCodes.BAD_REQUEST)
    })
  })
})
