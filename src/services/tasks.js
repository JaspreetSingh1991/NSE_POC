import axios from 'axios';

const getTasksList = () => {
  //return axios.get(`https://jsonplaceholder.typicode.com/users`);
  const data = {
    maker:[{
      scriptId: 0,
      scriptCmd: '/wjhjhf/kjw',
      createdBy: 'Test',
      isApproved: false,
      isRun: false
    },
    {
      scriptId: 1,
      scriptCmd: '/wjhjhf/kjw',
      createdBy: 'Test1',
      isApproved: true,
      isRun: false
    },
    {
      scriptId: 2,
      scriptCmd: '/wjhjhf/kjw',
      createdBy: 'Test2',
      isApproved: true,
      isRun: true
    }],
    approver: [
      {
        scriptId: 3,
        scriptCmd: '/wjhjhf/kjw',
        createdBy: 'Test3',
        isApproved: true,
        isRun: false
      }
    ]
  }
  return data;
};


const approveTasks = (payload) => {
    return axios.post(`https://jsonplaceholder.typicode.com/users`, { payload });
  };

export { getTasksList, approveTasks };
