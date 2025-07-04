import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const specificCountryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'
const api_key = import.meta.env.VITE_SOME_KEY

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getTemp = (city) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
    console.log(request)
    return request.then(response => response.data)
} 

export default { getAll, getTemp }