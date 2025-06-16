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
    this.customerName = 'Alex Test'
    this.customerPhone = '555-5555'
    this.comment = 'Some comment'
    this.id = 0
  }
}
