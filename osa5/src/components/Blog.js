import axios from "axios"
import React, { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({ blog, blogs, setBlogs, currentUser, handleLike }) => {
  const [showFullInfo, setShowFullInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  const handleDeleteBlog = () => {
    if(window.confirm("Delete blog?")){
      const deleteUrl = `http://localhost:3003/api/blogs/${blog.id}`
      axios.delete(deleteUrl, { headers: { "authorization": "bearer " + currentUser.token } }).then(() => {
        setBlogs([...(blogs.filter(b => b.id !== blog.id))])
      }).catch(error => {
        console.error(error.message)
      })
    }
  }

  return <div style={blogStyle} className="blogEntry">
    {blog.title} {blog.author}
    <button onClick={() => setShowFullInfo(!showFullInfo)}>{showFullInfo ? "hide" : "view"}</button>
    {showFullInfo && <div>
      {blog.url}
      <br />
      Likes {blog.likes} <button onClick={handleLike} className="likeButton">Like</button>
      <br />
      {blog.author}
      <br />
      {blog.user && blog.user.username === currentUser.username &&
        <button onClick={handleDeleteBlog} className="deleteButton">Delete</button>
      }
    </div>}
  </div >
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired
}

export default Blog