import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import './style.css';
import Map from './map';
import Forecast from './forecast';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      location:{},
      searchQuery: '',
      imgSrc: '',
      displayResults: false,
      hasError: false,
      errorObj: {}
    }
  }

  getLocationInfo = async(e) => {
    e.preventDefault();
    try {
    console.log(this.state.searchQuery);
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${this.state.searchQuery}&format=json`;
    const location = await axios.get(url)
    const locationArray = location.data;

    this.setState({
      location: locationArray[0],
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
            <Card style={{ width: '40rem'}}
              bg="secondary"
              text="light"
            >
              <Map imgSrc={this.state.imgSrc}/>
              <Card.Body>
                <Card.Title>{this.state.location.display_name}</Card.Title>
                <Card.Text>
                    Latitude: {this.state.location.lat}
                    <br></br>
                    Longitude: {this.state.location.lon}
                    <Forecast />
                </Card.Text>
              </Card.Body>
            </Card>
        }
        {this.state.hasError &&
            <Card>
              <Card.Body><h1>Error: Unable to geocode</h1></Card.Body>
              <Card.Body><p>{this.state.errorObj}</p></Card.Body>
            </Card>
        }
      </div>
    )
  }
}

export default App;
