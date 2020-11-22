import React, { Component } from 'react';
import {PostData} from '../../../Servicios/PostData';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import {Redirect} from 'react-router-dom';

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      username:'',
      contrasena:'',
      email: '',
      redirect:false
    }
    this.ObtenerData = this.ObtenerData.bind(this);
    this.EnviarLogin = this.EnviarLogin.bind(this);
};
  ObtenerData(e){
    const {value,name} = e.target;
    this.setState({
      [name]:value
    })
  }

  EnviarLogin(e){
    e.preventDefault();
    if(this.state.username && this.state.contrasena){
      const data = {
        username:this.state.username,
        contrasena:this.state.contrasena,
        email: this.state.username,
      }
      PostData('Login','POST',data).then((result)=>{
        let responseJSON = result; 
      //  console.log(responseJSON);       
        if(responseJSON.usuario){
          sessionStorage.setItem('Usuario',JSON.stringify(responseJSON));
          sessionStorage.setItem('filtro_cont',"todos");
          this.setState({redirect:true,
            username:'',
            rol:responseJSON.usuario.data[0].usr_id_rol,
            contrasena:''});
        }else{
        alert(responseJSON.message.error);            
        }
      })
    }
  }

  render() {
    if(this.state.redirect){
      if(this.state.rol===1){
        return(<Redirect to={'/dashboard'}/>)
      }else if(this.state.rol===2){
        // return(<Redirect to={'/Contenedores'}/>)
        return(<Redirect to={'/dashboard'}/>)
      }else{
        // return(<Redirect to={'/Usuarios'}/>)
        return(<Redirect to={'/dashboard'}/>)
      }
    }

    if(sessionStorage.getItem('Usuario')){
      if(this.state.rol===1){
        return(<Redirect to={'/dashboard'}/>)
      }else if(this.state.rol===2){
        return(<Redirect to={'/Contenedores'}/>)
      }else if(!this.state.rol){
        return(<Redirect to={'/login'}/>)
      }else{
        return(<Redirect to={'/Usuarios'}/>)
      }
    }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.EnviarLogin}>
                      <h1>Iniciar sesión</h1>
                      <p className="text-muted">Inicia sesión en su cuenta</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" onChange={this.ObtenerData} placeholder="Nombre de usuario" autoComplete="username" name="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" onChange={this.ObtenerData} placeholder="Contraseña" autoComplete="current-password" name="contrasena" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4">Iniciar sesión</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">¿Se te olvidó tu contraseña?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
