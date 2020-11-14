import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';


export const PrivateRoute = ({
    isAuthenticated,
    isAdmin,
    component: Component,
    layout: Layout, 
    ...rest
}) => {
    

    return (
        <Route { ...rest }
            component={ (props) => (
                ( isAuthenticated )
                    ? ( <Layout isAdmin={isAdmin}><Component { ...props } /></Layout> )
                    : ( <Redirect to="/inicia-sesion" /> )
            )}
        
        />
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
