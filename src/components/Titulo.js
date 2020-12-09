import React, {useContext} from 'react'
import { PageHeader, Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { AuthContext } from '../auth/AuthContext';
import {types} from '../types/types'


export default function Titulo({titulo, subtitulo, history}) {

    const { dispatch } = useContext(AuthContext)


    const cerrarSesion=()=>{
        dispatch({
            type: types.logout
        })
        history.replace("/")
    }

    

    return (
        <>
        <PageHeader
                    ghost={false}
                    title={<h1>{titulo}</h1>}
                    subTitle={subtitulo}
                    extra={[
                        <Button
                        style={{width:"100%", height:"75%", fontSize:"120%"}}
                            key="1"
                            type="primary"
                            danger
                            onClick={() => cerrarSesion()}
                            icon={<PoweroffOutlined  style={{fontSize:"200%"}}/>}
                        >
                            Cerrar sesion
                        </Button>,
                    ]}
                >
                </PageHeader>
                <br/>
        </>
    )
}
