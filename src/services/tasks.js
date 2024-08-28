import axios from 'axios';

const getTasksList = () => {
  return axios.get(`https://jsonplaceholder.typicode.com/users`);
};

const sendTasksForApproval = (payload) => {
  return axios.post(`https://jsonplaceholder.typicode.com/users`, { payload });
};

const approveTasks = (payload) => {
    return axios.post(`https://jsonplaceholder.typicode.com/users`, { payload });
  };

export { getTasksList, sendTasksForApproval, approveTasks };
