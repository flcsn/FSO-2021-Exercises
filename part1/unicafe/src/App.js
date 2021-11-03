import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  if (total === 0) return <p>No feedback given</p>
  return (
    <div>
      <table>
        <tr>
          <td>good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>all</td>
          <td>{total}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{(good-bad)/total}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{good/total} %</td>
        </tr>
      </table>
    </div>
  )
}

/*const StatisticLine = ({text, value, addtl}) => (
  <div>
    <p>{text} {value} {addtl}</p>
  </div>
)*/

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickGood = () => setGood(good+1)
  const clickNeutral = () => setNeutral(neutral+1)
  const clickBad = () => setBad(bad+1)

  return (
    <div>
      <h1>give feedback</h1>
        <Button handleClick={clickGood} text="good"/>
        <Button handleClick={clickNeutral} text="neutral"/>
        <Button handleClick={clickBad} text="bad"/>
      <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App