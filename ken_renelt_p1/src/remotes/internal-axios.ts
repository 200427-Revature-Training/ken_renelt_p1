import Axios from 'axios';

// const server = !process.env.NODE_ENV || process.env.NODE_ENV == 'development' ?
//   'http://localhost:3001' :  'http://localhost:3001';

export const internalAxios = Axios.create({
    //baseURL: server,
    baseURL: 'http://localhost:3001',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
});