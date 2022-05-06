import axios from 'axios';

axios.interceptors.request.use(
    function(config) {
        config.baseURL = 'http://localhost:8000/api/';
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch
};