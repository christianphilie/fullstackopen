import axios from 'axios'

const baseUrl = '/api/users'

const signup = async (username, name, password) => {
  const response = await axios.post(baseUrl, { username, name, password })
  return response.data
}

export default { signup }
