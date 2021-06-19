const blogsRouter = require("express").Router()
const Blog = require("../models/blog.js")
const middleware = require("../utils/middleware")

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate("user", { username: 1, name: 1 })
    if (blog) {
        response.json(blog.toJSON())
    }
    else {
        response.status(400)
    }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        user: user._id,
        likes: body.likes || 0
    }).populate("user", { username: 1, name: 1, id: 1 }, function(err, res){})

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog.toJSON())
})

blogsRouter.delete("/:id", middleware.userExtractor, async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response.status(404).end()
    }

    if (user._id.toString() !== blog.user.toString()) {
        return response.status(401).json({ error: "You are not authorized to delete this blog" })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(200).end()
})

blogsRouter.put("/:id", async (request, response) => {
    const id = request.params.id

    const blog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        user: request.body.user,
        likes: request.body.likes
    }

    const updatedNote = await Blog.findByIdAndUpdate(id, blog, { new: true }).populate("user")
    response.json(updatedNote.toJSON())
})

module.exports = blogsRouter