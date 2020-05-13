import Cookies from "js-cookie";

export default function ({ $axios, redirect }) {
    $axios.onRequest(config => {
        console.log('hue');
        config.headers.common['Authorization'] = Cookies.get("auth");
        $axios.setHeader('Authorization', Cookies.get("auth"));
    });
    //$axios.setHeader('Authorization', `${Cookies.get("auth")}`);
}