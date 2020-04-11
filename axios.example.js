import axios from 'axios';
import Cookies from "js-cookie";

export default axios.create({
    baseURL: "http://epet.imd.ufrn.br:8443/api",
    headers: {'Authorization': `${Cookies.get("auth")}`},
})

