import axios from 'axios'
const blogsBaseURL = 'http://localhost:3003/api/blogs'
const loginBaseURL = 'http://localhost:3003/api/login'

let token = null

const setToken = user => {
  token = `bearer ${user.token}`
}

const removeToken = () => {
  token = null
}

const getAll = () => {
  const request = axios.get(blogsBaseURL)
  return request.then(response => response.data)
}

const login = async credentials => {
  const response = await axios.post(loginBaseURL, credentials)
  return response.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(blogsBaseURL, newBlog, config)
  return response.data
}

const comment = async (blog, comment) => {
  const response = await axios.post(`${blogsBaseURL}/${blog.id}/comments`, { comment: comment })
  return response.data
}

const update = async updatedBlog => {
  const response = await axios.put(`${blogsBaseURL}/${updatedBlog.id}`, updatedBlog)
  return response.data
}

const remove = async blog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${blogsBaseURL}/${blog.id}`, config)
  return response.data
}

export default { getAll, login, create, setToken, removeToken, update, remove, comment }