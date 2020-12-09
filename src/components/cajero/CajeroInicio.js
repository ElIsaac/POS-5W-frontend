import React, { useEffect, useState } from 'react'
import { saveAs } from 'file-saver'
import axios from 'axios';
import { notification } from 'antd';

import NoUser from '../../no-user.png'

import config from '../../api/config'
import { obtenerToken } from '../../api/auth'
import { hayImagen, subirImagen, traerMisTickets } from '../../api/cajero'
import Titulo from '../Titulo'
import { PantallaDeCarga } from '../PantallaDeCarga'

export const CajeroInicio = (props) => {

    const { user } = props

    const [datos, setDatos] = useState({
        ticket: null,
        cargando: true,
    })
    const [imagen, setImagen] = useState(null)
    const [traerImagen, setTraerImagen] = useState(false)

    //Traer imagenes
    useEffect(() => {
        const token = obtenerToken()
        traerMisTickets(token, user.id).then(res => {
            setDatos({ cargando: false, ticket: res })
        })
        
    }, [user.id])

    //Recargar la imagen cuando haya un cambio
    useEffect(()=>{
        hayImagen(user.id).then(res => {
            if (res.error) {
                setTraerImagen(false)
            } else {
                setTraerImagen(true)
            }
        }).catch(err => {
            setTraerImagen(false)
        })
    }, [user.id])

    const fileSelectedHandler = event => {
        setImagen(
            event.target.files[0]
        )
    }

    const subir = async () => {
        const token = obtenerToken()
        try {
            const subida=await subirImagen(token, user.id, imagen)
            if(subida){
                notification["success"]({
                    message: "Imagen guardada"
                })
                props.history.replace("/cajero/inicio")
            }else{
                notification["error"]({
                    message: "Error de coneccion"
                })
            }
        } catch (error) {
            if(error.name==="TypeError"){
                notification["error"]({
                    message: "No hay ninguna imagen, Favor de introducir una imagen"
                })
            }else{
                notification["error"]({
                    message: "Error de servidor"
                })
            }
            
        }
    }

    if (datos.cargando) {
        return (
            <div>
                < Titulo titulo="Inicio cajero" history={props.history} />
                <br />
                <PantallaDeCarga />
            </div>
        )
    } else {
        return (

            <>
                < Titulo titulo="Inicio cajero" history={props.history} />
                <br />
                {
                    datos.ticket.error
                        ?
                        <>
                            <div className="alert alert-danger" role="alert">
                                <h1 className="display-4" >Aun no se han registrado ventas!</h1>
                            </div>
                        </>
                        :

                        <>

                            <br />
                            <div className="row">

                                <div className="jumbotron jumbotron-fluid bg-dark text-white col-xs-12 col-sm-6 col-md-8">

                                    <div className="container">
                                        <h1 className="display-3 text-white">{user.nombre.toUpperCase() + " " + user.apellidos.toUpperCase()}</h1>

                                        <p className="lead"><mark>Email:</mark> {user.email}</p>
                                        <p className="lead"><mark>Puesto:</mark> {user.admin ? "Administrador" : "Cajero"}</p>
                                        <p className="lead"><mark>Numero de ventas:</mark> {datos.ticket.length}</p>
                                    </div>
                                </div>

                                <div className="jumbotron  bg-dark  col-xs-12 col-sm-6 col-md-4" >
                                    <div className="card">

                                        {traerImagen
                                            ?
                                            <img src={`http://${config.nombre}/avatar/${user.id}`} className="mx-auto" style={{ maxWidth: '100%', maxHeight: '100%' }} alt="..." />
                                            :
                                            <img src={NoUser} className="mx-auto" style={{ maxWidth: '100%', maxHeight: '100%' }} alt="..." />
                                        }
                                        <div className="card-body">


                                            <div className="input-group">
                                                <div className="custom-file">
                                                    <input type="file" className="custom-file-input" onChange={fileSelectedHandler} id="inputGroupFile04" />
                                                    <label className="custom-file-label" htmlFor="inputGroupFile04">Choose file</label>
                                                </div>
                                                <div className="input-group-append">
                                                    <button className="btn btn-outline-secondary" onClick={() => subir()} type="button">Button</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className="container">
                            <div className="row">
                                {
                                    datos.ticket.map(i => <TicketItem key={i._id} i={i} />)
                                }
                            </div>
                            </div>
                        </>


                }
            </>
        )
    }
}
function TicketItem({ i }) {


    const descargar = async () => {
        const configurar = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": obtenerToken()
            },
            responseType: 'blob'
        }

        axios.get(`http://${config.nombre}/ticket/${i._id}`, configurar)
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

                saveAs(pdfBlob, i._id + '.pdf');
            }).catch(err => console.log(err))
    }


    return (

        <>
            <div className="card col-xs-6 col-sm-6 col-md-4 col-xl-3">
                <div className="card-body">
                    <h5 className="card-title">{i.fecha}</h5>
                    <h6 className="card-subtitle mb-2 text-muted"><mark>ID:</mark> {i._id}</h6>
                    <br />
                    <p></p>
                    <p><mark>Costo:</mark> {i.precioFinal}</p>
                    <button
                        type="button"
                        className="btn btn-success btn-block"
                        onClick={() => descargar()}
                    >
                        Descargar Ticket
                    </button>

                </div>
            </div>
        </>
    )
}

