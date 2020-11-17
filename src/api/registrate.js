import config from './config'
export default function registrate(datos){
    

    return fetch(`http://${config.nombre}/registrate`, {
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
