import axios from "axios"
const baseUrl = "http://localhost:3003/api/blogs"

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  return axios.post("http://localhost:3003/api/blogs", newBlog, config)
}

const blogService = {
  getAll,
  create,
  setToken
}

export default blogService