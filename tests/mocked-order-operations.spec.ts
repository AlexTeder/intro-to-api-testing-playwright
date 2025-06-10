import { test } from './fixtures-api';
import { StatusCodes } from 'http-status-codes';
import { OrderDTO } from '../dto/order-dto';
import { validateResponse } from '../helpers/response-validator'

const orderUrl = 'test-orders';

test('get order with correct id should receive code 200', async ({ api }) => {
  const response = await api.get<OrderDTO>(orderUrl, 1);
  validateResponse(response, StatusCodes.OK)
});

test('get order with incorrect id should receive code 400', async ({ api }) => {
  const response = await api.get<OrderDTO>(orderUrl, 11);
  validateResponse(response, StatusCodes.BAD_REQUEST)
});

//IMPLEMENT API KEY LOGIC
test('delete order with incorrect id should receive code 400', async ({ api }) => {
  const response = await api.delete<OrderDTO>(orderUrl, 11);
  validateResponse(response, StatusCodes.BAD_REQUEST)
});