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
        < Titulo titulo="Panel de registro" history={props.history}/>
        <br/>
        
            <form onSubmit={ handleSubmit }>
            <div className="card">
                <div className="card-header">
                <h5 className="display-4">Nuevo Usuario</h5>
                </div>
                <div className="card-body">
                    
                        <div className="form-group">
                            <label>Nombre del usuario</label>
                            
                        <input 
                            type="text"
                            name="nombre"
                            className="form-control"
                            placeholder="Nombre"
                            autoComplete="off"
                            value={ nombre }
                            onChange={ handleInputChange }
                        />
                        <br/>
                        <label>Apellidos del usuario</label>
                        <input 
                            type="text"
                            name="apellidos"
                            className="form-control"
                            placeholder="Apellido(s)"
                            autoComplete="off"
                            value={ apellidos }
                            onChange={ handleInputChange }
                        />
                        <br/>
                        <label>E-mail del usuario</label>
                        <input 
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="email@gmail.com"
                            autoComplete="off"
                            value={ email }
                            onChange={ handleInputChange }
                        />
                        <br/>
                        <label>Contraseña</label>
                        <input 
                            type="password"
                            name="contrasenia"
                            className="form-control"
                            placeholder="*****"
                            value={ contrasenia }
                            onChange={ handleInputChange }
                        />
                        
                        <br/>
                        <label>Confirme Contraseña</label>
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
