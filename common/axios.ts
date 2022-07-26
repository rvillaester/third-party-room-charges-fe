import axios from 'axios'

export const Axios = () => {
  console.log('BASE_URL', process.env.NEXT_PUBLIC_BASE_URL)

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
  })

}
