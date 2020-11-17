import './Layout.css'
import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import { HomeOutlined, UnorderedListOutlined, PlusOutlined, UserAddOutlined, DollarCircleOutlined, IdcardOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
//import useAuth from '../hooks/useAuth'

const { Content, Footer, Sider } = Layout;


export default function LayoutBasic(props) {


    const { children, isAdmin } = props;

    const [collapsed, setCollapsed] = useState(false)

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={() => { setCollapsed(!collapsed) }}>
                <div className="logo">

                </div>
                <Menu theme="dark" mode="inline">

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
                        <Menu.Item key="/cajero/admin" icon={<IdcardOutlined />}>
                            <Link to={"/cajero/admin"}>
                                Administrador 
                                </Link>
                        </Menu.Item>

                        <Menu.Item key="/cajero/admin/productos" icon={<UnorderedListOutlined />}>
                            <Link to={"/cajero/admin/productos"}>
                                Todos los productos
                                </Link>
                        </Menu.Item>

                        <Menu.Item key="/cajero/admin/productos/nuevo" icon={<PlusOutlined />}>
                            <Link to={"/cajero/admin/productos/nuevo"}>
                                Nuevo producto
                                </Link>
                        </Menu.Item>

                        <Menu.Item key="/cajero/admin/registrate" icon={<UserAddOutlined />}>
                            <Link to={"/cajero/admin/registrate"}>
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
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    )
    //}
    //return null;

}
