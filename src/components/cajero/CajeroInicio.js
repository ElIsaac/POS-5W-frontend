import React, { useEffect, useState } from 'react'
import { saveAs } from 'file-saver'
import axios from 'axios';

import config from '../../api/config'
import { obtenerToken } from '../../api/auth'
import { traerMisTickets } from '../../api/cajero'
import Titulo from '../Titulo'
import { PantallaDeCarga } from '../PantallaDeCarga'

export const CajeroInicio = (props) => {
    const { user } = props
    const [datos, setDatos] = useState({
        ticket: null,
        cargando: true,
    })
    useEffect(() => {
        const token = obtenerToken()
        traerMisTickets(token, user.id).then(res => {
            setDatos({ cargando: false, ticket: res })
        })
    }, [user.id])

    console.log(datos)
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
                            <div className="jumbotron jumbotron-fluid">
                                <div className="container">
                                    <h1 className="display-4">{user.nombre.toUpperCase() + " " + user.apellidos.toUpperCase()}</h1>
                                    <p className="lead"><mark>Email:</mark> {user.email}</p>
                                    <p className="lead"><mark>Puesto:</mark> {user.admin ? "Administrador" : "Cajero"}</p>
                                    <p className="lead"><mark>Numero de ventas:</mark> {datos.ticket.length}</p>
                                </div>
                            </div>

                            <div className="row  cozntainer">
                                {
                                    datos.ticket.map(i => <TicketItem key={i._id} i={i} />)
                                }
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

                saveAs(pdfBlob, i._id+'.pdf');
            }).catch(err => console.log(err))
    }


    return (

        <>
            <div className="card">
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

