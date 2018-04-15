let user = null;

export function setUser(u){
    user = u;
    if(u){
        localStorage.setItem('user', JSON.stringify(user));
    } else {
        localStorage.removeItem('user');
    }
}

export function getUser(){
    return user;
}

export function getUserToken(){
    return user ?  user.authentication_token : null
}