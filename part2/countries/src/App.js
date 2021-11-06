import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [query, setQuery] = useState('')
  const [countrySet, setCountrySet] = useState([])

  const handleQueryChange = (event) => setQuery(event.target.value)

  const hook = () => {
    axios.get("https://restcountries.com/v3.1/all")
      .then(response => {
        const data = response.data
        console.log("response is ", data)
        setCountrySet(data)
      })
  }

  useEffect(hook, [])

  return (
    <div>
      <p>find countries <input value={query} onChange={handleQueryChange}/></p>
      <Countries countrySet={countrySet} query={query} />
    </div>
  )
}

export default App;
