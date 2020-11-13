import config from './config'
export default function registrate(datos){
    

    return fetch(`http://${config.nombre}/registrate`, {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        return res.json();
    } ).then(result =>{
        if(result.mensaje==='usuario guardado'){
            return {
                ok: true,
                mensaje: result
            }
        }
        return {
            ok: false,
            mensaje: result
        }
    }).catch((err)=>{
        return {
            ok: false,
            mensaje: err
        }
    });
}
