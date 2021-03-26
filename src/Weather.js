import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

class Forecast extends React.Component {

  forecastRender() {
    const data = this.props.weatherForecast;
    return <div><Card.Title>Weather</Card.Title><ListGroup>{data.map(item => <ListGroup.Item>{item.date}: {item.description}</ListGroup.Item>)}</ListGroup></div>
  }

  render() {
    return (
      <>
        {this.forecastRender()}
      </>
    )
  }
}

export default Forecast;