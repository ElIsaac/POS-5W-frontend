import React, { useContext } from 'react'

import {notification} from 'antd';

import { AuthContext } from '../../auth/AuthContext';
import { useForm } from '../../hooks/useForm';
import { types } from '../../types/types';
import { iniciaSesion } from '../../api/auth'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../utils/constants'

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
            const{ AccessToken, RefreshToken }= result;
            localStorage.setItem(ACCESS_TOKEN, AccessToken);
            localStorage.setItem(REFRESH_TOKEN, RefreshToken);

            notification["success"]({
                message: "Inicio de sesion correcto"
            })
            dispatch({
                type: types.login
            })
            window.location.href="/cajero/inicio"
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
