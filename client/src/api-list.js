import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:5000/api' })

export const getData = () => api.get('/')
export const addNewEvent = (form) => api.post('/', form)
export const updateEvent = (form) =>  api.put(`/${form.id}`, form)
export const deleteEvent = (id) => api.delete(`/${id}`)