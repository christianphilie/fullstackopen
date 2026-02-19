import axios from 'axios'

const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const signup = async (username, name, password) => {
  const response = await axios.post(baseUrl, { username, name, password })
  return response.data
}

export default { signup, getAll }
