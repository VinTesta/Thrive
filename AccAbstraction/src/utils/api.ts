import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.AAETHSAMBA_API_KEY}`,
  },
});

export default api;