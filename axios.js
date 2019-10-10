import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:8080/api",
    auth: {
        username: 'teste@gmail.com',
        password: '123456789'
    }
})