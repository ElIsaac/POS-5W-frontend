import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';


export const PrivateRoute = ({
    user,
    component: Component,
    layout: Layout, 
    ...rest
}) => {

    return (
        <Route { ...rest }
            component={ (props) => (
                ( user.logged )
                    ? ( <Layout isAdmin={user.admin}><Component { ...props } user={user} /></Layout> )
                    : ( <Redirect to="/" /> )
            )}
        
        />
    )
}

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired
}
