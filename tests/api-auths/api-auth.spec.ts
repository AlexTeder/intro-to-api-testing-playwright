import { test, expect } from '../fixtures-api'
import { LoginDto, LoginDtoWithDotEnv } from '../dto/login-dto'
import { StatusCodes } from 'http-status-codes'
import { baseResponseValidatorAndLogging } from '../../helpers/response-validator'
import { invalidLoginData, jwtRegex, WrongLoginData } from '../../test-data/login-api'

const STUDENT_LOGIN_URL = 'login/student'

test.describe('Login API', () => {
  test.describe('Login to a student through .env stored credentials', () => {
    test('with correct credentials returns jwt and 200', async ({ api }) => {
      const loginData = new LoginDtoWithDotEnv()
      const response = await api.post<LoginDto, string>(STUDENT_LOGIN_URL, loginData)

      baseResponseValidatorAndLogging(response, StatusCodes.OK)
      expect.soft(response.body).toBeDefined()
      expect.soft(jwtRegex.test(response.body || '')).toBeTruthy()
    })

    test('with incorrect put method returns 405', async ({ api }) => {
      const loginData = new LoginDtoWithDotEnv()
      const response = await api.put<LoginDto, string>(STUDENT_LOGIN_URL, loginData)

      baseResponseValidatorAndLogging(response, StatusCodes.METHOD_NOT_ALLOWED)
    })

    test('with incorrect post method returns 405', async ({ api }) => {
      const loginData = new LoginDtoWithDotEnv()
      const response = await api.put<LoginDto, string>(STUDENT_LOGIN_URL, loginData)

      baseResponseValidatorAndLogging(response, StatusCodes.METHOD_NOT_ALLOWED)
    })
  })

  test('with incorrect credentials returns 401', async ({ api }) => {
    const loginData = new LoginDto(WrongLoginData.FAULTY_USERNAME, WrongLoginData.FAULTY_PASSWORD)
    const response = await api.post<LoginDto, string>(STUDENT_LOGIN_URL, loginData)

    baseResponseValidatorAndLogging(response, StatusCodes.UNAUTHORIZED)
  })

  test('with wrong body structure returns 401', async ({ api }) => {
    const response = await api.post<typeof invalidLoginData, string>(
      STUDENT_LOGIN_URL,
      invalidLoginData,
    )

    baseResponseValidatorAndLogging(response, StatusCodes.UNAUTHORIZED)
  })

  test.describe('Login to a student through WebStorm & Git variable credentials', () => {
    test('with returns jwt and 200', async ({ api }) => {
      const loginData = LoginDto.createLoginWithCorrectData()
      const response = await api.post<LoginDto, string>(STUDENT_LOGIN_URL, loginData)

      baseResponseValidatorAndLogging(response, StatusCodes.OK)
      expect.soft(response.body).toBeDefined()
      expect.soft(jwtRegex.test(response.body || '')).toBeTruthy()
    })
  })
})
