import { ENV } from '../../config/env'

export class LoginDto {
  username: string
  password: string

  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }
  static createLoginWithCorrectData(): LoginDto {
    return new LoginDto(process.env.USER || '', process.env.PASSWORD || '')
  }
}

export class LoginDtoWithDotEnv {
  username: string
  password: string

  constructor() {
    this.username = ENV.STUDENT_USERNAME
    this.password = ENV.STUDENT_PASSWORD
  }
}
