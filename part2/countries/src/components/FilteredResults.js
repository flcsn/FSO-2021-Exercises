import React, {useState} from 'react'
import CountryInfo from './CountryInfo'


const FilteredResults = ({country}) => {
  const [show, setShow] = useState(false)

  const handleClick = (event) => setShow(!show)

  return (
    <div>
      <p>
        {country.name.common}
        <button onClick={handleClick}>{show ? 'hide' : 'show'}</button>
      </p>
      {show && <CountryInfo country={country} />}
    </div>
  )
}

export default FilteredResults;