import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
  const [ visible, setVisible ] = useState(false)
  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  if (visible) {
    return (
      <div>
        {props.children}
        <button onClick={toggleVisibility}>hide</button>
      </div>
    )
  }

  return (
    <button onClick={toggleVisibility}>{props.buttonLabel}</button>
  )
})

export default Togglable