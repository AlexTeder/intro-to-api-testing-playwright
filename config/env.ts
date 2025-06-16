import dotenv from 'dotenv'

dotenv.config()

export const ENV = {
  API_KEY: process.env.API_KEY || '',
  BASE_URL: process.env.BASE_URL || 'https://backend.tallinn-learning.ee',
  STUDENT_USERNAME: process.env.STUDENT_USERNAME || '',
  STUDENT_PASSWORD: process.env.STUDENT_PASSWORD || '',
}
