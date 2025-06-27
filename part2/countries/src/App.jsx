import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const SingleCountry = ({name, countries}) => {
  console.log(name)
  const countryObj = countries.find((country) => {

    if (country.name.common === name) return country
  })
  console.log(Object.values(countryObj.languages))
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
        {Object.values(countryObj.languages).map(
          (language) => {
            return <li>{language}</li>
          }
        )}
      </ul>
      <img src={countryObj.flags.png} alt={'Country flag'} style={{width:'300px'}}/>
    </div>
  )
}

function App() {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countriesService.getAll()
    .then( countries => 
      setCountries(countries)
    )
  }, [])


  const handleCountryChange = (event) => {
    setCountry(event.target.value)
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
        <SingleCountry name={filteredList[0]} countries={countries} />
      </div>
    )
  } else if (filteredList.length <= 10) {
    return (
      <div>
        <form>
          find countries <input value={country} onChange={handleCountryChange} />
        </form>
        <ul>
          {filteredList.map((item) => <div>{item}</div>)}
        </ul>
      </div>
    )
    
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
