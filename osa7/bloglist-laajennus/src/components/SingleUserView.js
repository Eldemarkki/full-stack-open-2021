const SingleUserView = ({ user }) => {
  if (user === null || user === undefined) return null;
console.log(user.blogs)
  return <div>
    <h2>{user.name}</h2>
    <h3>Added blogs</h3>
    <ul>
      {user.blogs.map(blog => (
        <li key={blog.title}>{blog.title}</li>
      ))}
    </ul>
  </div>
}

export default SingleUserView