import React from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { initializeBlogs } from "../reducers/blogsReducer"
import blogService from "../services/blogs"

export const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  const dispatch = useDispatch()
  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(initializeBlogs(blogs))
    })
  }, [])

  const blogStyle = {
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    display: "flex",
    alignItems: "center",
    padding: 10
  }

  return <div className="blogList">
    {blogs.sort((a, b) => b.likes - a.likes).map(blog => (
      <div key={blog.id} style={blogStyle}>
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        <br />
      </div>
    ))
    }
  </div>
}