import config from './config'

export function cobrarProductos(token, datos){
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
