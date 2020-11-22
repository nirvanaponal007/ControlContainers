import React, { Component } from "react";
import { PostData } from "../../../Servicios/PostData";
import Tablas from "./Clientes";
import "./Cliente.css";

class Typography extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    PostData("TraerClientes", "GET").then(result => {
      let responseJSON = result;
      this.setState({
        data: responseJSON.clientes
      });
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <Tablas
          clientes ={this.state.data}
            titulo={'Lista De Clientes'} />
        </div>
      </div>
    );
  }
}

export default Typography;
            