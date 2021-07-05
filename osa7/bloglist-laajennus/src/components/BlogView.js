import React from "react"
import { BlogCreationForm } from "./BlogCreationForm"
import { BlogList } from "./BlogList"

const BlogView = () => {
  return (
    <div>
      <BlogCreationForm />
      <br />
      <BlogList />
    </div>
  )
}

export default BlogView