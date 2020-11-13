import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import { Route, Switch, Link, Redirect } from 'react-router-dom'

const { Header, Content, Footer, Sider } = Layout;


export default function LayoutBasic(props) {

    const { routes } = props;


        return (
            <Layout style={{ minHeight: '100vh' }}>
                
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} >
                       
                        
                    </Header>
                    <Content style={{ margin: '0 16px' }}>

                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <LoadRoutes routes={routes} />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        )

}

function LoadRoutes(props) {
    const { routes } = props;
    return (
        <Switch>
            {
                routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                ))
            }
        </Switch>
    )
}
