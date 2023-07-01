import axois from 'axios'

const BASE_URL = import.meta.env['VITE_BACKEND_URL']

const api = axois.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { 'Accept': 'application/json' }
})

export {
  api
}
