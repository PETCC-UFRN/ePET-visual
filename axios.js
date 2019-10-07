import axios from 'axios';

export default axios.create({
    baseURL: "http://epet.imd.ufrn.br/service/api",
    auth: {
        username: 'teste@gmail.com',
        password: '123456789'
    }
})