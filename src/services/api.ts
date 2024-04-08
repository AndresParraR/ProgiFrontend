import axios from 'axios';

const axiosInstace = axios.create({
  //-------Api swagger
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: false,
  headers: {
    'content-type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':
      'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,observe',
    'Access-Control-Allow-Credentials': 'true',
  },
});

export default axiosInstace;
