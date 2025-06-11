import { expect } from '@playwright/test'

export interface APIResponseDTO<T> {
  status: number
  body?: T
}

export const validateResponse = <T>(response: APIResponseDTO<T>, expectedStatus: number): void => {
  console.log('Response Status:', response.status)
  console.log('Response Body:', response.body)
  expect(response.status).toBe(expectedStatus)
}

export const validateEmptyResponse = <T>(
  response: APIResponseDTO<T>,
  expectedStatus: number,
): void => {
  console.log('Response Status:', response.status)
  expect(response.status).toBe(expectedStatus)
}
