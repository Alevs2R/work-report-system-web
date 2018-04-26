import {HOST} from "../constants/constants";
import {getUserToken} from "../components/User";
import {getFormData} from "./utils";

export const getUsers = async () => {
    const url = `http://${HOST}/users?token=${getUserToken()}`;
    const response = await fetch(url , {method: 'GET'});
    return await response.json();
};


export const getUser = async (id) => {
    const token = getUserToken();
    const url = `http://${HOST}/users/${id}?token=${token}`;
    const response = await fetch(url , {method: 'GET'});
    return await response.json();
};

export const createUser = async (data) => {
    const url = `http://${HOST}/users?token=${getUserToken()}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: getFormData(data)
    });
    if(response.status === 422) throw await response.json();
    return response.ok;
};

export const updateUser = async (data) => {
    const url = `http://${HOST}/users/${data.id}?token=${getUserToken()}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: getFormData(data)
    });
    if(response.status === 422) throw await response.json();
    return response.ok;
};

export const deleteUser = async (id) => {
    const url = `http://${HOST}/users/${id}?token=${getUserToken()}`;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
    return response.ok;
};

