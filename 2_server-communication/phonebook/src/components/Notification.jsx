const Notification = ({ message, type }) => {
  if (!message) {
    return null
  }

  const baseStyle = {
    margin: '1rem 0',
    padding: '1rem',
    borderRadius: '5px'
  }

  const successStyle = {
    ...baseStyle,
    color: 'green',
    backgroundColor: 'lightgreen',
    border: '2px solid green'
  }

  const errorStyle = {
    ...baseStyle,
    color: 'red',
    backgroundColor: 'lightcoral',
    border: '2px solid red'
  }

  const notificationStyle = type === 'success' ? successStyle : errorStyle

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification
