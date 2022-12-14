import axios from "axios";

const instance = axios.create({
    baseURL: "https://reqres.in",
});

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        return response.data ? response.data : response;
    },
    function (error) {
        if (error.response) {
            return error.response;
        }
    }
);

export default instance;
