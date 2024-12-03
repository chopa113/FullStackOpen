import React, { useEffect, useState } from 'react';

function App2() {
    const [countries, setCountries] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
            fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
                .then((response) => response.json())
                .then((data) => {
                    setCountries(data);
                })
                .catch((error) => console.error('Error fetching country data:', error));
    }, []);

    const Weather = ({ country }) => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + country.name.common + '&appid =' + process.env.REACT_APP_API_KEY)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => console.error('Error fetching weather data:', error));
    }


    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <div>
                filter shown with{' '}
                <input
                    type="text"
                    value={filter}
                    onChange={handleFilterChange}
                    placeholder="Search for a country"
                />
            </div>
            <div>
                {filteredCountries.length === 0 && <p>No matches found</p>}
                {filteredCountries.length > 10 && <p>Too many matches, specify a more specific query</p>}
                {filteredCountries.length <= 10 && filteredCountries.length > 1 && (
                    <ul>
                        {filteredCountries.map((country) => (
                            <li key={country.cca3}>
                                {country.name.common} <img src={country.flags[0]} width="30" />
                            </li>
                        ))}
                    </ul>
                )}
                {filteredCountries.length === 1 && (
                    <div>
                        {filteredCountries.map((country) => (
                            <div key={country.cca3}>
                                <h2>{country.name.common}</h2>
                                <p>Capital: {country.capital}</p>
                                <p>Area: {country.area}</p>
                                <p>Languages: {Object.values(country.languages || {}).join(', ')}</p>
                                {console.log(country.flags[1])}
                                <img src={country.flags.png}  width="150px" height="150px" />
                                <p>Weather in {country.name.common}</p>
                                <Weather country={country} />

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App2;
