import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import WeatherDay from './WeatherDay';

class Weather extends React.Component {

  render() {
    return (
      <Card style={{ width: '40rem' }}
        bg="secondary"
        text="black"
      >
        <Card.Img variant="top" src={this.props.imgSrc} alt="map" />
        <Card.Body>
          <Card.Title>{this.props.location.display_name}</Card.Title>
          <Card.Text>
            Latitude: {this.props.location.lat}
            <br></br>
            Longitude: {this.props.location.lon}
            <br></br>
            <WeatherDay 
            weatherForecast={this.props.weatherForecast} 
            getWeatherInfo={this.getWeatherInfo}
            />
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default Weather;