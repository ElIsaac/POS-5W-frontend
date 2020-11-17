import React, { useState } from 'react'
import { Drawer, Form, Button, } from 'antd';
import { IniciaSesion } from '../usuario/IniciaSesion'
import { Registrate } from '../admin/Registrate'

export default function Presentacion() {
    const [inicio, setInicio] = useState(true)

    return (
        <div>

            <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">Well done!</h4>
                <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
                <hr />
                <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
            </div>

            
            <div className="card text-white bg-dark mb-3" >
                <div className="card-header"><h1 className="text-white">Inicia sesion</h1></div>
                <div className="card-body">
                <IniciaSesion />
                </div>
            </div>


        </div>
    )
}

