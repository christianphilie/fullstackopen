import { Link } from 'react-router-dom'

const Menu = ({ style, loggedInUserId }) => {
  const padding = {
    paddingRight: 10,
  }

  return (
    <div style={style}>
      <Link style={padding} to="/">
        all blogs
      </Link>
      <Link style={padding} to={`/users/${loggedInUserId}`}>
        my blogs
      </Link>
      <Link style={padding} to="/users">
        all users
      </Link>
    </div>
  )
}

export default Menu
