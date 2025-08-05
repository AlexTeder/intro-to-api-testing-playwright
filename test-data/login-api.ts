export const jwtRegex = /[a-zA-Z0-9-_=]+\.[a-zA-Z0-9-_=]+\.?[a-zA-Z0-9-_.+/=]*$/

export enum WrongLoginData {
  FAULTY_USERNAME = 'login123',
  FAULTY_PASSWORD = 'pass123'
}

export const invalidLoginData = {
  wrongField: 'invalidValue',
}