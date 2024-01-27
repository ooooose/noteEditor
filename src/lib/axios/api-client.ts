// eslint-disable-next-line import/named
import axiosBase, { AxiosInstance, AxiosResponse } from 'axios'

class ApiClient {
  axios: AxiosInstance
  constructor() {
    this.axios = axiosBase.create({
      baseURL: process.env.NEXT_APP_URL,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Credentials': true,
      },
      responseType: 'json',
    })
  }

  async apiGet(url: string, query = {}): Promise<AxiosResponse> {
    return await this.axios.get(`${url}`, { ...query })
  }

  async apiPost(url: string, body = {}): Promise<AxiosResponse> {
    return await this.axios.post(`${url}`, body)
  }

  async apiPut(url: string, body = {}): Promise<AxiosResponse> {
    return await this.axios.put(`${url}`, body)
  }

  async apiDelete(url: string, body = {}): Promise<AxiosResponse> {
    const config = {
      data: body,
    }
    return await this.axios.delete(`${url}`, config)
  }
}

export const apiClient = new ApiClient()
