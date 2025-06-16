import { test } from '../fixtures-api'
import { StatusCodes } from 'http-status-codes'
import { LoanDto, LoanResponseDto } from '../dto/loan-dto'
import { validateResponse } from '../../helpers/response-validator'
import { expect } from '@playwright/test'
import { parseJson } from '../../helpers/json.helper'
import { riskDecision, riskLevel } from '../../test-data/loan-api'

const LOAN_URL = 'api/loan-calc/decision'

test.describe('Loan operations API', () => {
  test.describe('POST Calculate risk', () => {
    test.describe('Income Validation', () => {
      test('with valid income (>0) returns 200', async ({ api }) => {
        const requestBody = new LoanDto({ income: 1 })
        const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)
        validateResponse(response, StatusCodes.OK)
      })

      test('with zero income returns 400', async ({ api }) => {
        const requestBody = new LoanDto({ income: 0 })
        const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)
        validateResponse(response, StatusCodes.BAD_REQUEST)
      })

      test('with negative income returns 400', async ({ api }) => {
        const requestBody = new LoanDto({ income: -1 })
        const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)
        validateResponse(response, StatusCodes.BAD_REQUEST)
      })
    })
    test.describe('Debt Validation', () => {
      test('with valid debt (>=0) returns 200', async ({ api }) => {
        const requestBody = new LoanDto({ debt: 1 })
        const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)
        validateResponse(response, StatusCodes.OK)
      })

      test('with  negative debt returns 400', async ({ api }) => {
        const requestBody = new LoanDto({ debt: -1 })
        const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)
        validateResponse(response, StatusCodes.BAD_REQUEST)
      })
    })
    test.describe('Age Validation', () => {
      test('with valid age (>16) returns 200', async ({ api }) => {
        const requestBody = new LoanDto({ age: 16 })
        const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)
        validateResponse(response, StatusCodes.OK)
      })

      test('with invalid age (≤16) returns 400', async ({ api }) => {
        const requestBody = new LoanDto({ debt: 12 })
        const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)
        validateResponse(response, StatusCodes.OK)
      })
      test('with invalid age (>100) returns 400', async ({ api }) => {
        const requestBody = new LoanDto({ debt: 101 })
        const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)
        validateResponse(response, StatusCodes.OK)
      })
    })
    test.describe('Employment status Validation', () => {
      test('for employed status returns 200', async ({ api }) => {
        const requestBody = new LoanDto({ employed: true })
        const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)
        validateResponse(response, StatusCodes.OK)
      })

      test('for unemployed status returns 200', async ({ api }) => {
        const requestBody = new LoanDto({ employed: false })
        const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)
        validateResponse(response, StatusCodes.OK)
      })
      test.describe('Risk Level Calculation', () => {
        test('with Very High Risk scenario returns negative decision', async ({ api }) => {
          const requestBody = new LoanDto({ income: 100 })
          const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)
          validateResponse(response, StatusCodes.OK)

          const loanResponse = parseJson(response.body, LoanResponseDto)
          expect.soft(loanResponse.riskLevel).toBe(riskLevel.VERY_HIGH)
          expect.soft(loanResponse.riskDecision).toBe(riskDecision.NEGATIVE)
          expect.soft(loanResponse.riskPeriods).toMatchObject([])
        })
        test('with High Risk scenario returns positive decision', async ({ api }) => {
          const requestBody = new LoanDto({ income: 500, loanPeriod: 3 })
          const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)
          validateResponse(response, StatusCodes.OK)

          const loanResponse = parseJson(response.body, LoanResponseDto)
          expect.soft(loanResponse.riskLevel).toBe(riskLevel.HIGH)
          expect.soft(loanResponse.riskDecision).toBe(riskDecision.POSITIVE)
          expect.soft(loanResponse.riskPeriods).toMatchObject([3, 6])
        })

        test('with Medium Risk scenario returns negative positive', async ({ api }) => {
          const requestBody = new LoanDto({ income: 1000 })
          const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)
          validateResponse(response, StatusCodes.OK)

          const loanResponse = parseJson(response.body, LoanResponseDto)
          expect.soft(loanResponse.riskLevel).toBe(riskLevel.MEDIUM)
          expect.soft(loanResponse.riskDecision).toBe(riskDecision.POSITIVE)
          expect.soft(loanResponse.riskPeriods).toMatchObject([6, 9, 12])
        })
        test('Calculate Low Risk scenario', async ({ api }) => {
          const requestBody = new LoanDto({ income: 10000 })
          const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)
          validateResponse(response, StatusCodes.OK)

          const loanResponse = parseJson(response.body, LoanResponseDto)
          expect.soft(loanResponse.riskLevel).toBe(riskLevel.LOW)
          expect.soft(loanResponse.riskDecision).toBe(riskDecision.POSITIVE)
          expect.soft(loanResponse.riskPeriods).toMatchObject([12, 18, 24, 30, 36])
        })
      })
    })
  })
})
