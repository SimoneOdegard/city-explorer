import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';

class WeatherDay extends React.Component {

  forecastRender() {
    const data = this.props.weatherForecast;
    return <div><ListGroup>{data.map(item => <ListGroup.Item variant="dark">{item.date}: {item.description}</ListGroup.Item>)}</ListGroup></div>
  }

  render() {
    return (
      <>
        {this.forecastRender()}
      </>
    )
  }
}

export default WeatherDay;