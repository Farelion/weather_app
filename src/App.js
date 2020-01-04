import React from 'react';



const key = '715b732345d2d5c0291c7ce2d4f2263d';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.changeUnits = this.changeUnits.bind(this);

    this.state = {
      isLoaded: false,
      units: 'metric',
      unitsTempText: 'C',
      unitsWindText: 'm/s',
      location: null,
      data: [],
    };
  }
  
  // handle submit, fetching data
  onSubmit(e) {
    e.preventDefault();

    var location = this.state.location;

    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + location + '&units=' + this.state.units + '&APPID=' + key)
    .then(result => result.json())
    .then(result => this.setState({isLoaded: true, data: [result]}))

  }



  // chnage units to metric/imperial
  changeUnits(){
    var location = this.state.location;

    this.state.units === 'imperial' ? this.setState({
      units: 'metric',
      unitsTempText: 'C',
      unitsWindText: 'm/s'
    },() => { if(location !== null){
      fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + location + '&units=' + this.state.units + '&APPID=' + key)
      .then(result => result.json())
      .then(result => this.setState({data: [result]}))
    }})
     : this.setState({
      units: 'imperial',
      unitsTempText: 'F',
      unitsWindText: 'm/h'
    },() => { if(location !== null){
      fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + location + '&units=' + this.state.units + '&APPID=' + key)
      .then(result => result.json())
      .then(result => this.setState({data: [result]}))
    }});

  }



  render(){
    
    return (
        <div className="App">
          <header className="App-header">

            
            <p>
            Google API key:  AIzaSyC3bw3msjPYzMIMBUTN1GlQXhYl-Pw2Y54
            openWeather API key: 715b732345d2d5c0291c7ce2d4f2263d
            </p>
            <button onClick={this.changeUnits}>Change to {this.state.units === 'imperial' ? 'metric' : 'imperial'}</button>
            <form>
              <input onChange={(e) => this.setState({ location: e.target.value})}></input>
              <button onClick={this.onSubmit}>Submit</button>
            </form>

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



          </header>
        </div>
      );
  }
}

export default App;
