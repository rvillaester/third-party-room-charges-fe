import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://346uq6ixqf.execute-api.ap-southeast-2.amazonaws.com/dev',
  headers: { 'Content-Type': 'application/json' },
})
