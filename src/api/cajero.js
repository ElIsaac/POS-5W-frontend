import config from './config'

export default function cobrarProductos(token, datos){
    return fetch(`http://${config.nombre}/cobrar`, {
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


export function buscarProductos(token, id){
    return fetch(`http://${config.nombre}/productos/`, {
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
