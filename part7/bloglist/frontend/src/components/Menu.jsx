import { Link } from 'react-router-dom'

const Menu = ({ loggedInUser, handleLogout }) => {
  const menuStyle = {
    marginBottom: 30,
    backgroundColor: 'lightgray',
    padding: 10,
  }

  const itemPadding = {
    paddingRight: 10,
  }

  return (
    <div style={menuStyle}>
      <Link style={itemPadding} to="/">
        blogs
      </Link>
      <Link style={itemPadding} to="/users">
        users
      </Link>
      <Link style={itemPadding} to={`/users/${loggedInUser.id}`}>
        @{loggedInUser.username}
      </Link>
      <button style={itemPadding} onClick={handleLogout}>
        logout
      </button>
    </div>
  )
}

export default Menu
