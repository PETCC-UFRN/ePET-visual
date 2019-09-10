import axios from "axios";
import { getToken } from './storage.js';

var host = "http://localhost:8080/";

var api = axios.create({
    baseURL: host + '/projects',
    responseType: 'json'
})

api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error.response.data);
    }
)

api.interceptors.request.use( async config => {
    const token = await getToken();
    if(token ){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export{
    api
};