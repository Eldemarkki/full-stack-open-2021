const jwt = require("jsonwebtoken")
const User = require("../models/user")

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === "CastError") {
        return response.status(400).json({ error: "Malformatted id" })
    }
    if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message })
    }
    if (error.name === "JsonWebTokenError") {
        return response.status(401).json({ error: "Invalid token" })
    }

    next(error)
}

const getTokenFrom = request => {
    const auth = request.get("authorization")

    if (auth && auth.toLowerCase().startsWith("bearer ")) {
        return auth.substring(7)
    }

    return null
}

const tokenExtractor = (request, response, next) => {
    request.token = getTokenFrom(request)
    next()
}

const userExtractor = async (request, response, next) => {
    const token = request.token
    let decodedToken = undefined
    try {
        decodedToken = jwt.verify(token, process.env.SECRET)
    }
    catch {
        return response.status(401).json({ error: "Token missing or invalid" })
    }

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: "Token missing or invalid" })
    }

    const user = await User.findById(decodedToken.id);
    request.user = user

    next()
}

module.exports = { errorHandler, tokenExtractor, userExtractor }