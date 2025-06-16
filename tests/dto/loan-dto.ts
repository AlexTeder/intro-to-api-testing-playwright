export class LoanDto {
  income: number
  debt: number
  age: number
  employed: boolean
  loanAmount: number
  loanPeriod: number

  constructor({
    income = 100,
    debt = 0,
    age = 18,
    employed = true,
    loanAmount = 1000,
    loanPeriod = 12,
  } = {}) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }
}

interface LoanResponseData {
  riskScore: number
  riskLevel: string
  riskPeriods: number[]
  applicationId: string
  riskDecision: string
}

export class LoanResponseDto {
  constructor(data: LoanResponseData) {
    this.riskScore = data.riskScore
    this.riskLevel = data.riskLevel
    this.riskPeriods = data.riskPeriods
    this.applicationId = data.applicationId
    this.riskDecision = data.riskDecision
  }

  riskScore: number
  riskLevel: string
  riskPeriods: number[]
  applicationId: string
  riskDecision: string
}
