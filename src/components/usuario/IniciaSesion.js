import React, { useContext } from 'react'

import {notification} from 'antd';

import { AuthContext } from '../../auth/AuthContext';
import { useForm } from '../../hooks/useForm';
import { types } from '../../types/types';
import { iniciaSesion } from '../../api/auth'

import { ACCESS_TOKEN } from '../../utils/constants'

export const IniciaSesion = ({e}) => {

    const { dispatch } = useContext(AuthContext)
   

    const [ formValues, handleInputChange ] = useForm({
        email: '',
        contrasenia: ''
    });

    const { email, contrasenia } = formValues;


    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await iniciaSesion(formValues)
          if(result.error){
            notification["error"]({
                message: result.error
            })
        }else{
            const{ AccessToken }= result;
            if(AccessToken){
                localStorage.setItem(ACCESS_TOKEN, AccessToken);

            notification["success"]({
                message: "Inicio de sesion correcto"
            })
            dispatch({
                type: types.login
            })
            window.location.href="/cajero/inicio"
            }else{
                notification["error"]({
                    message: "Error al establecer coneccion al servidor"
                })
            }
        }
    }


    return (
        <div className="card">
            <div className="card-header d-flex">
            <h1 className="display-4 mx-auto">Bienvenido, por favor inicie sesion</h1>
            </div>
            <div className="card-footer">
                <form onSubmit={handleSubmit}>


                    <div className="form-group">
                        <label>Ingresa tu E-Mail</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="email@gmail.com"
                            autoComplete="off"
                            value={email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                    <label>Ingresa tu Contraseña</label>
                        <input
                            type="password"
                            name="contrasenia"
                            className="form-control"
                            placeholder="*****"
                            value={contrasenia}
                            onChange={handleInputChange}
                        />
                    </div>


                    <button type="submit" className="btn btn-primary">
                        Iniciar Sesion
                    </button>

                </form>
            </div>
        </div>
    )
}
