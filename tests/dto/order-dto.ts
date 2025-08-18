import { OrderCustomerData } from '../../test-data/order-api'

export class OrderDTO {
  status: string
  courierId: number
  customerName: string
  customerPhone: string
  comment: string
  id: number

  constructor(status: string) {
    this.status = status
    this.courierId = 1
    this.customerName = OrderCustomerData.CUSTOMER_NAME
    this.customerPhone = OrderCustomerData.CUSTOMER_PHONE
    this.comment = OrderCustomerData.CUSTOMER_COMMENT
    this.id = 0
  }
}
