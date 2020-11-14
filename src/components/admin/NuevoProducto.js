import React from 'react'
import Titulo from '../Titulo'

export const NuevoProducto = (props) => {
    return (
        <div>
            < Titulo titulo="Agregar productos" history={props.history}/>
            NuevoProducto
        </div>
    )
}
