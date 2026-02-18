import { useUsers } from '../hooks/useUsers'
import { Link } from 'react-router-dom'

const Users = () => {
  const { users } = useUsers()

  return (
    <div className="container-main">
      <h1 className="mb-6">All Users</h1>
      <div className="card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left pb-3 font-medium text-slate-500">User</th>
              <th className="text-left pb-3 font-medium text-slate-500">Blogs</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
              >
                <td className="py-3">
                  <Link to={`/users/${user.id}`} className="font-medium hover:underline">
                    {user.name}
                  </Link>
                  <span className="text-slate-400 ml-1.5">@{user.username}</span>
                </td>
                <td className="py-3 text-slate-600">{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users
