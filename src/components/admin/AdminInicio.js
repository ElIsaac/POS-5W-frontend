import React, { useEffect, useState } from 'react'
import { Modal, Switch, notification } from 'antd'

import Titulo from '../Titulo'
import { PantallaDeCarga } from '../PantallaDeCarga'
import { traerUsuarios, editarUsuario, eliminarUsuario } from '../../api/admin'
import { obtenerToken } from '../../api/auth'

import { useForm } from '../../hooks/useForm';

export const AdminInicio = (props) => {
    const [cambio, setCambio] = useState(true)
    const [usuarios, setUsuarios] = useState({
        cargando: true,
        datos: null
    })
    useEffect(() => {
        traerUsuarios(obtenerToken()).then(res => {
            setUsuarios({
                cargando: false,
                datos: res
            })
        }).catch(err => {
            setUsuarios({
                cargando: false,
                datos: { error: "Error del servidor" + err }
            })
        })
    }, [cambio])

    return (
        <>
            < Titulo titulo="Inicio Admin" history={props.history} />
            {
                usuarios.cargando
                    ?
                    <PantallaDeCarga />
                    :
                    <div className="row container">
                                {
                                    
                                    usuarios.datos.map(i => <CardUsuario cambio={cambio} setCambio={setCambio}key={i._id} usuarios={i} />)
                                }
                    </div>
            }
        </>
    )
}

function CardUsuario({usuarios, cambio, setCambio}) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const token=obtenerToken()

    const eliminar = async(id) => {
        try {
            const result= await eliminarUsuario(token, id)
            if(result.mensaje){
                notification["success"]({
                    message: result.mensaje
                })
                setCambio(!cambio)
            }else{
                notification["error"]({
                    message: result.error
                })
            }
        } catch (error) {
            notification["error"]({
                message: "Error de servidor"
            })
        }
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async (datos, id) => {
        try {
            const result= await editarUsuario(token, datos, id)
            if(result.mensaje){
                notification["success"]({
                    message: result.mensaje
                })
                setIsModalVisible(false);
                setCambio(!cambio)
            }else{
                notification["error"]({
                    message: result.error
                })
                setIsModalVisible(false);
                setCambio(!cambio)
            }
        } catch (error) {
            notification["error"]({
                message: "Error de servidor"
            })
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const [formValues, handleInputChange, setValues] = useForm({

        nombre: usuarios.nombre,
        apellidos: usuarios.apellidos,
        email: usuarios.email,
        admin: usuarios.admin
    });
    const {nombre, apellidos, email, admin}=formValues

    return (
        <>
            <Modal
                title={"Editar: "+usuarios._id}
                visible={isModalVisible}
                onOk={()=>handleOk(formValues, usuarios._id)}
                onCancel={handleCancel}
            >
                <>
            <div className="card">

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
                            <label htmlFor="apellidos">apellidos</label>
                            <input
                                type="text"
                                className="form-control"
                                id="apellidos"
                                name="apellidos"
                                value={apellidos}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleInputChange}
                            />
                        </div>

                        
                        <div className="forn-group">
                            <Switch checked={admin}  onChange={e=>setValues({...formValues,admin:e})}/>
                            
                        </div>

                    </form>
                    
                </div>
            </div>
        </>
            </Modal>
            <div className="card " >
                <div className="card-header">{usuarios._id}</div>
                <div className="card-body">
                    <p className="card-text">{usuarios.nombre} {usuarios.apellidos}</p>
                </div>
                <div className="card-footer">
                    <button
                        type="button"
                        className="btn btn-success btn-block"
                        onClick={showModal}
                    >
                        Editar
                </button>
                    <button
                        type="button"
                        className="btn btn-danger btn-block"
                        onClick={()=>eliminar(usuarios._id)}
                    >
                        Eliminar
                </button>
                </div>
            </div>

        </>
    )
}