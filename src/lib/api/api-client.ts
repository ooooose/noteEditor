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

  private async request(url: string, options: RequestInit) {
    try {
      const headers = await this.getHeaders(options.headers as HeadersInit)
      const response = await fetch(`${this.baseURL}${url}`, {
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

  async get(url: string, headers: HeadersInit = {}) {
    return this.request(url, {
      method: 'GET',
      headers,
    })
  }

  async post(url: string, body = {}, headers: HeadersInit = {}) {
    return this.request(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
  }

  async put(url: string, body = {}, headers: HeadersInit = {}) {
    return this.request(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    })
  }

  async delete(url: string, body = {}, headers: HeadersInit = {}) {
    return this.request(url, {
      method: 'DELETE',
      headers,
      body: JSON.stringify(body),
    })
  }
}

export const apiClient = new ApiClient()
