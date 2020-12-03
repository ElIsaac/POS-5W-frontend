import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';


export const AdminRoute = ({
    user,
    component: Component,
    layout: Layout, 
    ...rest
}) => {
    
    return (
        <Route { ...rest }
            component={ (props) => (
                ( user.logged && user.admin )
                    ? ( <Layout isAdmin={user.admin}><Component { ...props } /></Layout> )
                    : ( <Redirect to="/cajero/inicio" /> )
            )}
        
        />
    )
}

AdminRoute.propTypes = {
    user: PropTypes.object.isRequired,
    component: PropTypes.func.isRequired
}
