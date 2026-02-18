import { useUsers } from '../hooks/useUsers'
import { Link } from 'react-router-dom'

const Users = () => {
  const { users } = useUsers()

  return (
    <div>
      <h2>all users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>
                  {user.name} (@{user.username})
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
