export class OrderDtoByVlad {
  status: string
  courierId: number
  customerName: string
  customerPhone: string
  comment: string
  id: number

  constructor(status: string, courierId: number) {
    this.status = status
    this.courierId = courierId
    this.customerName = 'Alex Test'
    this.customerPhone = '555-5555'
    this.comment = 'Some comment'
    this.id = 0
  }
}
