import {HOST} from "../constants/constants";
import {getUserToken} from "../components/User";
import {getFormData} from "./utils";


export const getJobsList = async () => {
    const token = getUserToken();
    const url = `http://${HOST}/jobs?token=${token}`;
    const response = await fetch(url , {method: 'GET'});
    return await response.json();
};

export const getCategories = async () => {
    const token = getUserToken();
    const url = `http://${HOST}/jobs?token=${token}&c=1`;
    const response = await fetch(url , {method: 'GET'});
    return (await response.json()).categories;
};

export const getJob = async (id) => {
    const token = getUserToken();
    const url = `http://${HOST}/jobs/${id}?token=${token}`;
    const response = await fetch(url , {method: 'GET'});
    return await response.json();
};

export const createJob = async (data) => {
    const url = `http://${HOST}/jobs?token=${getUserToken()}`;
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

export const updateJob = async (data) => {
    const url = `http://${HOST}/jobs/${data.id}?token=${getUserToken()}`;
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

export const deleteJob = async (id) => {
    const url = `http://${HOST}/jobs/${id}?token=${getUserToken()}`;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
    return response.ok;
};
