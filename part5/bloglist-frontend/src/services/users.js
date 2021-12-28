import axios from 'axios'

const usersBaseURL = 'http://localhost:3003/api/users'

const getAll = async () => {
  const response = await axios.get(usersBaseURL)
  return response.data
}

export default { getAll }