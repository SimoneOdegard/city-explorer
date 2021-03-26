import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';

class Error extends React.Component {
  render() {
    return (
      <Card>
        <Card.Body><h1>Error: Unable to geocode</h1></Card.Body>
        <Card.Body><p>{this.props.errorObj}</p></Card.Body>
      </Card>
    )
  }
}

export default Error;