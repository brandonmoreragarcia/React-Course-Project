import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://brandon-burger.firebaseio.com/'
});

export default instance;