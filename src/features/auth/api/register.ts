export type RegisterCredentialsDTO = {
  name: string
  email: string
  password: string
}

export const registerWithEmailAndPassword = (data: RegisterCredentialsDTO) => {
  return fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  })
}
