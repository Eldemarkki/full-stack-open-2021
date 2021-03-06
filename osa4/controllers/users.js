const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.post("/", async (request, response) => {
    const body = request.body

    if (!body.password) {
        return response.status(400).end("Missing 'password'")
    }

    if (body.password?.length < 3) {
        return response.status(400).end("Password has to be at least 3 characters long")
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
        blogs: body.blogs
    }).populate("blogs")

    const savedUser = await user.save()
    response.json(savedUser)
})

usersRouter.get("/", async (request, response) => {
    response.json(await User.find({}).populate("blogs", { title: 1, author: 1, url: 1, likes: 1, comments: 1 }))
})

module.exports = usersRouter