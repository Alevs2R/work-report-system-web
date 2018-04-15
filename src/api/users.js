import {HOST} from "../constants/constants";
import {getUser} from "../components/User";

export const getUsers = async () => {
    const user = getUser();
    const token = user.authentication_token;
    const url = `http://${HOST}/users?token=${token}`;
    const response = await fetch(url , {method: 'GET'});
    return await response.json();
};



