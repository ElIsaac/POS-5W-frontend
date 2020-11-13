import React, { useContext } from 'react'

import {notification} from 'antd';

import { AuthContext } from '../../auth/AuthContext';
import { useForm } from '../../hooks/useForm';
import { types } from '../../types/types';
import { iniciaSesion } from '../../api/auth'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../utils/constants'

export const IniciaSesion = () => {

    const { dispatch } = useContext(AuthContext)
   

    const [ formValues, handleInputChange ] = useForm({
        email: '',
        contrasenia: ''
    });

    const { email, contrasenia } = formValues;


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        dispatch({
            type: types.login
        })
        

        const result = await iniciaSesion(formValues)
          if(result.mensaje){
            notification["error"]({
                message: result.mensaje
            })
        }else{
            const{ AccessToken, RefreshToken }= result;
            localStorage.setItem(ACCESS_TOKEN, AccessToken);
            localStorage.setItem(REFRESH_TOKEN, RefreshToken);

            notification["success"]({
                message: "Inicio de sesion correcto"
            })
            window.location.href="/admin"
        }  
        console.log(result); 
    }


    return (
        <form onSubmit={ handleSubmit }>

            
            <div className="form-group">
                <input 
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="email@gmail.com"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />
            </div>

            <div className="form-group">
                <input 
                    type="password"
                    name="contrasenia"
                    className="form-control"
                    placeholder="*****"
                    value={ contrasenia }
                    onChange={ handleInputChange }
                />
            </div>


            <button type="submit" className="btn btn-primary">
                Guardar
            </button>

        </form>
    )
}
