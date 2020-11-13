import config from './config';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/constants';
import jwtDecode from 'jwt-decode';


export function cerrarSesion(){
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
}

export function refreshAccessToken(refreshToken){
    return fetch(`${config.nombre}/${config.version}/refresh-access-token`,{
        method: 'POST',
        body: {refreshToken: refreshToken},
        headers:{
            "Content-Type":"application/json"
        }
    }).then(response => {
        if(response.status!==200){
            return null;
        }
        return response.json()
    }).then(result=>{
        if(!result){
            cerrarSesion();
        }else{
            const { accessToken, refreshToken } = result;
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);
        }
    })
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
        console.log(result)
        return result;
        
    }).catch((err)=>{

        return err.mensaje
        })
}


export  function obtenerToken(){
    const accessToken = localStorage.getItem(ACCESS_TOKEN)

    if(!accessToken || accessToken===false){
        return null;
    }

    return decodificar(accessToken) ? null : accessToken;
}

export function obtenerRefreshToken(){
    const refreshToken = localStorage.getItem(REFRESH_TOKEN)

    if(!refreshToken || refreshToken===false){
        return null;
    }

    return decodificar(refreshToken) ? null : refreshToken;
}

function decodificar(token){
    const segundos = 60;
    const rawToken=jwtDecode(token);
    const {fechaExpiracion}=rawToken;
    const now = (Date.now() + segundos)/1000
    return now > fechaExpiracion;
}