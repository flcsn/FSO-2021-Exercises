import React from 'react'

const PersonForm = (props) => {
  const {submitHandler, nameHandler, numberHandler, newName, newNumber} = props
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          name: <input value={newName} onChange={nameHandler}/>
        </div>
        <div> 
          number: <input value={newNumber} onChange={numberHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm