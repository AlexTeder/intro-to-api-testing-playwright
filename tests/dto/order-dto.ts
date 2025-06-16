export interface OrderDTO {
  status: 'OPEN' | 'ACCEPTED' | 'INPROGRESS' | 'DELIVERED' | 'CLOSED'
  courierId: number | 'null'
  customerName: string | null
  customerPhone: string | null
  comment: string | null
  id: number | null
}
