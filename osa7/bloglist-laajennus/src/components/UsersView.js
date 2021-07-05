import { Link } from "react-router-dom";

const UsersView = ({ users }) => {
  if (!users) return null;
  
  return <div>
    <h2>Users</h2>
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>Blogs created</th>
        </tr>
        {users && users.map(u => (
          <tr key={u.id}>
            <td>
              <Link to={`/users/${u.id}`}>{u.name}</Link>
            </td>
            <td>{u.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
}

export default UsersView;