import { authHeader } from '../Servicios/authHeader'
import {AMBIENT,PORT} from '../Servicios/config';

export function PostData(metodo,type,Data){    
    //let baseUrl = 'http://192.168.1.142:3000/api/';
    //let baseUrl = 'http://34.244.101.28:3000/api/';    
    let baseUrl = `http://${AMBIENT}:${PORT}/api/`;
    let usuario = JSON.parse(sessionStorage.getItem('Usuario'));    
    if(usuario != null){
        const {usu_apellido,usu_celular,usu_email,usu_estado,usu_fecha_creacion,usu_id,usu_nombre,usu_username,usr_id_rol} = usuario.usuario.data[0];
        if (type==="GET" && (metodo==="TraerCantidadContenedores" || metodo==="TraerCantidadUsuarios" || metodo==="TraerCantidadContenedoresActivos" || metodo==="TraerContenedores" || metodo==="TraerUsuarios") ) {
            Data = {
                id_usuario : usu_id
            }
            type= "POST";
        }
    }
    return new Promise((resolve, reject) =>{

        fetch(baseUrl+metodo,{
            method: type,
            headers: authHeader(),
            body: JSON.stringify(Data)
          })
        .then((response)=>response.json())
        .then((responseJson)=>{
           resolve(responseJson);
        })
        .catch((error)=>{
            reject(error);
        })

    })
}