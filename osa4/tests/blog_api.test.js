const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")

const api = supertest(app)

test("get returns correct amount of blogs", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(6)
})

test("all blogs have 'id' defined", async () => {
    const response = await api.get("/api/blogs")
    response.body.forEach(blog => {
        expect(blog.id).toBeDefined()
    });
})

test("on POST, blog count increases by 1", async () => {
    const newBlog = {
        title: "blogTitle",
        author: "authorName",
        url: "urlValue",
        likes: 9,
    }

    const originalCount = (await api.get("/api/blogs")).body.length
    await api.post("/api/blogs").send(newBlog)
    const newCount = (await api.get("/api/blogs")).body.length

    expect(newCount).toBe(originalCount + 1)
})

test("if no like count provided, it will be set to 0", async () => {
    const newBlog = {
        title: "blogTitle",
        author: "authorName",
        url: "urlValue",
    }

    const response = await api.post("/api/blogs").send(newBlog)
    expect(response.body.likes).toBe(0)
})

test("response code 400 if 'title' or 'url' properties are missing", async () => {
    const newBlog = {
        author: "authorName",
        likes: 9
    }

    await api.post("/api/blogs").send(newBlog).expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})