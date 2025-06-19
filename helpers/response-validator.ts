import { expect } from '@playwright/test'
import { LoanRiskDecision, LoanRiskLevel } from '../test-data/loan-api'
import { parseJson } from './json.helper'
import { LoanDto, LoanResponseDto } from '../tests/dto/loan-dto'

export interface APIResponseDTO<T> {
  status: number
  body?: T
}

export const baseResponseValidatorAndLogging = <T>(
  response: APIResponseDTO<T>,
  expectedStatus: number,
): void => {
  console.log('Response Status:', response.status)
  console.log('Response Body:', response.body)
  expect.soft(response.status).toBe(expectedStatus)
}

export const emptyResponseValidatorAndLogging = <T>(
  response: APIResponseDTO<T>,
  expectedStatus: number,
): void => {
  console.log('Response Status:', response.status)
  expect.soft(response.status).toBe(expectedStatus)
}

export interface ExpectedLoanResponse {
  riskLevel: LoanRiskLevel
  riskDecision: LoanRiskDecision
  riskPeriods: number[]
}

export const validateLoanRiskLevelResponse = (
  response: APIResponseDTO<LoanDto>,
  expectedStatus: number,
  expectedResponse: ExpectedLoanResponse,
): void => {
  console.log('Response Status:', response.status)
  console.log('Response Body:', response.body)
  expect.soft(response.status).toBe(expectedStatus)

  const loanResponse = parseJson(response.body, LoanResponseDto)
  expect.soft(loanResponse.riskLevel).toBe(expectedResponse.riskLevel)
  expect.soft(loanResponse.riskDecision).toBe(expectedResponse.riskDecision)
  expect.soft(loanResponse.riskPeriods).toMatchObject(expectedResponse.riskPeriods)
}
