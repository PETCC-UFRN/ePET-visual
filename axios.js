import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:8080/api",
    auth: {
        username: 'h@email.com',
        password: 'password'
    }
})