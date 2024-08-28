import axios from 'axios';

const login = (payload) => {
  return axios.post(`https://jsonplaceholder.typicode.com/users`, { payload });
};

export { login };
