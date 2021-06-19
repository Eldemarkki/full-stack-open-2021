import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { fireEvent, render } from "@testing-library/react"
import { BlogCreationForm } from "./BlogCreationForm"

test("blog shows title and author", () => {
  const blogValues = {
    title: "Blog Title",
    author: "Blog Author",
    url: "Blog Url"
  }

  const onCreateBlog = jest.fn()

  const component = render(
    <BlogCreationForm handleCreateBlog={onCreateBlog} />
  )

  fireEvent.click(component.getByText("Create new blog"))

  const form = component.container.querySelector("form")

  fireEvent.change(component.container.querySelector(".blogCreationFormTitleInput"), { target: { value: blogValues.title } })
  fireEvent.change(component.container.querySelector(".blogCreationFormAuthorInput"), { target: { value: blogValues.author } })
  fireEvent.change(component.container.querySelector(".blogCreationFormUrlInput"), { target: { value: blogValues.url } })
  fireEvent.submit(form)

  expect(onCreateBlog.mock.calls).toHaveLength(1)
  const formBlog = onCreateBlog.mock.calls[0][0]
  expect(formBlog).toEqual(blogValues)
})