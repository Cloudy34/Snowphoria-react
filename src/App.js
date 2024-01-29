import React, { useState } from 'react';
import Header from './components/Header.js';

const api = {
  key: "740679ffa8b0e196df723e48c9394e8c",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt =>{
    if(evt.key === "Enter"){
      fetch (`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result =>{ 
      setWeather(result);
      setQuery('');
      console.log(result);
      }); 

    }
  }

  const dateBuilder= (d) =>{
  let months =["January","February","March","April",
  "May","June","July","August","September",
  "October","November","December"];

  let days=["Sunday","Monday","Tuesday",
  "Wednesday","Thursday","Friday","Saturday"];
  
  let day = days[d.getDay()];
  let date= d.getDate();
  let month=months[d.getMonth()];
  let year=d.getFullYear();

  return `${day} ${date} ${month} ${year}`

  }
  return (
    
    <div className={
      (typeof weather.main !="undefined") ?
      ((weather.main.temp > 30) ? 'app sunny' :
  (weather.main.temp > 16 && weather.main.temp < 30) ? 'app warm' :
   (weather.main.temp > 2 && weather.main.temp < 15) ? 'app cloudy' :
    (weather.main.temp < 1) ? 'app rain' :
    'app rain'):'app warm'
  }>
    <Header />
      <main>
        <div className='search-box'> 
          <input
          type='text'
          className='search-bar'
          placeholder='Search Here...'
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyDown={search}
          

          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className='location-box'>
            <div className='location'>{weather.name},{weather.sys.country}</div>
            <div className='date'>{dateBuilder(new Date())}</div>
  
          </div>
          <div className='weather-box'>
          <div className='temp'>
           {Math.round(weather.main.temp)}°c
          </div>
            <div className='weather'>
            {weather.weather[0].main}

            </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
// Day-1 - 15:52- tyler potts 
