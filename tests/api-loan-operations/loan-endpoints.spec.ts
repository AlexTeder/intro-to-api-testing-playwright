import { test } from '../fixtures/fixtures-api'
import { StatusCodes } from 'http-status-codes'
import { LoanDto } from '../dto/loan-dto'
import {
  baseResponseValidatorAndLogging,
  validateLoanRiskLevelResponse,
} from '../../helpers/response-validator'
import {
  EMPLOYMENT_STATUS,
  LoanAgeLimit,
  LoanAmount,
  LoanDebtValue,
  LoanIncomeValue,
  LoanRiskDecision,
  LoanRiskLevel,
  LoanRiskPeriods,
} from '../../test-data/loan-api'

const LOAN_URL = 'api/loan-calc/decision'

test.describe('Loan operations API', () => {
  test.describe('POST Calculate risk', () => {
    test.describe('Income Validation', () => {
      test('with valid income (>0) returns 200', async ({ api }) => {
        const requestBody = new LoanDto({ income: LoanIncomeValue.POSTIVE_INCOME })
        const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)
        baseResponseValidatorAndLogging(response, StatusCodes.OK)
      })

      test('with zero income returns 400', async ({ api }) => {
        const requestBody = new LoanDto({ income: LoanIncomeValue.ZERO_INCOME })
        const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)
        baseResponseValidatorAndLogging(response, StatusCodes.BAD_REQUEST)
      })

      test('with negative income returns 400', async ({ api }) => {
        const requestBody = new LoanDto({ income: LoanIncomeValue.NEGATIVE_INCOME })
        const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)
        baseResponseValidatorAndLogging(response, StatusCodes.BAD_REQUEST)
      })
    })
    test.describe('Debt Validation', () => {
      test('with valid debt (>=0) returns 200', async ({ api }) => {
        const requestBody = new LoanDto({ debt: LoanDebtValue.POSITIVE_DEBT_VALUE })
        const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)
        baseResponseValidatorAndLogging(response, StatusCodes.OK)
      })

      test('with  negative debt returns 400', async ({ api }) => {
        const requestBody = new LoanDto({ debt: LoanDebtValue.NEGATIVE_DEBT_VALUE })
        const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)
        baseResponseValidatorAndLogging(response, StatusCodes.BAD_REQUEST)
      })
    })
    test.describe('Age Validation', () => {
      test('with valid age (>16) returns 200', async ({ api }) => {
        const requestBody = new LoanDto({ age: LoanAgeLimit.MINIMUM_AGE })
        const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)
        baseResponseValidatorAndLogging(response, StatusCodes.OK)
      })

      test('with invalid age (≤16) returns 400 -> 200', async ({ api }) => {
        const requestBody = new LoanDto({ age: LoanAgeLimit.TOO_YU0NG_AGE })
        const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)
        baseResponseValidatorAndLogging(response, StatusCodes.OK)
      })
      test('with invalid age (>100) returns 400 -> 200', async ({ api }) => {
        const requestBody = new LoanDto({ age: LoanAgeLimit.TOO_OLD_AGE })
        const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)
        baseResponseValidatorAndLogging(response, StatusCodes.OK)
      })
    })
    test.describe('Employment status Validation', () => {
      test('for employed status returns 200', async ({ api }) => {
        const requestBody = new LoanDto({ employed: EMPLOYMENT_STATUS.EMPLOYED })
        const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)
        baseResponseValidatorAndLogging(response, StatusCodes.OK)
      })

      test('for unemployed status returns 200', async ({ api }) => {
        const requestBody = new LoanDto({ employed: EMPLOYMENT_STATUS.UNEMPLOYED })
        const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)
        baseResponseValidatorAndLogging(response, StatusCodes.OK)
      })

      test.describe('Loan Value Validation', () => {
        test('with positive loan value returns 200', async ({ api }) => {
          const requestBody = new LoanDto({ loanAmount: LoanAmount.DEFAULT })
          const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)
          baseResponseValidatorAndLogging(response, StatusCodes.OK)
        })

        test('with negative loan value returns 400', async ({ api }) => {
          const requestBody = new LoanDto({ loanAmount: LoanAmount.NEGATIVE_AMOUNT })
          const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)
          baseResponseValidatorAndLogging(response, StatusCodes.BAD_REQUEST)
        })
      })
      test.describe('Risk Level Calculation', () => {
        test('with Very High Risk scenario returns negative decision and periods for very high risk ([] months)', async ({
          api,
        }) => {
          const requestBody = new LoanDto({ income: 100 })
          const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)

          validateLoanRiskLevelResponse(response, StatusCodes.OK, {
            riskLevel: LoanRiskLevel.VERY_HIGH,
            riskDecision: LoanRiskDecision.NEGATIVE,
            riskPeriods: LoanRiskPeriods.VERY_HIGH,
          })
        })
        test('with High Risk scenario returns positive decision and periods for high risk (3, 6 months) ', async ({
          api,
        }) => {
          const requestBody = new LoanDto({ income: 500, loanPeriod: 3 })
          const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)

          validateLoanRiskLevelResponse(response, StatusCodes.OK, {
            riskLevel: LoanRiskLevel.HIGH,
            riskDecision: LoanRiskDecision.POSITIVE,
            riskPeriods: LoanRiskPeriods.HIGH,
          })
        })

        test('with Medium Risk scenario returns positive decision and periods for medium risk (6, 9, 12 months)', async ({
          api,
        }) => {
          const requestBody = new LoanDto({ income: 1000 })
          const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)

          validateLoanRiskLevelResponse(response, StatusCodes.OK, {
            riskLevel: LoanRiskLevel.MEDIUM,
            riskDecision: LoanRiskDecision.POSITIVE,
            riskPeriods: LoanRiskPeriods.MEDIUM,
          })
        })

        test('with Low Risk scenario returns positive decision and periods for low risk (12, 18, 24, 30, 36 months)', async ({
          api,
        }) => {
          const requestBody = new LoanDto({ income: 10000 })
          const response = await api.post<LoanDto, LoanDto>(LOAN_URL, requestBody)

          validateLoanRiskLevelResponse(response, StatusCodes.OK, {
            riskLevel: LoanRiskLevel.LOW,
            riskDecision: LoanRiskDecision.POSITIVE,
            riskPeriods: LoanRiskPeriods.LOW,
          })
        })
      })
    })
  })
})
