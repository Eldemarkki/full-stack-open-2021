import axios from 'axios'
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const add = (contact) => {
    return axios.post(baseUrl, contact).then(response => response.data);
}

const deleteContact = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const editContact = (newContact) => {
    const url = `${baseUrl}/${newContact.id}`
    return axios.put(url, newContact)
}

const contactService = {
    getAll, add, deleteContact, editContact
}

export default contactService