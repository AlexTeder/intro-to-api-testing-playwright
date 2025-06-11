# Homework 9: API Test Scenarios Checklist

## Test Scenarios Table

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

### Legend

- ✅ Implemented
- ⬜ Not Implemented
- ❌ Failed

## Notes

- All scenarios should be tested with appropriate error messages and response bodies
- Authentication/Authorization tests should be included where applicable
- Edge cases and boundary testing should be considered for each endpoint
- Response payload structure should be validated for successful requests
