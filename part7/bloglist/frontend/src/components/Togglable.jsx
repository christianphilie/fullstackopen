import { useState, useImperativeHandle } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
  })

  return (
    <>
      {!visible && (
        <button onClick={toggleVisibility} className="btn-primary mb-4">
          {props.buttonLabel}
        </button>
      )}
      {visible && (
        <div className="card mb-4">
          {props.children}
          <button onClick={toggleVisibility} className="btn-secondary mt-4">
            Cancel
          </button>
        </div>
      )}
    </>
  )
}

export default Togglable
