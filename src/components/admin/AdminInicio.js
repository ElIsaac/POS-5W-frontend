import React, { useEffect, useState } from 'react'
import { Modal, Switch, notification } from 'antd'
import NoUser from '../../no-user.png'
import Titulo from '../Titulo'
import { PantallaDeCarga } from '../PantallaDeCarga'
import Confirmacion from '../Confirmacion'

import config from '../../api/config'
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
            < Titulo titulo="Panel de Usuarios" history={props.history} />
            {
                usuarios.cargando
                    ?
                    <PantallaDeCarga />
                    :
                    <div className="container" >
                        <div className="row ">
                        {

                            usuarios.datos.map(i => <CardUsuario cambio={cambio} setCambio={setCambio} key={i._id} usuarios={i} />)
                        }
                    </div>
                    </div>
            }
        </>
    )
}

function CardUsuario({ usuarios, cambio, setCambio }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const token = obtenerToken()


    const [formValues, handleInputChange, setValues] = useForm({

        nombre: usuarios.nombre,
        apellidos: usuarios.apellidos,
        email: usuarios.email,
        admin: usuarios.admin,
        contrasenia: "",
        confirmaContrasenia: ""
    });
    const { nombre, apellidos, email, admin, contrasenia, confirmaContrasenia } = formValues

    const eliminar = async (id) => {
        try {
            const result = await eliminarUsuario(token, id)
            if (result.mensaje) {
                notification["success"]({
                    message: result.mensaje
                })
                setCambio(!cambio)
            } else {
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
            const result = await editarUsuario(token, datos, id)
            if (result.mensaje) {
                notification["success"]({
                    message: result.mensaje
                })
                setIsModalVisible(false)
                setCambio(!cambio)
                
            } else {
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

    const handleCancel = () => {
        setValues({
            nombre: usuarios.nombre,
            apellidos: usuarios.apellidos,
            email: usuarios.email,
            admin: usuarios.admin,
            contrasenia: "",
            confirmaContrasenia: ""
        })
        setIsModalVisible(false);
    };


    return (
        <>
            <Modal
                title={"Editar: " + usuarios._id}
                visible={isModalVisible}
                onOk={() => handleOk(formValues, usuarios._id)}
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
                                    <label htmlFor="admin">Administrador</label>
                                    <br />
                                    <Switch id="admin" checked={admin} onChange={e => setValues({ ...formValues, admin: e })} />
                                </div>
                                <br />
                                <div className="alert alert-warning" role="alert">
                                    Precaucion! si no desea cambiar la contraseña deje los campos vacios
                        </div>
                                <div className="form-group ">
                                    <label htmlFor="contrasenia">Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control "
                                        id="contrasenia"
                                        name="contrasenia"
                                        value={contrasenia}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="confirmaContrasenia">Confirma contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control "
                                        id="confirmaContrasenia"
                                        name="confirmaContrasenia"
                                        value={confirmaContrasenia}
                                        onChange={handleInputChange}
                                    />


                                </div>




                            </form>

                        </div>
                    </div>
                </>
            </Modal>
            <div className="">
            <div className="card col-xs-6 col-sm-6 col-md-4 col-xl-3" style={{ maxWidth: '14rem' }}>
                {
                    usuarios.avatar
                        ?
                        <img src={`http://${config.nombre}/avatar/${usuarios._id}`} className="card-img-top" style={{ maxWidth: '100%', maxHeight: '100%' }} alt="..."/>
                        :
                        <img src={NoUser} className="card-img-top mx-auto" style={{ maxWidth: '100%', maxHeight: '100%' }} alt="..." />
                }
                <div className="card-body">
                    <h5 className="card-title">{usuarios._id}</h5>
                    <p className="card-text">{usuarios.nombre} {usuarios.apellidos}</p>
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
                        onClick={() => Confirmacion("Desea eliminar este usuario", eliminar, usuarios._id)}
                    >
                        Eliminar
                            </button>
                </div>
            </div>
            </div>

        </>
    )
}

