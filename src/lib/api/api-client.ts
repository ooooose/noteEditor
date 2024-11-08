import { getSession } from 'next-auth/react'

class ApiClient {
  baseURL: string

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL ?? ''
  }

  private async getHeaders(additionalHeaders: HeadersInit = {}): Promise<HeadersInit> {
    const session = await getSession()
    return {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${session?.user.accessToken}`,
      ...additionalHeaders,
    }
  }

  private appendQueryParams(url: string, params: Record<string, any> = {}): string {
    const urlObj = new URL(url, this.baseURL)
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null) {
        urlObj.searchParams.append(key, String(params[key]))
      }
    })
    return urlObj.toString()
  }

  private async request(url: string, options: RequestInit, params: Record<string, any> = {}) {
    try {
      const headers = await this.getHeaders(options.headers as HeadersInit)
      const fullUrl = this.appendQueryParams(url, params)
      const response = await fetch(fullUrl, {
        ...options,
        headers,
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Something went wrong')
      }
      return response.json()
    } catch (error) {
      console.error('API request failed', error)
      throw error
    }
  }

  async get(url: string, params: Record<string, any> = {}, headers: HeadersInit = {}) {
    return this.request(
      url,
      {
        method: 'GET',
        headers,
      },
      params,
    )
  }

  async post(url: string, body = {}, headers: HeadersInit = {}, params: Record<string, any> = {}) {
    return this.request(
      url,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      },
      params,
    )
  }

  async put(url: string, body = {}, headers: HeadersInit = {}, params: Record<string, any> = {}) {
    return this.request(
      url,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify(body),
      },
      params,
    )
  }

  async delete(
    url: string,
    body = {},
    headers: HeadersInit = {},
    params: Record<string, any> = {},
  ) {
    return this.request(
      url,
      {
        method: 'DELETE',
        headers,
        body: JSON.stringify(body),
      },
      params,
    )
  }
}

export const apiClient = new ApiClient()
