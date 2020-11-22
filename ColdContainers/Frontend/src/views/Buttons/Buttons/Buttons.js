import React, { Component } from 'react';
import socketIOClient from "socket.io-client";

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      endpoint: "http://192.168.1.142:3000/"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("mensaje", data => this.setState({ response: data }));
    socket.emit('add-message','hola mundo');
  }

  render() {
    // const { response } = this.state;
    console.info(this.state);
    return (
      <div style={{ textAlign: "center" }}>
    
    </div>
    );
  }
}

export default Buttons;
