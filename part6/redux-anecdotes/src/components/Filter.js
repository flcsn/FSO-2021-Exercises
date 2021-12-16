import React from 'react'
import { connect } from 'react-redux'
import { type } from '../reducers/filterReducer'

const Filter = (props) => {
  const filter = props.filter
  
  const handleChange = (event) => props.type(event.target.value)
  const style = { marginBottom: 10 }

  return (
    <div style={style}>
      filter <input value={filter} onChange={handleChange} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const ConnectedFilter = connect(mapStateToProps, { type })(Filter)

export default ConnectedFilter