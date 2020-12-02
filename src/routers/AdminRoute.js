import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';


export const AdminRoute = ({
    isAuthenticated,
    isAdmin,
    component: Component,
    layout: Layout, 
    ...rest
}) => {
    

    return (
        <Route { ...rest }
            component={ (props) => (
                ( isAdmin && isAuthenticated )
                    ? ( <Layout isAdmin={isAdmin}><Component { ...props } /></Layout> )
                    : ( <Redirect to="/cajero/inicio" /> )
            )}
        
        />
    )
}

AdminRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
