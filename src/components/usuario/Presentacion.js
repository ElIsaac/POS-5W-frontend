import React from 'react'
import { QuestionCircleFilled, CheckOutlined, SearchOutlined, DollarCircleFilled, UserOutlined } from '@ant-design/icons'
import './presentacion.css'
export default function Presentacion() {

    return (
        <div>

            <div>

                <div className="container titulos ">

                    <div className="row espaciado">
                        <div className="col-md-7">
                            <h2 className="espaciado-heading">¿Quienes somos? <span className="text-muted">Al chile no sabemos</span></h2>
                            <p className="lead">ah se crean, somos una compañia dedicada a hacer la vida de quienes atienden un punto de ventas mas facil</p>
                        </div>
                        <div className="col-md-5">
                            <QuestionCircleFilled style={{ fontSize: "1500%" }} />
                        </div>
                    </div>
                    <hr className="espaciado-divider" />
                    <div className="row espaciado">
                        <div className="col-md-7 order-md-2">
                            <h2 className="espaciado-heading">¿Nuestra applicacion es la indicada para usted? <span className="text-muted">Pruebela</span></h2>
                            <p className="lead">Nuestra aplicacion es capaz de trabajar desde dispositivos moviles hasta computadoras de bajos recuros y no necesita hacer inversiones en equipo para poder ofrecer sus servicio de manera moderna</p>
                        </div>
                        <div className="col-md-5 order-md-1">
                            <CheckOutlined style={{ fontSize: "1500%" }} />
                        </div>
                    </div>
                    <hr className="espaciado-divider" />
                    <div className="row espaciado">
                        <div className="col-md-7">
                            <h2 className="espaciado-heading">¿Cuanto cuesta? <span className="text-muted">Hablemos de precios</span></h2>
                            <p className="lead">No se preocupe por costos muy eleveados. nuestra tarifa es de 50 mxn. al mes <mark >Un tercio del precio de netflix</mark></p>
                        </div>
                        <div className="col-md-5">
                            <DollarCircleFilled style={{ fontSize: "1500%" }} />
                        </div>
                    </div>

                    <hr className="espaciado-divider" />
                    <div className="row espaciado">
                        <div className="col-md-7 order-md-2">
                            <h2 className="espaciado-heading">¿Busca pagar servicio tecnicos caros? <span className="text-muted">Ya no mas</span></h2>
                            <p className="lead">Con el costo de su suscripcion mensual lo podemos ayudar con problemas del software y hasta de hardware!</p>
                        </div>
                        <div className="col-md-5 order-md-1">
                            <SearchOutlined style={{ fontSize: "1500%" }} />
                        </div>
                    </div>

                    <hr className="espaciado-divider" />

                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">

                        <h2 className="lead"> Equipo no. #2</h2>
                        <p className="lead" >Integrantes:</p>

                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">

                        <h2 className="lead"><UserOutlined />Isaac</h2>
                        <p className="lead">Ramirez Velez</p>

                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">

                        <h2 className="lead"><UserOutlined />Esteban</h2>
                        <p className="lead">Eduardo Moncloa Sifuentes</p>

                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">

                        <h2 className="lead"><UserOutlined />Lucero</h2>
                        <p className="lead"> Rubi Balderas Herrera</p>

                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">

                        <h2 className="lead"><UserOutlined />Angel</h2>
                        <p className="lead">Issac Flores Orozco</p>

                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">

                        <h2 className="lead"><UserOutlined />Christian</h2>
                        <p className="lead">Ricardo Dominguez Esparza</p>

                    </div>
                </div>
            </div>


        </div>
    )
}

