// src/utils/api.js
// Central axios instance — adds auth token to every request automatically

import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

// Before every request, grab token from localStorage and attach it
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// If backend returns 401 (token expired), log user out
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api
