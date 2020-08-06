import * as axios from "axios";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "dc0f0ce6-2534-4ef7-b65c-0f65df064163"
    }
});

export const authAPI = {
    authMe () {
        return instance.get(`auth/me`);
    },
    authLogin (email = null, password = null, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe});
    },
    authLogout () {
        return instance.delete(`auth/login`);
    }
}
