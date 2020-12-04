import React from 'react'
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

export const Error404 = () => {
    return (
        <Result
    status="404"
    title="404"
    subTitle="La pagina a la que intenta acceder no existe"
    extra={<Link to="/"><Button type="primary">Volver al Inicio</Button></Link> }
  />
    )
}
