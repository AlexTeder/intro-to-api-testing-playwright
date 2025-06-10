export interface OrderDTO {
  status: 'OPEN' | 'CLOSED';
  courierId: number;
  customerName: string;
  customerPhone: string;
  comment: string;
  id: number;
}