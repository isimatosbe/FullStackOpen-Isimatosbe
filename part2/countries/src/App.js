import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, handler }) => (
  <div>
    Find countries <input value={filter} onChange={handler} />
  </div>  
)

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}&units=metric`

  useEffect(() => {
    axios
    .get(url)
    .then(response => {
      console.log(response)
      setWeather(response.data)
    })
  }, [])

  if (weather != null) {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
  
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
        </ul>
        
        <img src={country.flags.png} width="250" />
  
        <h2>Weather in {country.capital}</h2>
        <p>Temperature: {weather.main.temp} Celsius</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    )
  }
  
}

const CountryName = ({ country, submitHandler }) => {
  return (
    <div>
      <li >
        {country.name.common}
        <button value={country.name.common} onClick={submitHandler}>Show</button>
      </li>
    </div>
  )
}

const Countries = ({ showCountries, handler }) => {  
  if (showCountries.length > 10) {
    return (
      <div><p>Too many matches, specify another filter</p></div>
    )
  }
  else if (showCountries.length === 1) {
    return (
      <div>
        <Country country={showCountries[0]} />
      </div>
    )
  }
    
  else {
    return (
      <div>
        {showCountries.map(country => <CountryName key={country.name.common} 
                                                   country={country} 
                                                   submitHandler={handler} />)}
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
    }, [])

  const showCountries = countries.filter(country => !(country.name.common.toLowerCase().indexOf(filter.toLowerCase()) === -1))
  
  return (
    <div>
      <Filter filter={filter} handler={handleFilterChange} />
      <Countries showCountries={showCountries} countries={countries} handler={handleFilterChange}/>
    </div>
  )
}

export default App
