import React from 'react';
import axios from 'axios';
import './style.css';
import WeatherDay from './WeatherDay';
import Error from './error';
// import Forecast from './forecast';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      location:{},
      searchQuery: '',
      imgSrc: '',
      displayResults: false,
      hasError: false,
      errorObj: {},
      weatherForecast:[]
    }
    this.getLocationInfo = this.getLocationInfo.bind(this);
  }

  getWeatherInfo = async(e) => {
    // LOCAL SERVER
    const forecast = await axios.get(`${process.env.REACT_APP_LOCALSERVER}/weather?city_name=${this.state.searchQuery}`);
    // HEROKU SERVER
    // const forecast = await axios.get(`${process.env.REACT_APP_SERVER}/weather?city_name=${this.state.searchQuery}`);
    const forecastArray = forecast.data;
    this.setState({ weatherForecast: forecastArray });
  }

  async getLocationInfo(e) {
    e.preventDefault();
    try { const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${this.state.searchQuery}&format=json`;
    const location = await axios.get(url)
    const locationArray = location.data;

    this.setState({
      location: locationArray[0],
      displayResults: true,
      hasError: false,
      imgSrc: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=${locationArray[0].lat},${locationArray[0].lon}&zoom=13`
    });

    this.getWeatherInfo();

    } catch(error) {
      this.setState({ 
        hasError: true,
        errorObj: error.message,
        displayResults: false
      });
    }
  }

  render(){
    console.log(this.state);
    return (
      <div className="objects">
        <h1 className="welcome">Welcome!</h1><br/>
        <form className="form" onSubmit={this.getLocationInfo}>
          <input onChange={(e) => this.setState({ searchQuery: e.target.value})} placeholder="city"/>
          <button type = "submit"> Explore!</button>
        </form>
        {this.state.displayResults &&
          <WeatherDay
          imgSrc={this.state.imgSrc}
          location={this.state.location}
          lat={this.state.location.lat}
          lon={this.state.location.lon}
          weatherForecast={this.state.weatherForecast} 
          getWeatherInfo={this.getWeatherInfo}
          />
        }
        {this.state.hasError &&
          <>
            <Error errorObj={this.state.errorObj}/>
          </>
        }
      </div>
    )
  }
}

export default App;
