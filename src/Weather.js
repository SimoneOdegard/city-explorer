import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import WeatherDay from './WeatherDay';
import Accordion from 'react-bootstrap/Accordion';

class Weather extends React.Component {

  render() {
    return (
      <>
        <Card style={{ width: '40rem' }}
          bg="dark"
          text="light"
        >
          <Card.Img variant="top" src={this.props.imgSrc} alt="map" />
          <Card.Body>
            <Card.Title><h5>{this.props.location.display_name}</h5></Card.Title>
            <Card.Text>
              Latitude: {this.props.location.lat}
              <br/>
              Longitude: {this.props.location.lon}
            </Card.Text>
          </Card.Body>
        </Card>
        <Accordion defaultActiveKey="1">
          <Card style={{ width: '40rem' }}
          bg="dark"
          text="light"
          >
            <Accordion.Toggle as={Card.Header} eventKey="0">
            <h5>Forecast</h5>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <WeatherDay 
                weatherForecast={this.props.weatherForecast} 
                getWeatherInfo={this.getWeatherInfo}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion> 
      </>
    )
  }
}

export default Weather;