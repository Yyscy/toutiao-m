import storage from './storage'

export const getToken = (token) => storage.get(token)
export const setToken = (token, value) => storage.set(token, value)
export const removeToken = (token) => storage.remove(token)
