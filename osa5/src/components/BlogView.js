import axios from "axios"
import React, { useEffect, useState } from "react"
import blogService from "../services/blogs"
import { BlogCreationForm } from "./BlogCreationForm"
import { BlogList } from "./BlogList"

const BlogView = ({ setNotification, currentUser }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleCreateBlog = (blog) => {
    blogService.create(blog).then(response => {
      setBlogs([...blogs, response.data])
      setNotification(`A new blog ${response.data.title} by ${response.data.author} added`)
      setTimeout(() => setNotification(null), 3000)
    })
  }

  const handleLike = (blog) => {
    const putUrl = `http://localhost:3003/api/blogs/${blog.id}`
    let likedBlog = { ...blog, likes: blog.likes + 1 }
    if (blog.user) {
      likedBlog = { ...likedBlog, user: blog.user.id }
    }

    axios.put(putUrl, likedBlog).then(res => {
      const resultBlog = res.data
      setBlogs([...blogs.filter(b => b.id !== resultBlog.id), resultBlog])
    }).catch(error => {
      console.error(error.message)
    })
  }

  return (
    <div>
      <BlogCreationForm handleCreateBlog={handleCreateBlog} />
      <br />
      <BlogList blogs={blogs} currentUser={currentUser} handleLike={handleLike} setBlogs={setBlogs} />
    </div>
  )
}

export default BlogView