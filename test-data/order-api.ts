export enum OrderId {
  ORDER_ID_POSITIVE_VALUE = 1,
  ORDER_ID_NEGATIVE_VALUE = 9999,
}

export enum OrderStatus {
  OPEN = 'OPEN',
  ACCEPTED = 'ACCEPTED',
  INPROGRESS = 'INPROGRESS',
  DELIVERED = 'DELIVERED',
}

export enum FaultyOrderIdData {
  ORDER_STATUS_CLOSED = 'CLOSED',
}
