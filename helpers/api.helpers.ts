import { APIRequestContext, APIResponse } from 'playwright-core'
import { APIResponseDTO } from './response-validator'
import { urlBuilder } from './url-builder'
import { ENV } from '../config/env'

export class ApiHelper {
  private readonly baseUrl: string
  private readonly request: APIRequestContext
  private readonly headers: Record<string, string>

  constructor(request: APIRequestContext, baseUrl: string) {
    this.baseUrl = baseUrl
    this.request = request
    this.headers = {
      'Content-Type': 'application/json',
      api_key: ENV.API_KEY,
    }
  }

  async get<T>(endpoint: string, id?: string | number,   headers?: Record<string, string>
  ): Promise<APIResponseDTO<T>> {
    const response = await this.request.get(`${this.baseUrl}/${urlBuilder(endpoint, id)}`,
      {
        ...(headers && { headers }),
      }
      )
    return this.handleResponse<T>(response)
  }

  async post<T, U>(
    endpoint: string,
    data: T,
    headers?: Record<string, string>
  ): Promise<APIResponseDTO<U>> {
    const response = await this.request.post(`${this.baseUrl}/${endpoint}`, {
      data,
      ...(headers && { headers }),
    })
    return this.handleResponse<U>(response)
  }

  async put<T, U>(
    endpoint: string,
    data?: T | null,
    id?: string | number,
  ): Promise<APIResponseDTO<U>> {
    const response = await this.request.put(`${this.baseUrl}/${urlBuilder(endpoint, id)}`, {
      headers: this.headers,
      data,
    })
    return this.handleResponse<U>(response)
  }

  async delete<T>(
    endpoint: string,
    id?: string | number,
    headers?: Record<string, string>
  ): Promise<APIResponseDTO<T>> {
    const mergedHeaders = { ...this.headers, ...headers }
    const response = await this.request.delete(
      `${this.baseUrl}/${urlBuilder(endpoint, id)}`,
      { headers: mergedHeaders }
    )
    return this.handleResponse<T>(response)
  }

  private async handleResponse<T>(response: APIResponse): Promise<APIResponseDTO<T>> {
    const status = response.status()
    try {
      const body = await response.json()
      return { status, body }
    } catch {
      const textBody = await response.text()
      return { status, body: textBody as T }
    }

  }
}
