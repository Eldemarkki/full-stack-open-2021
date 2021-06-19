import React, { useState } from "react"

export const BlogCreationForm = ({ handleCreateBlog }) => {
  const [isFormVisible, setFormVisible] = useState(false)

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const onFormSubmit = (event) => {
    event.preventDefault()
    setFormVisible(false)
    handleCreateBlog({ title: title, author: author, url: url })
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
    return <button onClick={() => setFormVisible(true)}>Create new blog</button>
  }
}