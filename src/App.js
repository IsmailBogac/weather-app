import axios from "axios";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=dcbb4b51c3b341e7815121707231612&q=${location}a&days=8&aqi=yes&alerts=yes`
        );
        setWeatherData(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    if (location) {
      fetchData();
    }
  }, [location]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div className="App">
      <div className="title">
        <h1>Hava Durumu</h1>
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Şehir Giriniz."
          value={location}
          onChange={handleLocationChange}
        />

        {weatherData && (
          <div className="weather-container">
            {weatherData.forecast.forecastday.map((day) => (
              <div key={day.date} className="weather-detail">
                <h2>{day.date}</h2>
                <p>{day.day.condition.text}</p>
                <img src={day.day.condition.icon} alt="" />
                <p>{day.day.avgtemp_c} C</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
