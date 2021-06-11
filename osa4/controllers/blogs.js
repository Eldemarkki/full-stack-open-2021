const blogsRouter = require("express").Router()
const Blog = require("../models/blog.js")

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.get('/', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.status(200).json(blog)
    }
    else {
        response.status(400)
    }
})

blogsRouter.post('/', async (request, response) => {
    if (!("title" in request.body) || !("url" in request.body)) {
        response.status(400).end("title or url missing")
        return;
    }

    const blog = new Blog(request.body)
    blog.likes = blog.likes || 0

    const result = await blog.save()
    response.status(200).json(result)
})

blogsRouter.delete("/:id", async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(200).end()
})

blogsRouter.put("/:id", async (request, response) => {
    const id = request.params.id

    const blog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    }

    const updatedNote = await Blog.findByIdAndUpdate(id, blog, { new: true })
    response.json(updatedNote.toJSON())
})

module.exports = blogsRouter