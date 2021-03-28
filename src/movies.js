import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';

class Movies extends React.Component {

  moviesRender() {
    const data = this.props.newMovies;
    return <div><ListGroup>{data.map(item => <ListGroup.Item variant="dark"><b>{item.title}</b>: {item.description}</ListGroup.Item>)}</ListGroup></div>
  }

  render() {
    return (
      <>
        <Accordion defaultActiveKey="1">
          <Card style={{ width: '40rem' }}
          bg="dark"
          text="light"
          >
            <Accordion.Toggle as={Card.Header} eventKey="0">
              <h5>Movies</h5>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>{this.moviesRender()}</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>          
      </>
    )
  }
}

export default Movies;