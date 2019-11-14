import React, { Component } from 'react';
import L from 'leaflet';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle} from 'reactstrap';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
// import { Card, CardText, Button } from 'reactstrap';

import userLocationURL from './user_location.svg';
// import messageLocationURL from './message_location.svg';

// import MessageCardForm from './MessageCardForm';
// import { getMessages, getLocation, sendMessage } from './API';

import './App.css';

const myIcon = L.icon({
  iconUrl: userLocationURL,
  iconSize: [50, 82]
});

class App extends Component {
  state = {
    location: {
      lat: 51.505,
      lng: -0.09,
    },
    haveUsersLocation: false,
    zoom: 2
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        haveUsersLocation: true,
        zoom: 13
      });
    }, () => {
      console.log("uh oh... user didnt give location access");
      fetch('https://ipapi.co/json')
        .then(res => res.json())
        .then(location => {
          console.log(location);
          this.setState({
            location: {
              lat: location.latitude,
              lng: location.longitude
            },
            haveUsersLocation: true,
            zoom: 13
          });
        });
    });
  }

  render() {
    const position = [this.state.location.lat, this.state.location.lng]
    return (
      <div className="map">
        <Map className="map" center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            this.state.haveUsersLocation ?
              <Marker
                position={position}
                icon={myIcon}
              >
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
              </Marker> : ''
          }
        </Map>
        <Card body className="message-form">
          <CardTitle>Welcome to Map-App</CardTitle>
          <CardSubtitle>Leave a message:</CardSubtitle>
          <Form>
            <FormGroup>
              <Label for="Name">Name</Label>
              <Input type="textarea" name="text" id="exampleText" />              
            </FormGroup>
            <FormGroup>
              <Label for="Message">Text Area</Label>
              <Input type="textarea" name="text" id="exampleText" />              
            </FormGroup>
          </Form>
          <Button>Submit</Button>
        </Card>
      </div>
    )
  }
}

export default App;
