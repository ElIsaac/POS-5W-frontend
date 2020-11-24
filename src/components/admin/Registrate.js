import React from 'react'
import Titulo from '../Titulo'
import {notification} from 'antd';


import { useForm } from '../../hooks/useForm';
import registrate from '../../api/registrate'

export const Registrate = (props) => {
   

    const [ formValues, handleInputChange, setValues ] = useForm({
        nombre: '',
        apellidos: '',
        email: '',
        contrasenia: '',
        confirmaContrasenia: ''
    });

    const { nombre,
    apellidos,
    email,
    contrasenia,
    confirmaContrasenia } = formValues;


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        const result = await registrate(formValues)
          if(result.error){
            notification["error"]({
                message: result.error
            })
        }else{

            notification["success"]({
                message: result.mensaje
            })
            setValues({
                nombre: '',
                apellidos: '',
                email: '',
                contrasenia: '',
                confirmaContrasenia: ''
            })
        }  
    }



    return (
        <>
        < Titulo titulo="Inicio Admin" history={props.history}/>
        <br/>
        
            <form onSubmit={ handleSubmit }>
            <div className="card">
                <div className="card-header">
                <h5 className="card-title">Registrate</h5>
                </div>
                <div className="card-body">
                    
                        <div className="form-group">
                        <input 
                            type="text"
                            name="nombre"
                            className="form-control"
                            placeholder="Tu nombre"
                            autoComplete="off"
                            value={ nombre }
                            onChange={ handleInputChange }
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text"
                            name="apellidos"
                            className="form-control"
                            placeholder="Tu(s) apellido(s)"
                            autoComplete="off"
                            value={ apellidos }
                            onChange={ handleInputChange }
                        />
                    </div>
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
                    <div className="form-group">
                        <input 
                            type="password"
                            name="confirmaContrasenia"
                            className="form-control"
                            placeholder="*****"
                            value={ confirmaContrasenia }
                            onChange={ handleInputChange }
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Guardar
                    </button>
                </div>
            </div>

            

        </form>
        </>
    )
}
