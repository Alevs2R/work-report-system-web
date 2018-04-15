import {HOST} from "../constants/constants";

export async function login(username, password){
    const url = `http://${HOST}/sessions?username=${username}&password=${password}`;
    const response = await fetch(url , {method: 'POST'});
    if(response.status === 401){
        throw new Error("login or password are not valid")
    }
    return await response.json();
}



