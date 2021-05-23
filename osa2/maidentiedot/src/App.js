import React, { useState, useEffect } from 'react'
import axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY

// http://snowfence.umn.edu/Components/winddirectionanddegrees.htm
const getWindDirection = (windDegree) => {
  if (windDegree >= 348.75 || windDegree < 11.25)
    return "N"
  if (windDegree >= 11.25 && windDegree < 33.75)
    return "NNE"
  if (windDegree >= 33.75 && windDegree < 56.25)
    return "NE"
  if (windDegree >= 56.25 && windDegree < 78.75)
    return "ENE"
  if (windDegree >= 78.75 && windDegree < 101.25)
    return "E"
  if (windDegree >= 101.25 && windDegree < 123.75)
    return "ESE"
  if (windDegree >= 123.75 && windDegree < 146.25)
    return "SE"
  if (windDegree >= 146.25 && windDegree < 168.75)
    return "SSE"
  if (windDegree >= 168.75 && windDegree < 191.25)
    return "S"
  if (windDegree >= 191.25 && windDegree < 213.75)
    return "SSW"
  if (windDegree >= 213.75 && windDegree < 236.25)
    return "SW"
  if (windDegree >= 236.25 && windDegree < 258.75)
    return "WSW"
  if (windDegree >= 258.75 && windDegree < 281.25)
    return "W"
  if (windDegree >= 281.25 && windDegree < 303.75)
    return "WNW"
  if (windDegree >= 303.75 && windDegree < 326.25)
    return "NW"
  if (windDegree >= 326.25 && windDegree < 348.75)
    return "NNW"
  return `Couldn't get direction for ${windDegree} degrees`
}

const WeatherInfo = ({ city }) => {
  const [weatherData, setWeatherData] = useState({})

  const weatherSourceUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  if (Object.keys(weatherData).length === 0) {
    axios
      .get(weatherSourceUrl)
      .then((response) => {
        setWeatherData(response.data);
      })
    return <p>Loading weather data...</p>
  }

  const temperature = weatherData.main.temp
  const weatherIcon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
  const windSpeed = weatherData.wind.speed
  const windDirection = getWindDirection(weatherData.wind.deg)

  return (
    <>
      <h2>Weather in {city}</h2>
      <p><strong>Temperature: </strong> {temperature} Celsius</p>
      <img src={weatherIcon} />
      <p><strong>Wind:</strong> {windSpeed} m/s direction {windDirection}</p>
    </>
  )
}

const CountryList = ({ countries, nameFilter, overrideCountry, setOverrideCountry }) => {
  let filteredCountries = countries.filter(c => c.name.toLowerCase().includes(nameFilter.toLowerCase()))
  if (overrideCountry.length !== 0) {
    const country = countries.find(c => c.name === overrideCountry)
    filteredCountries = [country]
  }

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  else if (filteredCountries.length === 1) {
    const country = filteredCountries[0]

    return (
      <div>
        <h1>{country.name}</h1>
        <p>Capital {country.capital}</p>
        <p>Population {country.population}</p>
        <h2>Languages</h2>
        <ul>
          {
            country.languages.map(l => <li key={l.name}>{l.name}</li>)
          }
        </ul>
        <img src={country.flag} alt={`Flag of ${country.name}`} style={{ width: "200px" }} />
        <WeatherInfo city={country.capital} />
      </div>)
  }
  else {
    return (
      <>
        {
          filteredCountries.map(c => {
            return (
              <div key={c.name} style={{ display: "block" }}>
                <p style={{ display: "inline" }}>{c.name}</p>
                <button onClick={() => setOverrideCountry(c.name)} style={{ display: "inline" }}>show</button>
              </div>)
          })
        }
      </>
    )
  }
}

const App = () => {
  const [nameFilter, setNameFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [overrideCountry, setOverrideCountry] = useState('')
  const countryUrl = "https://restcountries.eu/rest/v2/all"
  const onNameFilterChanged = (event) => {
    setNameFilter(event.target.value)
    setOverrideCountry('')
  }

  useEffect(() => {
    axios
      .get(countryUrl)
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <div>Find countries: <input value={nameFilter} onChange={onNameFilterChanged} /> </div>
      <CountryList countries={countries} nameFilter={nameFilter} overrideCountry={overrideCountry} setOverrideCountry={setOverrideCountry} />
    </div>
  );
}

export default App;
