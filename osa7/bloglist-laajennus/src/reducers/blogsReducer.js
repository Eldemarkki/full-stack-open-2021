/* eslint-disable indent */

export const initializeBlogs = blogs => {
  return {
    type: "INITIALIZE_BLOGS",
    blogs
  }
}

export const createNewBlog = blog => {
  return {
    type: "CREATE_NEW_BLOG",
    blog
  }
}

export const likeBlog = blog => {
  return {
    type: "LIKE_BLOG",
    blog
  }
}

export const deleteBlog = id => {
  return {
    type: "DELETE_BLOG",
    id
  }
}

export const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case "INITIALIZE_BLOGS":
      return action.blogs
    case "CREATE_NEW_BLOG":
      return [...state, action.blog]
    case "LIKE_BLOG":
      return [...state.filter(blog => blog.id !== action.blog.id), { ...action.blog, likes: action.blog.likes + 1 }]
    case "DELETE_BLOG":
      return state.filter(blog => blog.id !== action.id)
    default:
      return state
  }
}