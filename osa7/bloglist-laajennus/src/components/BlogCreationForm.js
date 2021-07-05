import { Button } from "@material-ui/core"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createNewBlog } from "../reducers/blogsReducer"
import { setNotification } from "../reducers/notificationReducer"
import blogService from "../services/blogs"

export const BlogCreationForm = () => {
  const dispatch = useDispatch()

  const [isFormVisible, setFormVisible] = useState(false)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const onFormSubmit = (event) => {
    event.preventDefault()
    setFormVisible(false)
    handleCreateBlog({ title: title, author: author, url: url })
  }

  const handleCreateBlog = (blog) => {
    blogService.create(blog).then(response => {
      dispatch(createNewBlog(response.data))
      dispatch(setNotification(`A new blog ${response.data.title} by ${response.data.author} added`))
      setTimeout(() => dispatch(setNotification(null)), 3000)
    })
  }

  if (isFormVisible) {
    return <div>
      <h2>Create new</h2>
      <form onSubmit={onFormSubmit}>
        <label>Title: <input required className="blogCreationFormTitleInput" name="title" type="text" onChange={({ target }) => { setTitle(target.value) }} /></label>
        <br />
        <label>Author: <input required className="blogCreationFormAuthorInput" name="author" type="text" onChange={({ target }) => { setAuthor(target.value) }} /></label>
        <br />
        <label>URL: <input required className="blogCreationFormUrlInput" name="url" type="text" onChange={({ target }) => { setUrl(target.value) }} /></label>
        <br />
        <input type="submit" value="Create" id="createBlogButton" />
      </form>
    </div>
  }
  else {
    return <Button onClick={() => setFormVisible(true)} variant="contained" color="primary" size="small"style={{marginBottom: 15}}>Create new blog</Button>
  }
}