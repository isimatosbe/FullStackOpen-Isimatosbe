import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const fetchData = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const newData = newObject => {
    return axios.post(baseUrl, newObject)
}

const deleteData = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updateData = (newObject) => {
    return axios.put(`${baseUrl}/${newObject.id}`, newObject)
}

export default { fetchData, newData, deleteData, updateData }