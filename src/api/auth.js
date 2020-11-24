import config from './config';
import { ACCESS_TOKEN } from '../utils/constants';
import jwtDecode from 'jwt-decode';


export function cerrarSesion(){
    localStorage.removeItem(ACCESS_TOKEN);
}


export function iniciaSesion(datos){
    return fetch(`http://${config.nombre}/inicia-sesion`, {

        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }

    }).then(response => {
        return response.json();

    } ).then(result =>{
        return result;
        
    }).catch((err)=>{

        return err
        })
}


export  function obtenerToken(){
    const accessToken = localStorage.getItem(ACCESS_TOKEN)

    if(!accessToken || accessToken===false){
        cerrarSesion()
        return null;
    }
    if(tokenInvalido(accessToken)){
        cerrarSesion()
        return null
    }else{
        return accessToken
    }
}



function tokenInvalido(token){
    try{
        const segundos = 60;
        const rawToken=jwtDecode(token);
        const {fechaExpiracion}=rawToken;
        const now = (Date.now() + segundos)/1000
        return now > fechaExpiracion;
    }catch{
        return true
    }
}