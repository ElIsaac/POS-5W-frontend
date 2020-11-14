import React from 'react'
import { Layout } from 'antd';

const { Header, Content } = Layout;


export default function LayoutBasic(props) {

    const { children } = props;


        return (
            <Layout style={{ minHeight: '100vh' }}>
                
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} >
                       
                        
                    </Header>
                    <Content style={{ margin: '0 16px' }}>

                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            {children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        )

}
