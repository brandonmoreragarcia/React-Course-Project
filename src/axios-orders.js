import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://breakingbadapi.com'
});

export default instance;