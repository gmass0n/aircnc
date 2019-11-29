// IMPORTS
import axios from 'axios';

// FAZ A CONEXÃO COM A API
const api = axios.create({
    // URL DA API
    baseURL: 'https://gmass0n-backend.herokuapp.com',
});

// EXPORT
export default api;  