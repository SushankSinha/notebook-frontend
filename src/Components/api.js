import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  alg: "RS256",
  typ : 'jwt',
  withCredentials : true,
  baseURL: 'http://localhost:7007'
});

const token = Cookies.get('token');

if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default instance;
