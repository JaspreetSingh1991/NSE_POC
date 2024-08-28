import axios from 'axios';

const login = () =>{
 return  axios.get(`https://jsonplaceholder.typicode.com/users`);
}

export { login };