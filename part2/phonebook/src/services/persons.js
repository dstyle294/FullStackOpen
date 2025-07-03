import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then((response) => response.data)
}

const deleteEntry = (id) => {
    const newUrl = baseUrl.concat('/' + id)
    const request = axios.delete(newUrl)
    return request.then((response) => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${newObject.id}`, newObject)
    return request.then((response) => response.data)
}

export default { getAll, create, update, deleteEntry }