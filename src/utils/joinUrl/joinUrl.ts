export const joinUrl = (path: string, params: string[]) => {
  return `${path}?${params.join('&')}`
}
