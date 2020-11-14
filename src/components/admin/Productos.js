import React from 'react'
import Titulo from '../Titulo'

export const Productos = (props) => {
    return (
        <div>
            <Titulo titulo="Lista de productos"  history={props.history}/>
            Productos
        </div>
    )
}
