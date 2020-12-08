import React from 'react'
import { Layout, Menu } from 'antd';
import { HomeOutlined, UserOutlined, ShopOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


export default function LayoutBasic(props) {
    const { Header, Content } = Layout;
    const { children } = props;
    

    return (

            <div className="">
                <Header className="site-layout-background" style={{ padding: 0 }} >
                    
                    <Menu  mode="horizontal">
                        
                        <ShopOutlined style={{ fontSize: '2.5rem', color: '#08c', padding: '0.2rem 4.5rem 0.2rem 3rem' }} />

                        <Menu.Item key="mail" icon={<HomeOutlined />}>
                            <Link to="/">
                                Inicio
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="app" icon={<UserOutlined />}>
                            <Link to="/inicia-sesion">
                                Inicia sesion
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Header>

                <Content style={{ margin: '0 16px' }}>

                    <div className="" style={{ padding: 24, minHeight: 360 }}>
                        {children}
                    </div>
                </Content>
            </div>
    )

}
