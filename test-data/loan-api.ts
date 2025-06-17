export enum LoanRiskLevel {
  VERY_HIGH = 'Very High Risk',
  HIGH = 'High Risk',
  MEDIUM = 'Medium Risk',
  LOW = 'Low Risk',
}

export enum LoanRiskDecision {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
}

export enum LoanIncomeValue {
  POSTIVE_INCOME = 100,
  NEGATIVE_INCOME = -100,
  ZERO_INCOME = 0
}

export enum LoanDebtValue {
  POSITIVE_DEBT_VALUE = 100,
  NEGATIVE_DEBT_VALUE = -100
}

export enum LoanAgeLimit {
  MINIMUM_AGE = 16,
  TOO_YU0NG_AGE = 12,
  TOO_OLD_AGE = 100
}

export const EMPLOYMENT_STATUS = {
  EMPLOYED: true,
  UNEMPLOYED: false
} as const;


export enum LoanAmount {
  DEFAULT = 1000,
  NEGATIVE_AMOUNT = -1000
}

export const LoanRiskPeriods = {
  VERY_HIGH: [] as number[],
  HIGH: [3, 6] as number[],
  MEDIUM: [6, 9, 12] as number[],
  LOW: [12, 18, 24, 30, 36] as number[]
} as const
