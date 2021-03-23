import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import './style.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      location:{},
      searchQuery: '',
      imgSrc: '',
      displayResults: false,
      hasError: null
    }
  }

  getLocationInfo = async(e) => {
    e.preventDefault();
    console.log(this.state.searchQuery);
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${this.state.searchQuery}&format=json`;
    await axios.get(url)
    .then((location) => {
      const locationArray = location.data;

      this.setState({
        location: locationArray[0],
        displayResults: true,
        imgSrc: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=${locationArray[0].lat},${locationArray[0].lon}&zoom=13`
      });
    })
    .catch(error => {
      this.setState({ hasError: error});
    })
  }

  render(){
    return (
      <div className="objects">
        <h1 className="welcome">Welcome!</h1><br/>
        <form className="form" onSubmit={this.getLocationInfo}>
          <input onChange={(e) => this.setState({ searchQuery: e.target.value})} placeholder="city"/>
          <button type = "submit"> Explore!</button>
        </form>
        {this.state.hasError ?
          <div className="errorCard">
            <h1>Error: Unable to geocode</h1>
            <p>{this.state.hasErrorMessage}</p>
          </div> :
          <div className="card">
            <Card style={{ width: '40rem'}}
              bg="secondary"
              text="light"
            >
              <Card.Img variant="top" src={this.state.imgSrc} alt="map" />
              <Card.Body>
                <Card.Title>{this.state.location.display_name}</Card.Title>
                <Card.Text>
                  <p>
                    Latitude: {this.state.location.lat}
                    <br></br>
                    Longitude: {this.state.location.lon}
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        }
      </div>
    )
  }
}

export default App;
