import React from 'react';
import axios from 'axios';
import './style.css';
import Weather from './Weather';
import Error from './error';
import Movies from './movies';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      location:{},
      movies: {},
      searchQuery: '',
      imgSrc: '',
      displayResults: false,
      hasError: false,
      errorObj: {},
      weatherForecast:[],
      newMovies: []
    }
    this.getLocationInfo = this.getLocationInfo.bind(this);
    this.getMoviesInfo = this.getMoviesInfo.bind(this);
  }

  getWeatherInfo = async(e) => {
    // LOCAL SERVER
    // const forecast = await axios.get(`${process.env.REACT_APP_LOCALSERVER}/weather?city_name=${this.state.searchQuery}`);
    // HEROKU SERVER
    const forecast = await axios.get(`${process.env.REACT_APP_SERVER}/weather?city_name=${this.state.searchQuery}`);
    const forecastArray = forecast.data;
    this.setState({ weatherForecast: forecastArray });
  }

  getMoviesInfo = async(e) => {
    // LOCAL SERVER
    // const movies = await axios.get(`${process.env.REACT_APP_LOCALSERVER}/movies?city_name=${this.state.searchQuery}`);
    // HEROKU SERVER
    const movies = await axios.get(`${process.env.REACT_APP_SERVER}/movies?city_name=${this.state.searchQuery}`);
    const moviesArray = movies.data;
    this.setState({ newMovies: moviesArray });
  }

  async getLocationInfo(e) {
    e.preventDefault();
    try { const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${this.state.searchQuery}&format=json`;
    const location = await axios.get(url)
    const locationArray = location.data;
    const movieUrl = `https://api.themoviedb.org/3/movie/550?api_key=13425ff589c300b98019b952361737a3`;
    const movies = await axios.get(movieUrl)
    const moviesArray = movies.data;


    this.setState({
      location: locationArray[0],
      movies: moviesArray[0],
      displayResults: true,
      hasError: false,
      imgSrc: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=${locationArray[0].lat},${locationArray[0].lon}&zoom=13`
    });

    
  } catch(error) {
    this.setState({ 
      hasError: true,
      errorObj: error.message,
      displayResults: false
    });
  }
  this.getWeatherInfo();
  this.getMoviesInfo();
}

  render(){
    console.log(this.state);
    return (
      <div className="objects">
        <center>
        <h1 className="welcome">City Explorer</h1>
        <h3 className="welcome">find a city</h3>
        <br/>
        <form className="form" onSubmit={this.getLocationInfo}>
          <input onChange={(e) => this.setState({ searchQuery: e.target.value})} placeholder="city"/>
          <button type = "submit"> Explore!</button>
        </form>
        </center>
        
        {this.state.displayResults &&
          <center>
          <Weather className="Weather"
          imgSrc={this.state.imgSrc}
          location={this.state.location}
          lat={this.state.location.lat}
          lon={this.state.location.lon}
          weatherForecast={this.state.weatherForecast} 
          getWeatherInfo={this.getWeatherInfo}
          />
          <Movies
          newMovies={this.state.newMovies}
          getMovieInfo={this.getMovieInfo}
          />
          </center>
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
