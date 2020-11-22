import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
// import { PostData } from '../../Servicios/PostData';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

let idUsuarioRol = 1;
class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }
 
  menuRoles= navigation =>{
    const  usuario = sessionStorage.getItem('Usuario');
    if (!usuario){
      const items = []
      navigation = {items};
      return navigation
    }else{
    const usu = JSON.parse(usuario);
    const {usr_id_rol} = usu.usuario.data[0];
    
    if(usr_id_rol===1){
      return navigation
    }
    else if(usr_id_rol===2){
      const items = [navigation.items[0],navigation.items[1],navigation.items[3],navigation.items[4]]
      navigation = {items};
      return navigation
    }
    else if (usr_id_rol===3){
      const items = [navigation.items[0],navigation.items[1],navigation.items[4]]
      navigation = {items};
      return navigation
     }
    }
  }

  permisosRoles = (idRol) =>{
    if (idRol === 1){
      let opciones = [routes[0] , routes[1], routes[2], routes[3], routes[4], routes[5], routes[6], routes[7], routes[8]];
       this.routes = opciones;
       return this.routes;
   }
   else if(idRol === 2){
      const opciones = [routes[0] , routes[1], routes[2], routes[3], routes[5],  routes[6], routes[7], routes[8] ];
      this.routes = opciones;
      return this.routes;
   }
   else if(idRol === 3){
      const opciones = [routes[0] , routes[1], routes[2], routes[3], routes[6], routes[7], routes[8]];
      this.routes = opciones;
      return this.routes;
 }
  }


  render() {
    const  usuario = sessionStorage.getItem('Usuario');
    if(usuario){
     const usuId = JSON.parse(usuario);
     const {usr_id_rol} = usuId.usuario.data[0];
     idUsuarioRol = usr_id_rol;
    }

    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={this.menuRoles(navigation)} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={this.permisosRoles(idUsuarioRol)}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {this.permisosRoles(idUsuarioRol).map((route, idx) => { 
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to={usuario !== null ? "/dashboard" : "/Login" } />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
