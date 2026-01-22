import { useState, useEffect } from "react";
import axios from "axios";

const CountrieInfo = ({ countrie }) => {
  const [weather, setWeather] = useState(null);
  const languagesArray = Object.values(countrie.languages || {});

  const capital = countrie.capital[0];
  const api_key = import.meta.env.VITE_WEATHER_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`,
      )
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.log("Error cargando el clima:", error);
      });
  }, [capital, api_key]);
  if (!weather) {
    return (
      <div>
        <h1>{countrie.name.common}</h1>
        <p>Cargando datos del clima...</p>
      </div>
    );
  } else
    return (
      <>
        <h2>{countrie.name.common} </h2>
        <ul>
          <li>Capital: {countrie.capital} </li>
          <li>Area: {countrie.area} m2</li>
        </ul>

        <h2>Lenguas</h2>
        <ul>
          {languagesArray.map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <h2>Bandera</h2>
        <img
          src={countrie.flags.svg}
          alt="Imagen bandera"
          width="150"
          height="100"
        />

        <h2>Tiempo Actual</h2>
        <ul>
          <li>Temperatura: {weather.main.temp} ºC </li>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather icon"
          />
          <li>Wind: {weather.wind.speed} m/s</li>
        </ul>
      </>
    );
};

export default CountrieInfo;
