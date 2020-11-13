import React from 'react'
import { useForm } from '../../hooks/useForm';

export const Registrate = () => {
   

    const [ formValues, handleInputChange ] = useForm({
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


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log( formValues );
    }


    return (
        <form onSubmit={ handleSubmit }>

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

        </form>
    )
}
