import React from 'react';

const Course = ({courses}) => {
  return (
    courses.map((course) => {
      const {name, id, parts} = course
      return (
        <div key={id}>
          <h1>{name}</h1>
          {parts.map((part) => (
            <p key={part.id}>{part.name} {part.exercises} </p>
          ))}
          <p><strong>total of {parts.reduce((sum, part) => 
            sum += part.exercises, 0)} exercises</strong></p>
        </div>
      )
    })
  )
}


export default Course;