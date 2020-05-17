import axios from 'axios';
import Cookies from "js-cookie";
/*axios*/
export default axios.create({
    baseURL: "https://epet.imd.ufrn.br:8443/api",
    headers: {'Authorization': `${Cookies.get("auth")}`},
})