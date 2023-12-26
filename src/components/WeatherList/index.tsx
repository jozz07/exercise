import React, { useState } from 'react';
import { Weather, weatherData } from '../../data/weatherData';
import WeatherCard from '../WeatherCard';
import './index.css';

const WeatherList: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Array<Weather>>([]);
  const [favoriteCities, setFavoriteCities] = useState<Array<Weather>>([]);
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  const filteredResults = () => {
    const filteredResults = weatherData.filter(city =>
      city.city.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setSearchInput(input);
    filteredResults();
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchResults([]);
  };

  const handleUnitChange = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  const handleAddFavorite = (city: Weather) => {
    setFavoriteCities([...favoriteCities, city]);
  };

  const handleRemoveFavorite = (city: Weather) => {
    const updatedFavorites = favoriteCities.filter(favCity => favCity.id !== city.id);
    setFavoriteCities(updatedFavorites);
  };

  return (
    <div className="layout-column align-items-center justify-content-start weather-list" data-testid="weather-list">
      <h3>Dashboard</h3>
      <p className="city-details">Search for Current Temperature in cities like: New York, London, Paris etc.</p>
      <div className="card w-300 pt-20 pb-5 mt-5">
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <input
            type="text"
            placeholder="Search city"
            onChange={handleSearchInputChange}
            value={searchInput}
            data-testid="search-input"
          />
          <button onClick={handleClearSearch} data-testid="clear-search-button">
            Clear search
          </button>
        </section>
        <table className="table search-results">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((city) => (
              <WeatherCard
                key={city.id}
                weather={city}
                unit={unit}
                handleFavoriteClick={() => handleAddFavorite(city)}
                isFavorite={false}
              />
            ))}
          </tbody>
        </table>
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <button onClick={handleUnitChange} data-testid="unit-change-button" className="outlined">
            Switch to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}
          </button>
        </section>
      </div>
      <h3>Favourite Cities</h3>
      <div className="card w-300 pt-20 pb-5">
        <table className="table favorites">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {favoriteCities.map((city) => (
              <WeatherCard
                key={city.id}
                weather={city}
                unit={unit}
                handleFavoriteClick={() => handleRemoveFavorite(city)}
                isFavorite={true}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherList;
