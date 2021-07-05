import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setCurrentUser } from "../reducers/currentUserReducer"
import blogService from "../services/blogs"
import { setNotification } from "../reducers/notificationReducer"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    const userString = window.localStorage.getItem("user")
    if (userString === "" || userString === null) {
      dispatch(setCurrentUser(null))
      blogService.setToken(null)
    }
    else {
      const newUser = JSON.parse(userString)
      dispatch(setCurrentUser(newUser))
      blogService.setToken(newUser.token)
    }
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    const loginInformation = { username, password }
    axios.post("http://localhost:3003/api/login", loginInformation).then(response => {
      dispatch(setCurrentUser(response.data))
      window.localStorage.setItem("user", JSON.stringify(response.data))
      blogService.setToken(response.data.token)
    }).catch(error => {
      dispatch(setNotification("Invalid username or password"))
      setTimeout(() => dispatch(setNotification(null)), 3000)
      console.error(error.message)
    })
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>Username: <input required type="text" name="username" id="usernameField" onChange={({ target }) => { setUsername(target.value) }} /></label>
        <br />
        <label>Password: <input required type="password" name="password" id="passwordField" onChange={({ target }) => { setPassword(target.value) }} /> </label>
        <br />
        <input type="submit" id="login-button" value="Log in" />
      </form>
    </div>
  )
}

export default LoginForm