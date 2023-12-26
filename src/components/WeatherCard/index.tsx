import React from 'react';

interface WeatherCardProps {
  weather: {
    id: number;
    city: string;
    temperature: number;
    description: string;
  };
  unit: 'C' | 'F';
  handleFavoriteClick: () => void;
  isFavorite: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, unit, handleFavoriteClick, isFavorite }) => {
  return (
    <tr className="weather-card" data-testid={`weather-card-${weather.id}`}>
      <td>{weather.city}</td>
      <td>
        {unit === 'C' ? `${weather.temperature.toFixed(1)}°C` : `${(weather.temperature * 9 / 5 + 32).toFixed(1)}°F`}
      </td>
      <td>{weather.description}</td>
      <td>
        <button onClick={handleFavoriteClick} data-testid={`weather-card-action-${weather.id}`}>
          {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        </button>
      </td>
    </tr>
  );
};

export default WeatherCard;
