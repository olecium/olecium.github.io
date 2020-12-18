import * as axios from "axios";

const instance = axios.create({
    baseURL: "http://127.0.1:3001/",
});

export const booksAPI = {
    getBooks() {
        return instance.get(`books`).then(response => response.data);
    },
    getBook(bookId) {
        return instance.get(`book/${bookId}`).then(response => response.data);
    }
}

export const authAPI = {
    authLogin (login = null, password = null) {
        return instance.post(`/login`, {login, password});
    }
}

