import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const del = person => {
  const request = axios.delete(`${baseUrl}/${person.id}`)
    .then(() => console.log("person deleted is", person))
    .catch(e => console.log(`${person.name} is already deleted`, e))
  return request
}

const update = (oldPerson, newPerson) => {
  const request = axios.put(`${baseUrl}/${oldPerson.id}`, newPerson)
    .then(response => response.data)
    .catch(e => console.log("update failed", e))
  return request
}

const exportedObject = {getAll, create, del, update}

export default exportedObject
