import React, { useReducer } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import jwtDecode from 'jwt-decode';

import LayoutSesion from './components/LayoutSesion'
import Layout from './components/Layout'

import { AuthContext } from './auth/AuthContext';
import { PrivateRoute } from './routers/PrivateRoute';
import { PublicRoute } from './routers/PublicRoute';

import { CajeroInicio } from './components/cajero/CajeroInicio';
import { Cobrar } from './components/cajero/Cobrar';

import { AdminInicio } from './components/admin/AdminInicio';
import { Productos } from './components/admin/Productos';
import { NuevoProducto } from './components/admin/NuevoProducto';

import { IniciaSesion } from './components/usuario/IniciaSesion';
import { Registrate } from './components/admin/Registrate';

import { authReducer } from './auth/authReducer';
import { Error404 } from './components/Error404'
import Presentacion from './components/usuario/Presentacion';


function App() {

  const init = () =>{
    const token=localStorage.getItem("accessToken")
    var data
    if(token){
      data=jwtDecode(token)
    }
    if(data===undefined){
      return {logged:false}
    }
    if(data.nombre){
      return {...data, logged:true}
    }
    else{
        return {logged: false}
    }
  }

  const [user, dispatch] = useReducer(authReducer , {}, init)

  return (
    <AuthContext.Provider value={{user, dispatch}} >
       <Router>
                <Switch> 
                <PublicRoute exact path="/" isAuthenticated={ user.logged } component={Presentacion} layout={LayoutSesion} />
                <PublicRoute exact path="/inicia-sesion" isAuthenticated={ user.logged } component={IniciaSesion} layout={LayoutSesion} />
                

                <PrivateRoute exact path="/cajero/inicio" isAuthenticated={ user.logged } isAdmin={user.admin} component={CajeroInicio} layout={Layout} />
                <PrivateRoute exact path="/cajero/cobrar" isAuthenticated={ user.logged } isAdmin={user.admin} component={Cobrar} layout={Layout} />

                <PrivateRoute exact path="/cajero/admin" isAuthenticated={ user.logged } isAdmin={user.admin} component={AdminInicio} layout={Layout} />
                <PrivateRoute exact path="/cajero/admin/registrate" isAuthenticated={ user.logged } isAdmin={user.admin} component={Registrate} layout={Layout}/>
                <PrivateRoute exact path="/cajero/admin/productos" isAuthenticated={ user.logged } isAdmin={user.admin} component={Productos} layout={Layout} />
                <PrivateRoute exact path="/cajero/admin/productos/nuevo" isAuthenticated={ user.logged } isAdmin={user.admin} component={NuevoProducto} layout={Layout} />

                <Route component={Error404} />
                
                </Switch>
        </Router>

    </AuthContext.Provider>
     
    
      

  );
}

export default App;
