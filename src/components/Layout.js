import './Layout.css'
import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import { HomeOutlined, UnorderedListOutlined, PlusOutlined, UserAddOutlined, DollarCircleOutlined, IdcardOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
//import useAuth from '../hooks/useAuth'

const { Content, Footer, Sider } = Layout;


export default function LayoutBasic(props) {
    
    const [collapsed, setCollapsed] = useState(true)
    const { children, isAdmin } = props;

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={() => { setCollapsed(!collapsed) }}>
                <div className="logo">

                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={window.location.pathname}>

                    <Menu.Item key="/cajero/inicio" icon={<HomeOutlined />}>
                        <Link to={"/cajero/inicio"}>
                            Inicio 
                            </Link>
                    </Menu.Item>

                    <Menu.Item key="/cajero/cobrar" icon={<DollarCircleOutlined />}>
                        <Link to={"/cajero/cobrar"}>
                            Cobrar 
                            </Link>
                    </Menu.Item>

                    {isAdmin &&
                    <>
                        <Menu.Item key="/cajero/administrador" icon={<IdcardOutlined />}>
                            <Link to={"/cajero/administrador"}>
                                Administrador 
                                </Link>
                        </Menu.Item>

                        <Menu.Item key="/cajero/admin-editar" icon={<UnorderedListOutlined />}>
                            <Link to={"/cajero/admin-editar"}>
                                Todos los productos
                                </Link>
                        </Menu.Item>

                        <Menu.Item key="/cajero/admin-productos-nuevo" icon={<PlusOutlined />}>
                            <Link to={"/cajero/admin-productos-nuevo"}>
                                Nuevo producto
                                </Link>
                        </Menu.Item>

                        <Menu.Item key="/cajero/admin-registrar" icon={<UserAddOutlined />}>
                            <Link to={"/cajero/admin-registrar"}>
                                Registrar
                                </Link>
                        </Menu.Item>
                    </>
                    }
                    
                </Menu>
            </Sider>
            <Layout className="site-layout">
                
                <Content style={{ margin: '0 16px' }}>

                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                         {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Tienda de lolo</Footer>
            </Layout>
        </Layout>
    )
    //}
    //return null;

}
