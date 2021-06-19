import axios from "axios"
import React, { useState, useEffect } from "react"
import blogService from "./services/blogs"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import BlogView from "./components/BlogView"

const App = () => {
  const [user, setUser] = useState(null)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const userString = window.localStorage.getItem("user")
    if (userString === "" || userString === null) {
      setUser(null)
      blogService.setToken(null)
    }
    else {
      const newUser = JSON.parse(userString)
      setUser(newUser)
      blogService.setToken(newUser.token)
    }
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    const loginInformation = { username, password }
    axios.post("http://localhost:3003/api/login", loginInformation).then(response => {
      setUser(response.data)
      window.localStorage.setItem("user", JSON.stringify(response.data))
      blogService.setToken(response.data.token)
    }).catch(error => {
      setNotification("Invalid username or password")
      setTimeout(() => setNotification(null), 3000)
      console.error(error.message)
    })
  }

  const logOut = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem("user")
  }

  return (
    <div>
      <h2>{user === null ? "Log in to application" : "Blogs"}</h2>

      <Notification message={notification} />

      {user !== null && <div>
        <p>{user.name} logged in</p>
        <button onClick={logOut}>Logout</button>
      </div>}

      {user === null ?
        <LoginForm handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} /> :
        <BlogView setNotification={setNotification} currentUser={user} />
      }
    </div>
  )
}

export default App