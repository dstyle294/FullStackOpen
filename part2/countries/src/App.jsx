import { useState, useEffect } from 'react'
import countriesService from './services/countries'

// const SingleCountry = ({name, countries}) => {
//   const [weather, setWeather] = useState(null)

//   const countryObj = countries.find((country) => {
//     if (country.name.common === name) return country
//   })

  

//   console.log(countryObj)

//   if (!countryObj || !countryObj.capital) return null

//   const capital = Array.isArray(countryObj.capital) ? countryObj.capital[0] : countryObj.capital
//   console.log("About to enter useEffect for", capital)

//   useEffect(() =>{
//     countriesService
//       .getTemp(capital)
//     .then(
//       weather => {
//         setWeather(weather)
//       })
//     }, [capital])

  

//   console.log(Object.values(countryObj.languages))
//   console.log(capital)


  

  
  
//   return (
//     <div>
//       <h1>
//         {countryObj.name.common}
//       </h1>
//       <p>
//         Capital {countryObj.capital} <br />
//         Area {countryObj.area}  
//       </p>
//       <h2>
//         Languages
//       </h2>
//       <ul>
//         {Object.values(countryObj.languages).map(
//           (language) => {
//             return <li>{language}</li>
//           }
//         )}
//       </ul>
//       <img src={countryObj.flags.png} alt={'Country flag'} style={{width:'300px'}}/>
//       <h2>
//         Weather in {capital}
//       </h2>
//       Temperature {weather.main.temp} Celsius <br />
//       <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={'weather icon'} />
//       Wind {weather.wind.speed} m/s
//     </div>
//   )
// }

const SingleCountry = ({name, countries}) => {
  const [weather, setWeather] = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(true)
  const [weatherError, setWeatherError] = useState(null)

  const countryObj = countries.find((country) => {
    if (country.name.common === name) return country
  })

  console.log(countryObj)

  if (!countryObj || !countryObj.capital) return null

  const capital = Array.isArray(countryObj.capital) ? countryObj.capital[0] : countryObj.capital
  console.log("About to enter useEffect for", capital)

  useEffect(() => {
    setWeatherLoading(true)
    setWeatherError(null)
    
    countriesService
      .getTemp(capital)
      .then(weather => {
        console.log("Weather data received:", weather)
        setWeather(weather)
        setWeatherLoading(false)
      })
      .catch(error => {
        console.error("Error fetching weather:", error)
        setWeatherError(error)
        setWeatherLoading(false)
      })
  }, [capital])

  console.log(Object.values(countryObj.languages))
  console.log(capital)

  return (
    <div>
      <h1>
        {countryObj.name.common}
      </h1>
      <p>
        Capital {countryObj.capital} <br />
        Area {countryObj.area}  
      </p>
      <h2>
        Languages
      </h2>
      <ul>
        {Object.values(countryObj.languages).map((language, index) => {
          return <li key={index}>{language}</li>
        })}
      </ul>
      <img src={countryObj.flags.png} alt={'Country flag'} style={{width:'300px'}}/>
      
      <h2>
        Weather in {capital}
      </h2>
      
      
      {weather && !weatherLoading && (
        <div>
          Temperature {weather.main.temp} Celsius <br />
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={'weather icon'} /> <br />
          Wind {weather.wind.speed} m/s
        </div>
      )}
    </div>
  )
}


const App = () => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    countriesService.getAll()
    .then( countries => 
      setCountries(countries)
    )
  }, [])

  


  const handleCountryChange = (event) => {
    setCountry(event.target.value)
    setSelectedCountry(null)
  }

  const handleClick = (country) => {
    console.log(country)
  }
  
  

  const countries_names = countries.map((countryObject) => {
      return countryObject.name.common
  })

 
  const filteredList = countries_names.filter((thisCountry) => {
    console.log(thisCountry, country)
    return thisCountry.toLowerCase().includes(country)
  })

  

  console.log(filteredList)


  if (filteredList.length == 1) {
    return (
      <div>
        <form>
          find countries <input value={country} onChange={handleCountryChange} />
        </form>
        <SingleCountry name={filteredList[0]} countries={countries}  />
      </div>
    )
  } else if (filteredList.length <= 10) {
    if (selectedCountry) {
      return (
        <div>
          <form>
            find countries <input value={country} onChange={handleCountryChange} />
          </form>
          <SingleCountry name={selectedCountry} countries={countries}  /> 
        </div>
      )  
    } else {
      return (
        <div>
          <form>
            find countries <input value={country} onChange={handleCountryChange} />
          </form>
          <ul>
            {filteredList.map((item) => <div>
              {item} <button onClick={() => {setSelectedCountry(item)}}>show</button>
            </div>)}
          </ul>
        </div>
      )
    }
  } else {
    return (
      <div>
        <form>
          find countries <input value={country} onChange={handleCountryChange} />
        </form>
        Too many matches, specify another filter
      </div>
    )
  }
}

export default App
