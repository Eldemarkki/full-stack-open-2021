import React from "react"
import Blog from "./Blog"

export const BlogList = ({ blogs, setBlogs, currentUser, handleLike }) => {
  return <div className="blogList">
    {blogs.sort((a, b) => b.likes - a.likes).map(blog => (
      <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} currentUser={currentUser} handleLike={() => handleLike(blog)} />
    ))
    }
  </div>
}