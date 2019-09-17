import axios from "axios";
import { getToken } from './storage.js';

var host = "http://157.245.142.25:8080";

var api = axios.create({
    baseURL: host + '/api',
    responseType: 'json',
    header: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
})

api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error.response.data);
    }
)

api.interceptors.request.use(async config => {
    const token = await getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export {
    api
};