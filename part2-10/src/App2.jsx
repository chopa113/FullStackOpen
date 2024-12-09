import React, { useEffect, useState } from 'react';


const AboutCountry = ({ country }) => {
    return (
        <div>
            <div key={country.cca3}>
                <h2>{country.name.common}</h2>
                <p>Capital: {country.capital}</p>
                <p>Area: {country.area} km²</p>
                <p>
                    <b>Languages: </b>
                    {Object.values(country.languages || {}).join(', ')}
                </p>
                <img src={country.flags.png} width="150px" height="150px" alt={`Flag of ${country.name.common}`} />
            </div>
        </div>
    );
};

const Weather = ({ country }) => {
        const [weather, setWeather] = useState(null);
    
        useEffect(() => {
            if (country.capital) {
                fetch('https://api.openweathermap.org/data/2.5/weather?q='+country.capital+'&appid=b1b15e88fa797225412429c1c50c122a1')
                    .then((response) => response.json())
                    .then((data) => {
                        setWeather(data);
                    })
                    .catch((error) => console.error('Error fetching weather data:', error));
            }
        }, [country.capital]);
    
        if (!weather) return <p>Loading weather...</p>;
    
        
        return (
            <div>
                <p>Temperature: {parseFloat(weather.main.temp-273.15).toFixed(2)}°C</p>
                <p><img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} /></p>
                <p>Wind: {weather.wind.speed} m/s</p>
            </div>
        );
    };
    

function App2() {
    const [countries, setCountries] = useState([]);
    const [filter, setFilter] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then((response) => response.json())
            .then((data) => {
                setCountries(data);
            })
            .catch((error) => console.error('Error fetching country data:', error));
    }, []);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
    );

    const handleClick = (country) => {
        setSelectedCountry(country);
    };

    return (
        <div>
            <div>
                <label>
                    Filter shown with{' '}
                    <input
                        type="text"
                        value={filter}
                        onChange={handleFilterChange}
                        placeholder="Search for a country"
                    />
                </label>
            </div>
            <div>
                {filteredCountries.length === 0 && <p>No matches found</p>}
                {filteredCountries.length > 10 && (
                    <p>Too many matches, specify a more specific query</p>
                )}
                {filteredCountries.length <= 10 && filteredCountries.length > 1 && (
                    <ul>
                        {filteredCountries.map((country) => (
                            <li key={country.cca3}>
                                {country.name.common}
                                <button onClick={() => handleClick(country)}>show</button>
                            </li>
                        ))}
                    </ul>
                )}
                {filteredCountries.length === 1 && (
                    <div>
                        {filteredCountries.map((country) => (
                            <div key={country.cca3}>
                                <AboutCountry country={country} />
                                <p><b>Weather in {country.name.common}</b></p>
                                <Weather country={country} />
                            </div>
                        ))}
                    </div>
                )}
                {selectedCountry && (
                    <div>
                        <AboutCountry country={selectedCountry} />
                        <p><b>Weather in {selectedCountry.name.common}</b></p>
                        <Weather country={selectedCountry} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App2;
