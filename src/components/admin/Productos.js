import React, {useState} from 'react'
import { borrarProducto, traerUnProducto, editarProducto } from '../../api/admin'
import { obtenerToken } from '../../api/auth'
import Titulo from '../Titulo'
import { notification } from 'antd';
import Confirmacion from '../Confirmacion'

import { useForm } from '../../hooks/useForm';



export const Productos = (props) => {

    const [productoOriginal, setProductoOriginal] = useState({})
    const [formValues, handleInputChange, setValues] = useForm({
        id: '',
        nombre: '',
        precio: ''
    });

    const { nombre,id,precio } = formValues;

    const borrar= async (id)=>{
        const token = obtenerToken()
        const res = await borrarProducto(token, id)
        if(res.error){
            notification["error"]({
                message: res.error
            })
        }else{
            notification["success"]({
                message: res.mensaje
            })
        }
        setValues({
            id: '',
            nombre: '',
            precio: ''
        })
    }

    const editar= async (id, datos)=>{
        const token = obtenerToken()
        const res = await editarProducto(token, datos, id)
        if(res.error){
            notification["error"]({
                message: res.error
            })
        }else{
            notification["success"]({
                message: res.mensaje
            })
        }
        setValues({
            id: '',
            nombre: '',
            precio: ''
        })
    }

    const buscar = async (id) => {
        const token = obtenerToken()
        const prod = await traerUnProducto(token, id)
        console.log(prod)
        if (prod.error) {
            notification["error"]({
                message: prod.error
            })
        } else {
            if(prod._id!==undefined){
                notification["success"]({
                    message: "producto encontrado"
                })
                setProductoOriginal(prod)
                setValues({
                    id: prod._id,
                    nombre: prod.nombre,
                    precio: prod.precio
                })
            }else{
                notification["error"]({
                    message: "Porfavor llene los campos"
                })
                setValues({
                    id: '',
                    nombre: '',
                    precio: ''
                })
            }
            
        }
    }

    

    return (
        <div>
            <Titulo titulo="Edicion de productos" history={props.history} />
            <br />
            <form className="card">
                <div className="card-body">
                    <label htmlFor="id">ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="id"
                        name="id"
                        value={id}
                        onChange={handleInputChange}
                        placeholder="ID" />
                </div>
                <div className="card-footer">
                <button type="button" onClick={() => buscar(id)} className="btn btn-primary btn-lg">buscar</button>
                </div>
            </form>
            <br/>

            {formValues.nombre || formValues.precio
                ?
                <div className="card">
                    <div className="card-header">
                        {""+productoOriginal._id}
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="Nombre">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Nombre"
                                    name="nombre"
                                    value={nombre}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="precio">Precio</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="precio"
                                    name="precio"
                                    value={precio}
                                    onChange={handleInputChange}
                                />
                            </div>
                            
                        </form>
                        <button 
                        type="button" 
                        className="btn btn-block btn-success"
                        
                        onClick={() => Confirmacion("Esta seguro de que quiere editar este producto", editar, id, formValues)}
                        >
                            Actualizar
                        </button>

                        <button 
                        type="button" 
                        className="btn btn-block btn-danger"
                        onClick={() => Confirmacion("Esta a punto de eliminar este producto, desea continuar?", borrar, id)}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
                :
                null
            }

        </div>
    )
}
