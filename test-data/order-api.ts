export enum OrderId {
  ORDER_ID_POSITIVE_VALUE = 1,
  ORDER_ID_NEGATIVE_VALUE = 9999,
}

export enum OrderStatus {
  OPEN = 'OPEN',
  ACCEPTED = 'ACCEPTED',
  IN_PROGRESS = 'INPROGRESS',
  DELIVERED = 'DELIVERED',
}

export enum OrderCustomerData {
  CUSTOMER_NAME = 'Alex Test',
  CUSTOMER_PHONE = '555-5555',
  CUSTOMER_COMMENT = 'Some comment',
}

export enum FaultyOrderIdData {
  ORDER_STATUS_CLOSED = 'CLOSED',
}
