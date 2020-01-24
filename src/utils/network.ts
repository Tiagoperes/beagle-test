import qs from 'qs'

export type HttpMethod = 'post' | 'get' | 'put' | 'delete' | 'patch'

interface HttpRequest {
  url: string,
  method?: HttpMethod,
  data?: any,
  headers?: Record<string, string>,
}

export async function sendRequest({ url, method = 'get', data, headers }: HttpRequest) {
  const body = method !== 'get' ? JSON.stringify(data) : ''
  const queryString = method === 'get' ? `?${qs.stringify(data)}` : ''
  const result = await fetch(`${url}${queryString}`, {
    body,
    method,
    headers,
  })

  if (result.status < 100 || result.status >= 400) throw new Error('Network error!')
  
  try {
    return await result.json()
  } catch {
    return
  }
}
