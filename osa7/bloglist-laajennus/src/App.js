import React, { useEffect, useState } from "react"
import blogService from "./services/blogs"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import BlogView from "./components/BlogView"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentUser } from "./reducers/currentUserReducer"
import { Route, Switch, useRouteMatch } from "react-router"
import UsersView from "./components/UsersView"
import axios from "axios"
import SingleUserView from "./components/SingleUserView"
import Blog from "./components/Blog"
import { initializeBlogs } from "./reducers/blogsReducer"
import { Link } from "react-router-dom"
const usersBaseUrl = "http://localhost:3003/api/users"

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.currentUser)

  const logOut = () => {
    dispatch(setCurrentUser(null))
    blogService.setToken(null)
    window.localStorage.removeItem("user")
  }

  const [users, setUsers] = useState([])
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    axios.get(usersBaseUrl).then(res => {
      setUsers(res.data)
    }).catch(err => console.error(err))

    blogService.getAll().then(b => dispatch(initializeBlogs(b)));
  }, [])

  const userMatch = useRouteMatch("/users/:id");
  const matchedUser = userMatch ? users.find(u => u.id === userMatch.params.id) : null;

  const blogMatch = useRouteMatch("/blogs/:id")
  const matchedBlog = blogMatch ? blogs.find(b => b.id === blogMatch.params.id) : null;
  console.log(blogs)

  const mainView = user === null ?
    <LoginForm /> :
    <Switch>
      <Route exact path="/">
        <BlogView />
      </Route>
      <Route exact path="/blogs/:id">
        <Blog blog={matchedBlog} />
      </Route>
      <Route exact path="/users">
        <UsersView users={users} />
      </Route>
      <Route exact path="/users/:id">
        <SingleUserView user={matchedUser} />
      </Route>
    </Switch>

  return (
    <div>
      <div style={{ backgroundColor: "#cccccc", padding: 5, }}>
        <Link to="/" style={{ margin: "0px 5px" }}>Blogs</Link>
        <Link to="/users" style={{ margin: "0px 5px" }}>Users</Link>
        {user !== null && <>
          <p style={{ margin: "0px 5px", display: "inline" }}>{user.name} logged in</p>
          <button onClick={logOut} style={{ margin: "0px 5px", display: "inline" }}>Logout</button>
        </>}
        {user === null && <p>Log in to application</p>}
      </div>

      <h1>Blog app</h1>
      <Notification />

      {mainView}
    </div>
  )
}

export default App