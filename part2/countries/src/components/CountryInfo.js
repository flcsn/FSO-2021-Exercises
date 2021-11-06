import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryInfo = ({country}) => {
  const [weather, setWeather] = useState({
    temperature : undefined,
    icons : [],
    wind_speed : undefined,
    wind_dir : undefined
  })
  const name = country.name.common
  const languages = []
  for (let lang in country.languages)
    languages.push(country.languages[lang])

  const URL = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${name}`
  const hook = () => {
    axios.get(URL)
      .then(response => {
        const data = response.data
        console.log(`the weather in ${name} is `, data)
        setWeather({
          temperature : data.current.temperature,
          icons : data.current.weather_icons,
          wind_speed : data.current.wind_speed,
          wind_dir : data.current.wind_dir
        })
      })
  }

  useEffect(hook, [])

  return (
    <div>
      <h1>{name}</h1>
      <p>{country.capital}</p>
      <p>{country.subregion}</p>
      <h1>Spoken languages</h1>
      <ul>
        {languages.map((language, i) => <li key={i}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={`the flag of ${name}`}/>
      <h1>Weather in {name}</h1>
      <p><strong>temperature:</strong> {weather.temperature}</p>
      {weather.icons.map((icon, i) => <img key={i} src={`${icon}`} alt={`a weather icon`}/>)}
      <p><strong>wind: </strong>{`${weather.wind_speed} mph direction ${weather.wind_dir}`}</p>
    </div>
  ) 
}

export default CountryInfo;