import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Your backend base URL
});

export default instance;
