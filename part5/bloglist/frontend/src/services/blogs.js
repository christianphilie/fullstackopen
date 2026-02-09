import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)
}

const like = (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.post(`${baseUrl}/${blog.id}/like`, config)
  return request.then(response => response.data)
}

const remove = (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.delete(`${baseUrl}/${blog.id}`, config)
  return request.then(response => response.data)
}

export default { setToken, getAll, create, like, remove }