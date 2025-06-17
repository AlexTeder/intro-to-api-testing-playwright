## Test Scenarios Table

### Legend

- ✅ Implemented
- ⬜ Not Implemented
- ❌ Failed

# Homework 9: Order API Test Scenarios Checklist

| HTTP Method | Scenario Description                         | Expected Status | Status |
| ----------- | -------------------------------------------- | --------------- | ------ |
| GET         | Get order with valid ID                      | 200             | ✅     |
| GET         | Get order with invalid ID                    | 400             | ✅     |
| GET         | Get order with non-existent ID               | 404             | ✅     |
| PUT         | Update order with valid ID and valid payload | 200             | ✅     |
| PUT         | Update order with invalid ID                 | 400             | ✅     |
| PUT         | Update order without payload                 | 404             | ✅     |
| DELETE      | Delete order with valid ID                   | 204             | ✅     |
| DELETE      | Delete order with invalid ID                 | 400             | ✅     |
| DELETE      | Delete order with non-existent ID            | 404             | ✅     |

# Homework 10: Loan API Test Scenarios Checklist

| HTTP Method                      | Scenario Description                                        | Expected Status | Status |
| -------------------------------- | ----------------------------------------------------------- | --------------- | ------ |
| **Income Validation**            |                                                             |                 |        |
| POST                             | Calculate risk with valid income (>0)                       | 200             | ✅     |
| POST                             | Calculate risk with zero income                             | 400             | ✅     |
| POST                             | Calculate risk with negative income                         | 400             | ✅     |
| **Debt Validation**              |                                                             |                 |        |
| POST                             | Calculate risk with valid debt (>=0)                        | 200             | ✅     |
| POST                             | Calculate risk with negative debt                           | 400             | ✅     |
| **Age Validation**               |                                                             |                 |        |
| POST                             | Calculate risk with valid age (>16)                         | 200             | ✅     |
| POST                             | Calculate risk with invalid age (≤16)                       | 400             | ❌     |
| POST                             | Calculate risk with invalid age (>100)                      | 400             | ❌     |
| **Employment Status Validation** |                                                             |                 |        |
| POST                             | Calculate risk for employed status                          | 200             | ✅     |
| POST                             | Calculate risk for unemployed status                        | 200             | ✅     |
| **Risk Level Calculation**       |                                                             |                 |        |
| POST                             | Calculate Very High Risk scenario returns negative decision | 200             | ✅     |
| POST                             | Calculate High Risk scenario returns positive decision      | 200             | ✅     |
| POST                             | Calculate Medium Risk scenario returns positive decision    | 200             | ✅     |
| POST                             | Calculate Low Risk scenario returns positive decision       | 200             | ✅     |
| **Loan Period Validation**       |                                                             |                 |        |
| POST                             | Validate periods for very high risk ([]] months)            | 200             | ✅     |
| POST                             | Validate periods for high risk (3, 6 months)                | 200             | ✅     |
| POST                             | Validate periods for medium risk (6, 9, 12 months)          | 200             | ✅     |
| POST                             | Validate periods for low risk (12, 18, 24, 30, 36 months)   | 200             | ✅     |
| **Loan Value Validation**        |                                                             |                 |        |
| POST                             | Calculate with valid loan value                             | 200             | ✅     |
| POST                             | Calculate with negative loan value                          | 400             | ✅     |
| **Edge Cases**                   |                                                             |                 |        |
| POST                             | Calculate with missing required fields                      | 400             | ⬜     |
| POST                             | Calculate with all fields at maximum values                 | 200             | ⬜     |
| POST                             | Calculate with boundary values at risk level thresholds     | 200             | ⬜     |

## Notes

- All scenarios should be tested with appropriate error messages and response bodies
- Authentication/Authorization tests should be included where applicable
- Edge cases and boundary testing should be considered for each endpoint
- Response payload structure should be validated for successful requests
