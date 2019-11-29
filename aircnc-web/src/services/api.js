// IMPORTS
import axios from 'axios';

// CHAMANDO A URL DA API
const api = axios.create({
    baseURL: 'https://gmass0n-backend.herokuapp.com',
});

// EXPORT
export default api;

