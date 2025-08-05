import { test as base } from '../fixtures/fixtures-api'
import { OrderDTO } from '../dto/order-dto'
import { LoginDto, LoginDtoWithDotEnv } from '../dto/login-dto'
import { OrderStatus } from '../../test-data/order-api'

const ORDER_URL = 'orders'
const STUDENT_LOGIN_URL = 'login/student'

type OrderDataFixture = {
  orderData: { jwt: string | undefined ; orderId: number; order: OrderDTO }
}

export const test = base.extend<OrderDataFixture>({
  orderData: async ({ api }, use) => {
    const loginData = new LoginDtoWithDotEnv()
    const loginResponse = await api.post<LoginDto, string>(STUDENT_LOGIN_URL, loginData)
    const jwt = loginResponse.body

    const postOrderResponse = await api.post<OrderDTO, OrderDTO>(
      ORDER_URL,
      new OrderDTO(OrderStatus.OPEN),
      { Authorization: `Bearer ${jwt}` },
    )
    const order = postOrderResponse.body
    if (!order) throw new Error('Order is undefined')
    const orderId = order.id
    if (orderId === undefined) throw new Error('Order ID is undefined')

    console.log('Order is CREATED Order_ID: %s', orderId)
    await use({ jwt, orderId, order })

    // await api.delete(ORDER_URL, orderId, { Authorization: `Bearer ${jwt}` })
    // console.log('Order is DELETED Order_ID: %s ', orderId)
  },
})
