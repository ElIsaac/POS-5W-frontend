import config from './config'


export function traerProductos(token){
    return fetch(`http://${config.nombre}/admin/productos`, {
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

export function traerUnProducto(token,productoId){
    return fetch(`http://${config.nombre}/productos/${productoId}`, {
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

export function nuevoProducto(token, datos){
    return fetch(`http://${config.nombre}/admin/productos/nuevo`, {
        method: 'POST',
        body: JSON.stringify(datos),
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


export function borrarProducto(token, productoId){
    return fetch(`http://${config.nombre}/admin/productos/${productoId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            authorization: token
        }
    }).then(response => {
        return response.json();
    } ).then(result =>{
        return result
    }).catch((err)=>{
        return  err
    })
        
}

export function editarProducto(token, datos, productoId){
    return fetch(`http://${config.nombre}/admin/productos/${productoId}`, {
        method: 'PUT',
        body: JSON.stringify(datos),
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