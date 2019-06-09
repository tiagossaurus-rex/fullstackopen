import React, { useState } from 'react'
import axios from 'axios';


const Filter = ({value, handleChange}) => {
	return (
		<div>
			filter: 
			<input value={value} onChange={e => handleChange(e.target.value.toLowerCase())}/>
			<button onClick={() => handleChange('')}>x</button>
		</div>
	)
}

const CountryButton = ({setFilter, country})=> {
	return ( 
		<p>
			{country.name} 
			<button onClick={() => setFilter(country.name.toLowerCase())}>show</button>
		</p>
	)
}

const Weather = ({city}) => {
	const [ weather, setWeather] = useState(null)
	
	useState(() => {
		axios
        .get(`https://api.apixu.com/v1/current.json?key=3273f1216e324ff4b25221522190906&q=${city}`)
        .then(response => {
			console.log(response);
            setWeather(response.data.current)
        })
	}, [])

	if ( !weather ) return null;

	return (
		<>
			<h4>{`Weather in ${city}`}</h4>
			<p>{`temperature: ${weather.temp_c} Celsus`}</p>
			<img alt={weather.condition.text} src={weather.condition.icon} />
			<p>{`wind: ${weather.wind_kph} direction  ${weather.wind_dir}`}</p>
		</>

	)
}

const CountryInfo = ({country})=> {

	const {
		capital,
		languages,
		population,
		name,
		flag,
	} = country

	return ( 
		<>
			<h2>{name}</h2>
			<p>{`capital: ${capital}`}</p>
			<p>{`population: ${population}`}</p>
			<h4>Languages</h4>
			<ul>
				{
					languages.map((lang => <li key={lang.name}>{lang.name}</li>))
				}
			</ul>
			<h4>Flag</h4>
			<img alt={`${name} flag`} src={flag} width="200" />

			<Weather city={country.capital} />
		</>
	)
}


const Countries = ({countries, filter, setFilter}) => {

	if ( !countries ) return null;

	const filtered = countries.filter(({name}) => name.toLowerCase().indexOf(filter) !== -1 )

	if ( !filter || filtered.length > 10 ) {
		return <p>Too many matches, please change the filter</p>
	}
	else if ( filtered.length === 1 ) {
		return filtered.map((country) => <CountryInfo key={country.name} country={country} />)
	}
	else if ( filtered.length === 0 ) {
		return <p>No matches</p>
	}
	else {
		return filtered.map((country) => <CountryButton key={country.name} setFilter={setFilter} country={country} />)
	}
}


const App = () => {
	const [ countries, setCountries] = useState([])
	const [ filter, setFilter ] = useState('')

	useState(() => {
		axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            setCountries(response.data)
        })
	}, [])


	return (
		<div>
			<h2>Find countries</h2>

			<Filter value={filter} handleChange={setFilter} />

			{ countries && <Countries countries={countries} filter={filter} setFilter={setFilter} /> }

		</div>
	)
}

export default App