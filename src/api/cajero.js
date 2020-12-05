
import config from './config'


export function buscarProducto(token, id){
    return fetch(`http://${config.nombre}/productos/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    }).then(response => {
        return response.json();
    } ).then(result =>{
        return result
    }).catch((err)=>{
        return  err
        
    });
}

export function hayImagen( id){
    return fetch(`http://${config.nombre}/avatar/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        return response.json();
    } ).then(result =>{
        return result
    }).catch((err)=>{
        return  err
        
    });
}


export function subirImagen(token, id, avatar){

    const formData= new FormData();
    formData.append("avatar", avatar, avatar.name)

    return fetch(`http://${config.nombre}/avatar/${id}`, {
        method: 'POST',
        body: formData,
        headers: {
            
            Authorization: token
        }
    }).then(response => {
        return response.json();
    } ).then(result =>{
        return result
    }).catch((err)=>{
        return  err
        
    });
}

export function buscarProductos(token, id){
    return fetch(`http://${config.nombre}/productos/todos/`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    }).then(response => {
        return response.json();
    } ).then(result =>{
        return result
    }).catch((err)=>{
        return  err
        
    });
}

export function traerMisTickets(token, idCajero){
    return fetch(`http://${config.nombre}/ticket/todos/${idCajero}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    }).then(response => {
        return response.json();
    } ).then(result =>{
        return result
    }).catch((err)=>{
        return  err
        
    });
}
