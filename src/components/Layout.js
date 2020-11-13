import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import { HomeOutlined, UnorderedListOutlined, PlusOutlined } from '@ant-design/icons';
import { Route, Switch, Link, Redirect } from 'react-router-dom'
//import useAuth from '../hooks/useAuth'
import { IniciaSesion } from './usuario/IniciaSesion';

const { Header, Content, Footer, Sider } = Layout;


export default function LayoutBasic(props) {

    const { routes } = props;

    const [collapsed, setCollapsed] = useState(false)

    /* if (!user && !isLoading) {
        return (
            <>
                <Route path="/inicia-sesion" component={ IniciaSesion }></Route>
                <Redirect to="/inicia-sesionn"></Redirect>
            </>
        )

    } */

    //if (user && !isLoading) {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={() => { setCollapsed(!collapsed) }}>
                    <div className="logo">

                    </div>
                    <Menu theme="dark" mode="inline">


                        <Menu.Item key="/admin" icon={<HomeOutlined />}>
                            <Link to={"/admin"}>
                                Inicio
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="/admin/productos" icon={<UnorderedListOutlined />}>
                            <Link to={"/admin/productos"}>
                                Inicio
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="/admin/productos/nuevo" icon={<PlusOutlined />}>
                            <Link to={"/admin/productos/nuevo"}>
                                Inicio
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} >
                        <div className="logo" />
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>

                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <LoadRoutes routes={routes} />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    //}
//return null;

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
