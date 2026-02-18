import { Link } from 'react-router-dom'

const Menu = ({ loggedInUser, handleLogout }) => {
  return (
    <nav className="border-b border-slate-200 mb-8">
      <div className="container-main py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Blogs
            </Link>
            <Link to="/users" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Users
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link
              to={`/users/${loggedInUser.id}`}
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              @{loggedInUser.username}
            </Link>
            <button onClick={handleLogout} className="btn-secondary text-xs py-1.5">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Menu
