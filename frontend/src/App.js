import React, { useState, useEffect } from 'react';
import axios from 'axios';



const WeatherApp = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [weatherSummary, setWeatherSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    // Fetching list of cities from the API
    const fetchCities = async () => {
      try {
        const url = 'http://localhost:3001/api/envista/stations'
        const response = await axios.get(url);
        setCities(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const dateArray = selectedDate.split("-");
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];
    const stationNum = selectedCity;
    try {
      const response = await axios.get(`http://localhost:3001/getWeather/${stationNum}/${year}/${month}/${day}`);
      console.log(response.data)

      setWeatherSummary(response.data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>מערכת תחזית מזג אוויר</h1>
      <form onSubmit={handleSubmit}>
        <label>
          בחר עיר:
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            <option value="">Select</option>
            {cities.map((city) => (
              <option key={city.stationId} value={city.stationId}>
                {city.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          בחר תאריך:
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
        </label>
        <button type="submit" disabled={!selectedCity || !selectedDate}>
          קבלו סיכום מזג אוויר
        </button>
      </form>
      {loading && <p>טוען...</p>}
      {error && <p>שגיאה: {error}</p>}
      {weatherSummary && (
        <div>
          <h2>סיכום מזג האוויר עבור {selectedCity} ב {selectedDate}</h2>
          <p>טמפרטורה ממוצעת: {weatherSummary.temperature}</p>
          <p>Rainfall: {weatherSummary.rainfall}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;