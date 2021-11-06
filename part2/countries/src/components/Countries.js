import React from 'react'
import CountryInfo from './CountryInfo'
import FilteredResults from './FilteredResults'


const Countries = ({countrySet, query}) => {
  if (query.length === 0) 
    return <p>Enter a filter</p>

  const q = query.toUpperCase()
  const result = countrySet.filter(country => 
    country.name.common.toUpperCase().includes(q))

  if (result.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if (result.length > 1 && result.length <= 10) {
    return (
    <div>
      {result.map((country, i) => <FilteredResults key={i} country={country}/>)}
    </div>
    )
  } else if (result.length === 1) {
    const country = result[0]
    return (
      <CountryInfo country={country} />
    )
  } 
  else return null
}

export default Countries;
