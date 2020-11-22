export function PostData(metodo,type,Data){

      //let baseUrl = 'http://34.244.101.28:3000/api/';
	let baseUrl = 'http://localhost:3000/api/';

    return new Promise((resolve, reject) =>{

        fetch(baseUrl+metodo,{
            method: type,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
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