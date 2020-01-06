import React from 'react';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const key = '715b732345d2d5c0291c7ce2d4f2263d';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.changeUnits = this.changeUnits.bind(this);
    this.degreeToDirection = this.degreeToDirection.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.getBg = this.getBg.bind(this);

    this.state = {
      isLoaded: false,
      units: 'metric',
      unitsTempText: 'C',
      unitsWindText: 'm/s',
      location: "",
      lon: null,
      lat: null,
      weather: null,
      weatherDesc: null,
      temp: null,
      tempFeelsLike: null,
      tempHumidity: null,
      tempPressure: null,
      windSpeed: null,
      windDeg: null,
      clouds: null,
      locationName: null,
      locationCountry: null,
      date: null
    };
  }
  
  componentWillMount(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=wrocław&units=' + this.state.units + '&APPID=' + key)
    .then(result => {
      if (result.ok){
        return result
      } throw Error('something went wrong')
    })
    .then(result => result.json())
    .then(result => this.setState({
      isLoaded: true,
       lon: result.coord.lon,
       lat: result.coord.lat,
       weatherDesc: result.weather[0].description,
       tempHumidity: result.main.humidity,
       tempPressure: result.main.pressure,
       windSpeed: result.wind.speed,
       windDeg: result.wind.deg,
       clouds: result.clouds.all,

       locationName: result.name,
       locationCountry: result.sys.country,
       temp: result.main.temp.toFixed(0),
       tempFeelsLike: result.main.feels_like.toFixed(0),
       weather: result.weather[0].main,
    }))

  }

  // handle submit, fetching data
  onSubmit(e) {
    e.preventDefault();

    var location = this.state.location;

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=' + this.state.units + '&APPID=' + key)
    .then(result => {
      if (result.ok){
        return result
      } throw Error('something went wrong')
    })
    .then(result => result.json())
    .then(result => this.setState({
      isLoaded: true,
       lon: result.coord.lon,
       lat: result.coord.lat,

       locationName: result.name,
       locationCountry: result.sys.country,
       temp: result.main.temp.toFixed(0),
       tempFeelsLike: result.main.feels_like.toFixed(0),
       weather: result.weather[0].main,
       clouds: result.clouds.all,
       tempHumidity: result.main.humidity,
       tempPressure: result.main.pressure,
       windSpeed: result.wind.speed,
       windDeg: result.wind.deg,
       weatherDesc: result.weather[0].description,
    }))
    .catch(err => alert('Location named ' + location + ' doesn\'t exist'))

  }

  // chnage units to metric/imperial
  changeUnits(){
    this.state.units === 'imperial' ? this.setState({
      units: 'metric',
      unitsTempText: 'C',
      unitsWindText: 'm/s',
      windSpeed: (this.state.windSpeed / 2.237).toFixed(2),
      temp: (((this.state.temp - 32) * 5 ) / 9).toFixed(0),
      tempFeelsLike: (((this.state.tempFeelsLike - 32) * 5 ) / 9).toFixed(0),
    })
     : this.setState({
      units: 'imperial',
      unitsTempText: 'F',
      unitsWindText: 'mph',
      windSpeed: (this.state.windSpeed * 2.237).toFixed(2),
      temp: (((this.state.temp * 9) / 5) + 32).toFixed(0),
      tempFeelsLike: (((this.state.tempFeelsLike * 9) / 5) + 32).toFixed(0),
    });
  }

  degreeToDirection(num) {
    var val = Math.floor((num/22.5) + 0.5);
    var directions =["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
    return directions[val % 16];
  }

  onFocus(){
    this.setState({focus: 'focused'})
    this.state.location !== "" ? this.setState({filled: 'filled'}) : this.setState({filled: false})
  }
  onBlur(){
    this.state.location !== "" ? this.setState({filled: 'filled'}) : this.setState({filled: false})
    this.setState({focus: false})
  }
  

    
  getBg(){

    let bgStyle;
    let weather = this.state.weather;

    if(weather === 'Clouds'){
      const imageUrl = require(`./imgs/clouds.jpg`)
      bgStyle =  { backgroundImage: `url(${imageUrl})` }
    } 
    else if (weather === 'Clear'){
      const imageUrl = require(`./imgs/clear.jpg`)
      bgStyle =  { backgroundImage: `url(${imageUrl})` }
    }
    else if (weather === ('Rain' || 'Drizzle')){
      const imageUrl = require(`./imgs/rain.jpg`)
      bgStyle =  { backgroundImage: `url(${imageUrl})` }
    }
    else if (weather === 'Thunderstorm'){
      const imageUrl = require(`./imgs/thunderstorm.jpg`)
      bgStyle =  { backgroundImage: `url(${imageUrl})` }
    }
    else if (weather === 'Snow'){
      const imageUrl = require(`./imgs/snow.jpg`)
      bgStyle =  { backgroundImage: `url(${imageUrl})` }
    }
    else if (weather === 'Fog' ){
      const imageUrl = require(`./imgs/fog.jpg`)
      bgStyle =  { backgroundImage: `url(${imageUrl})` }
    }
    else if (weather === 'Haze' ){
      const imageUrl = require(`./imgs/fog.jpg`)
      bgStyle =  { backgroundImage: `url(${imageUrl})` }
    }
    else if (weather === 'Mist' ){
      const imageUrl = require(`./imgs/fog.jpg`)
      bgStyle =  { backgroundImage: `url(${imageUrl})` }
    }
    else if (weather === 'Tornado'){
      const imageUrl = require(`./imgs/tornado.jpg`)
      bgStyle =  { backgroundImage: `url(${imageUrl})` }
    }
    else if (weather === 'Ash'){
      const imageUrl = require(`./imgs/volcanicAsh.jpg`)
      bgStyle =  { backgroundImage: `url(${imageUrl})` }
    }
    else{
      const imageUrl = require(`./imgs/default.jpg`)
      bgStyle =  { backgroundImage: `url(${imageUrl})` }
    }

    return bgStyle
  }

  render(){
    return (
        <div className="main" style={this.getBg()}>
          <div className="nav">
            <form>
             <button onClick={this.onSubmit}><FontAwesomeIcon icon={faSearch}/></button>
             <div className="formWrap">
              <span className={'form-line ' + this.state.focus + ' ' + this.state.filled}></span>
                <span className="text-wrap">
                <input onFocus={this.onFocus} onBlur={this.onBlur} onChange={(e) => this.setState({ location: e.target.value})}></input>
              </span>
             </div>
            </form>
            <div className="changeUnitsWrapper">
              <button onClick={this.changeUnits}>&deg;{this.state.units === 'imperial' ? 'C' : 'F'}</button>
            </div>
          </div>

          <div className="insideWrapper">
            <div className="top">
              <div className="location"> {this.state.locationName}, {this.state.locationCountry} </div>
              <div className="tempDate"> 
                <div className="temp"> {this.state.temp } &deg; </div>
                <div className="dateTime"><Moment className="time" format="HH:mm"></Moment></div>
              </div>
              <div className="feels">Feels more like {this.state.tempFeelsLike} &deg; {this.state.unitsTempText}</div>
            </div>

            <div className="center">
             <div className="info">
               <div className="pressure">
                 <div className="infoTopText">{this.state.tempPressure} hPa</div>
                 <div className="infoBotText">Pressure</div>
               </div>
               <div className="humidity">
                <div className="infoTopText">{this.state.tempHumidity} %</div>
                <div className="infoBotText">Humidity</div>
               </div>
               <div className="cloudiness">
                <div className="infoTopText">{this.state.clouds} %</div>
                <div className="infoBotText">Cloudiness</div>
               </div>
             </div>
             <div className="windWrap"> 
              <div className="windTitle">Wind</div>
              <div className="windData">{this.state.windSpeed}  {this.state.unitsWindText} {this.degreeToDirection(this.state.windDeg)} ({this.state.windDeg}&deg;)</div>
             </div>
            </div>

            <div className="bottom">
              <div className="condition">Today's weather condition is {this.state.weather}.</div>
            </div>
          </div>

        </div>
      );
  }
}

export default App;



/*
<div>---
              <div>Location: {this.state.locationName}, {this.state.locationCountry}</div>
              <div>LocationLonLat: {this.state.lon}, {this.state.lat}</div>
              <div>Date: {this.state.date}</div>
              <Moment format="HH:mm"></Moment>
              <div>Temp: {this.state.temp} &deg; {this.state.unitsTempText} </div>
              <div>TempFeelslike: {this.state.tempFeelsLike} &deg; {this.state.unitsTempText} </div>
              <div>Condition: {this.state.weather}</div>
              <div>ConditionDesc: {this.state.weatherDesc}</div>
              <div>Clouds: {this.state.clouds} %</div>
              <div>Pressure: {this.state.tempPressure} hpa</div>
              <div>Humidity: {this.state.tempHumidity} %</div>
              <div>Wind: {this.state.windSpeed}  {this.state.unitsWindText} {this.degreeToDirection(this.state.windDeg)} ({this.state.windDeg} &deg;) </div>
            </div>


fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + location + '&units=' + this.state.units + '&APPID=' + key)
.then(result => {
  if (result.ok){
    return result
  } throw Error('something went wrong')
})
.then(result => result.json())
.then(result => this.setState({data: [result]}))
.catch(err => console.log('Location named ' + location + ' doesn\'t exist'))
}})


            {
              this.state.data.map((data, i) => 
                 <div key={i}>
                   <div>{data.city.name}</div>
                  {data.list.map((list, i) =>
                    <div key={i}>---
                      <div>Date: {list.dt_txt}</div>
                      <div>Temp: {list.main.temp} &deg; {this.state.unitsTempText} </div>
                      <div>Condition: {list.weather[0].main}</div>
                      <div>Pressure: {list.main.pressure}</div>
                      <div>Humidity: {list.main.humidity}</div>
                      <div>Wind: {list.wind.speed} {this.state.unitsWindText} </div>
                    </div>
                  )}
                </div>
              )
            }
*/