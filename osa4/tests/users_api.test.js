const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const User = require("../models/user")

const api = supertest(app)

test("if username and password lengths are >= 3, and the username is unique, a new user is created", async () => {
    const newUser = {
        username: "Username 3",
        name: "John",
        password: "Pa$$w0rd!"
    }

    const userCountBefore = (await api.get("/api/users")).body.length
    await api.post("/api/users").send(newUser)
    const userCountAfter = (await api.get("/api/users")).body.length
    expect(userCountAfter).toEqual(userCountBefore + 1)
})

test("if username length is < 3, password length is >= 3 and the username is unique, a new user is not created, and error code is 400", async () => {
    const newUser = {
        username: "aa",
        name: "John",
        password: "Pa$$w0rd!"
    }

    const userCountBefore = (await api.get("/api/users")).body.length
    await api.post("/api/users").send(newUser).expect(400)
    const userCountAfter = (await api.get("/api/users")).body.length
    expect(userCountAfter).toEqual(userCountBefore)
})

test("if username length is >= 3, password length is < 3 and the username is unique, a new user is not created, and error code is 400", async () => {
    const newUser = {
        username: "Username 4",
        name: "John",
        password: "xy"
    }

    const userCountBefore = (await api.get("/api/users")).body.length
    await api.post("/api/users").send(newUser).expect(400)
    const userCountAfter = (await api.get("/api/users")).body.length
    expect(userCountAfter).toEqual(userCountBefore)
})

test("if user is otherwise valid expect the username is not unique, a new user will not be created and error code is 400", async () => {
    const newUser = {
        username: "Username 1",
        name: "John",
        password: "Pa$$w0rd!"
    }

    const userCountBefore = (await api.get("/api/users")).body.length
    await api.post("/api/users").send(newUser).expect(400)
    const userCountAfter = (await api.get("/api/users")).body.length
    expect(userCountAfter).toEqual(userCountBefore)
})

afterAll(() => {
    mongoose.connection.close()
})

const initialUsers = [
    {
        _id: "5a422a851b54a676234d17f7",
        username: "Username 1",
        name: "Jimmy",
        passwordHash: "$2y$10$7rRjOZO4Jfd5YVhUh.zzvu6JovKXQ559sNP4tPD1XW65p7QIws0Gq",
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        username: "Username 2",
        name: "Bobby",
        passwordHash: "$2y$10$EpG9Bfhq0lrv5Oz1VxilM.zvsUJfKECus/CgEeU.Ugu11HLUaZxIO",
        __v: 0
    }
]

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(initialUsers)
})