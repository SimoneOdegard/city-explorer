import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

class Movies extends React.Component {

  moviesRender() {
    const data = this.props.newMovies;
    return <div><Card.Title>New Movies</Card.Title><ListGroup>{data.map(item => <ListGroup.Item>{item.title}: {item.description}</ListGroup.Item>)}</ListGroup></div>
  }

  render() {
    return (
      <>
        {this.moviesRender()}
      </>
    )
  }
}

export default Movies;