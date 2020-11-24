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
        <PageHeader
                    ghost={false}
                    title={titulo}
                    subTitle={subtitulo}
                    extra={[
                        <Button
                            key="1"
                            type="primary"
                            danger
                            onClick={() => cerrarSesion()}
                            icon={<PoweroffOutlined />}
                        >
                            Cerrar sesion
                        </Button>,
                    ]}
                >

                </PageHeader>
    )
}
