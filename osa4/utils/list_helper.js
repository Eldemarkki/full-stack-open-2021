const _ = require("lodash")

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, cur) => acc + cur.likes, 0)
}

const favoriteBlog = (blogs) => {
    let favoriteBlog = null
    let favoriteBlogLikes = 0
    blogs.forEach(blog => {
        if (blog.likes > favoriteBlogLikes) {
            favoriteBlog = blog
            favoriteBlogLikes = blog.likes
        }
    });

    return favoriteBlog
}

const mostBlogs = (blogs) => {
    let blogsPerAuthor = {}
    blogs.forEach(blog => {
        blogsPerAuthor[blog.author] = (blogsPerAuthor[blog.author] || 0) + 1
    });

    const authorNames = _.keys(blogsPerAuthor)
    const highestAuthor = _.maxBy(authorNames, name => blogsPerAuthor[name])

    return { author: highestAuthor, blogs: blogsPerAuthor[highestAuthor] || 0 }
}

const mostLikes = (blogs) => {
    let likesPerAuthor = {}
    blogs.forEach(blog => {
        likesPerAuthor[blog.author] = (likesPerAuthor[blog.author] || 0) + blog.likes
    });

    const authorNames = _.keys(likesPerAuthor)
    const highestAuthor = _.maxBy(authorNames, name => likesPerAuthor[name])

    return { author: highestAuthor, likes: likesPerAuthor[highestAuthor] || 0 }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}