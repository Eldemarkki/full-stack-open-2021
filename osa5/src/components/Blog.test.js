import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { fireEvent, render } from "@testing-library/react"
import Blog from "./Blog"

test("blog shows title and author", () => {
  const blog = {
    title: "Blog Title",
    author: "Blog Author",
    url: "Blog Url",
    likes: 15,
    user: {
      id: "UserID",
      name: "User Name",
      username: "Username"
    }
  }

  const component = render(
    <Blog blog={blog} blogs={[]} setBlogs={() => function () { }} currentUser={{}} handleLike={() => function () { }} />
  )

  expect(component.container).toHaveTextContent(
    blog.title
  )

  expect(component.container).toHaveTextContent(
    blog.author
  )

  expect(component.container).not.toHaveTextContent(
    blog.url
  )

  expect(component.container).not.toHaveTextContent(
    blog.likes
  )
})

test("opened blog shows title, author, url and likes", () => {
  const blog = {
    title: "Blog Title",
    author: "Blog Author",
    url: "Blog Url",
    likes: 15,
    user: {
      id: "UserID",
      name: "User Name",
      username: "Username"
    }
  }

  const component = render(
    <Blog blog={blog} blogs={[]} setBlogs={() => function () { }} currentUser={{}} handleLike={() => function () { }} />
  )

  const button = component.getByText("view")
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    blog.title
  )

  expect(component.container).toHaveTextContent(
    blog.author
  )

  expect(component.container).toHaveTextContent(
    blog.url
  )

  expect(component.container).toHaveTextContent(
    blog.likes
  )
})

test("when like button is pressed twice, the handleLike function is also called twice", () => {
  const blog = {
    title: "Blog Title",
    author: "Blog Author",
    url: "Blog Url",
    likes: 15,
    user: {
      id: "UserID",
      name: "User Name",
      username: "Username"
    }
  }

  const likeHandler = jest.fn()

  const component = render(
    <Blog blog={blog} blogs={[]} setBlogs={() => function () { }} currentUser={{}} handleLike={likeHandler} />
  )

  const viewButton = component.getByText("view")
  fireEvent.click(viewButton)

  const likeButton = component.getByText("Like")
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(likeHandler.mock.calls).toHaveLength(2)
})
