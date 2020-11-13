import React, { useReducer } from 'react';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import { AuthContext } from './auth/AuthContext';
import { authReducer } from './auth/authReducer';

//import AuthProvider from './providers/AuthProvider'

import routes from './config/routes'



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

  const [user, dispatch] = useReducer(authReducer, {}, init)

  return (
    <AuthContext.Provider value={{user, dispatch}} >
       <Router>
        <Switch>
          {routes.map((route, index) => (
            <RouteWithSubRoutes key={index} {...route} />
          ))
          
          }
        </Switch>
      </Router>

    </AuthContext.Provider>
     
    
      

  );
}




function RouteWithSubRoutes(route){
return (
  <Route
  path={route.path}
  exact={route.exact}
  render={props => <route.component routes={route.routes} {...props}/>}
  
  />
);
}




export default App;
