import React from 'react'
import Titulo from '../Titulo'
import { notification } from 'antd';


import { useForm } from '../../hooks/useForm';
import { nuevoProducto } from '../../api/admin'
import { obtenerToken } from '../../api/auth'

export const NuevoProducto = (props) => {

    const [formValues, handleInputChange, setValues] = useForm({
        nombre: '',
        precio: '',
    });

    const { nombre, precio } = formValues;

    const handleSubmit = async (e) => {
        const token=obtenerToken()
        e.preventDefault();
        const result = await nuevoProducto(token,formValues)
        if (result.error) {
            notification["error"]({
                message: result.error
            })
        } else {
            notification["success"]({
                message: result.mensaje
            })
            setValues({
                nombre: '',
                precio: '',
            })
        }
    }

    return (
        <div>
            < Titulo titulo="Agregar productos" history={props.history}/>
            <br/>
            <form onSubmit={handleSubmit}>
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title">Agregar</h5>
                    </div>
                    <div class="card-body">

                        <div className="form-group">
                            <input
                                type="text"
                                name="nombre"
                                className="form-control"
                                placeholder="Nombre del producto"
                                autoComplete="off"
                                value={nombre}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="precio"
                                className="form-control"
                                placeholder="Precio del producto (MXN)"
                                autoComplete="off"
                                value={precio}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Guardar
                    </button>
                    </div>
                </div>



            </form>
        </div>
    )
}
