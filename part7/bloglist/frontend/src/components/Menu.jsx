import { Link } from 'react-router-dom'

const Menu = ({ style }) => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div style={style}>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
    </div>
  )
}

export default Menu
