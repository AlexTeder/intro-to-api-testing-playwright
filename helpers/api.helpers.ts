import { APIRequestContext, APIResponse } from 'playwright-core'
import { APIResponseDTO } from './response-validator'
import { urlBuilder } from './url-builder'

export class ApiHelper {
  private readonly baseUrl: string;
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext, baseUrl: string) {
    this.baseUrl = baseUrl;
    this.request = request;
  }

  async get<T>(endpoint: string, id?: string | number): Promise<APIResponseDTO<T>> {
    const response = await this.request.get(`${this.baseUrl}/${urlBuilder(endpoint, id)}`);
    return this.handleResponse<T>(response);
  }

  async post<T, U>(endpoint: string, data: T): Promise<APIResponseDTO<U>> {
    const response = await this.request.post(`${this.baseUrl}/${endpoint}`, {
      data,
    });
    return this.handleResponse<U>(response);
  }

  async put<T, U>(endpoint: string, data: T, id?: string | number): Promise<APIResponseDTO<U>> {
    const response = await this.request.put(`${this.baseUrl}/${urlBuilder(endpoint, id)}`, {
      data,
    });
    return this.handleResponse<U>(response);
  }

  async delete<T>(endpoint: string, id?: string | number): Promise<APIResponseDTO<T>> {
    const response = await this.request.delete(`${this.baseUrl}/${urlBuilder(endpoint, id)}`);
    return this.handleResponse<T>(response);
  }

  private async handleResponse<T>(response: APIResponse): Promise<APIResponseDTO<T>> {
    return {
      status: response.status(),
      body: await response.json(),
    };
  }
}