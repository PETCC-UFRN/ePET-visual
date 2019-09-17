import {api} from './api';
import { _retrieveData, _storeData, setUser, setToken } from './storage';

export const isAuthenticated = () => true;

var login = async (email, senha) => {
    try{
        console.log("DADOS = " + email + " - " + senha);
        const res = await api.post(`/`, {email: email, senha: senha }, { useCredentails: true });
        console.log(res);
    } catch(error){
        throw error;
    }
}

const AuthService = {
    login: login,
}

export { AuthService };