import { api } from '../api';
import { _retrieveData, _storeData } from '../storage';

var getEventos = async () => {
    try {
        let res = await api.get(`/eventos`);
        console.log(res);
    } catch (error) {
        throw error;
    }
}

var getEventosAbertos = async () => {
    try {
        let res = await api.get(`eventos-abertos`);
        console.log(res);
    } catch (error) {
        throw error;
    }
}

var getEventoById = async (id) => {
    try {
        let res = await api.get(`/eventos/${id}`);
        console.log(res);
    } catch (error) {
        throw error;
    }
}

var ativarEventos = async (id, data) => {
    try{
        let res = await api.post(`/eventos-ativar/${id}`, data);
        console.log(res);
    } catch(error){
        throw error;
    }
}

var salvarEvento = async (data) => {
    try{
        let res = await api.post(`/eventos-cadastrar`, data);
        console.log(res);
    } catch(error){
        throw error;
    }
}