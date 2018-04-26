import {HOST} from "../constants/constants";
import {getUserToken} from "../components/User";
import {getFormData} from "./utils";


export const getBrigadesList = async () => {
    const token = getUserToken();
    const url = `http://${HOST}/brigades?token=${token}`;
    const response = await fetch(url , {method: 'GET'});
    return (await response.json()).reverse();
};

export const getBrigade = async (id) => {
    const token = getUserToken();
    const url = `http://${HOST}/brigades/${id}?token=${token}`;
    const response = await fetch(url , {method: 'GET'});
    return await response.json();
};

export const createBrigade = async (data) => {
    const url = `http://${HOST}/brigades?token=${getUserToken()}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: getFormData(data)
    });
    if(response.status === 422) throw await response.json();
    return await response.json();
};

export const updateBrigade = async (data) => {
    const url = `http://${HOST}/brigades/${data.id}?token=${getUserToken()}`;
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

export const deleteBrigade = async (id) => {
    const url = `http://${HOST}/brigades/${id}?token=${getUserToken()}`;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
    return response.ok;
};

export const addUserToBrigade = async (brigadeId, userId) => {
    const url = `http://${HOST}/brigades/${brigadeId}/assigned_workers/?token=${getUserToken()}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: getFormData({id: userId})
    });
    if(response.status === 422) throw await response.json();
    return response.ok;
};

export const removeUserFromBrigade = async (brigadeId, userId) => {
    const url = `http://${HOST}/brigades/${brigadeId}/assigned_workers/${userId}?token=${getUserToken()}`;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
    return response.ok;
};
