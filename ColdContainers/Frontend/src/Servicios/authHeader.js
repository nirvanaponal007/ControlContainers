export function authHeader() {
    // return authorization header with jwt token
    //let user = JSON.parse(localStorage.getItem('user'));
    let user =  JSON.parse(sessionStorage.getItem('Usuario'));    
    if (!user) {
        return {
            Accept:'application/json',
            'Content-Type': 'application/json'
        };
    }else{
        if (user.usuario && user.usuario.token) {
            return { 
                Accept:'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.usuario.token,
                
            };
        } else {
            return {
                Accept:'application/json',
                'Content-Type': 'application/json'
            };
        }
    }
    
}