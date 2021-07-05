import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { likeBlog } from "../reducers/blogsReducer"

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])

  useEffect(() => {
    if(!blog) return;

    const url = `http://localhost:3003/api/blogs/${blog.id}/comments`
    axios.get(url).then(res => {
      setComments(res.data)
    })
  }, [])
  
  if (!blog) return null;

  const handleLike = () => {
    const putUrl = `http://localhost:3003/api/blogs/${blog.id}`
    let likedBlog = { ...blog, likes: blog.likes + 1 }
    if (blog.user) {
      likedBlog = { ...likedBlog, user: blog.user.id }
    }

    axios.put(putUrl, likedBlog).
      then(() => {
        dispatch(likeBlog(blog))
      }).
      catch(error => {
        console.error(error)
      })
  }

  const handlePostComment = (e) => {
    e.preventDefault();
    const url = `http://localhost:3003/api/blogs/${blog.id}/comments`
    axios.post(url, { comment: e.target.comment.value }).then(res => {
      setComments(res.data.comments)
      setComment("")
    })
  }

  return <div className="blogEntry">
    <h2>{blog.title} {blog.author}</h2>
    <a href={blog.url}>{blog.url}</a>
    <p>{blog.likes} likes  <button onClick={handleLike} className="likeButton">Like</button></p>
    <p>Added by {blog.user.username}</p>
    <h3>Comments</h3>
    <form onSubmit={e => handlePostComment(e)}>
      <input name="comment" value={comment} onChange={e => setComment(e.target.value)} type="text" />
      <input type="submit" />
    </form>
    <ul>
      {comments.map((c, index) => (
        <li key={c + ", " + index}>{c}</li>
      ))}
    </ul>
  </div>
}

export default Blog