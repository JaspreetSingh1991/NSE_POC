import {
  AppBar,
  Box,
  Button,
  createTheme,
  Grid2,
  Tab,
  Tabs,
  Toolbar,
} from '@mui/material';
import './App.css';

import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider } from '@emotion/react';
import { useEffect, useState } from 'react';
import { getTasksList } from './services/tasks';

const columns = [
  { field: 'scriptId', headerName: 'Script ID', width: 200 },
  { field: 'scriptCmd', headerName: 'Script Command', width: 230 },
  { field: 'createdBy', headerName: 'Created By', width: 230 },
  {
    field: 'status',
    headerName: 'Status',
    width: 230,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
const darkTheme = createTheme({
  palette: {
    background: {
      default: '#303030',
    },
    text: {
      primary: '#ffffff',
    },
  },
});

function appBarLabel(rowSelectionModel, selectedTab, tasks, fetchTaskList) {
  const sendForApproval = () => {
    let tasksSelected = tasks.maker?.filter(
      (task) => rowSelectionModel.indexOf(task.id) !== -1
    );
    const payload = tasksSelected.map((task) => {
      const modfiedTask = {
        isApproved: true,
        scriptId: task.scriptId,
        isRun: task.isRun,
      };
      return modfiedTask;
    });
    fetchTaskList();
    console.log(payload);
  };

  const approveTasks = () => {
    let tasksSelected = tasks.maker?.filter(
      (task) => rowSelectionModel.indexOf(task.id) !== -1
    );
    const payload = tasksSelected.map((task) => {
      const modfiedTask = {
        isApproved: true,
        scriptId: task.scriptId,
        isRun: true,
      };
      return modfiedTask;
    });
    fetchTaskList();
    console.log(payload);
  };
  return (
    <Toolbar
      sx={{
        backgroundColor: 'white',
        color: 'black',
        borderBottom: '1px solid black',
      }}
    >
      <Grid2 container spacing={4}>
        <Grid2 item xs={2}>
          <Button
            sx={{ color: 'black', borderColor: 'black' }}
            variant="outlined"
            onClick={sendForApproval}
            disabled={selectedTab !== 0 || rowSelectionModel.length === 0}
          >
            Send For Approval
          </Button>
        </Grid2>
        <Grid2 item xs={2}>
          <Button
            sx={{ color: 'black', borderColor: 'black' }}
            variant="outlined"
            onClick={approveTasks}
            disabled={selectedTab !== 1 || rowSelectionModel.length === 0}
          >
            Approve
          </Button>
        </Grid2>
      </Grid2>
    </Toolbar>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [approverSelectionModel, setApproverSelectionModel] = useState([]);
  const [value, setValue] = useState(0);
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  const [tasks, setTasks] = useState({ maker: [], approver: [] });

  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    const defaultTab =
      userInfo?.userType === '0' ? 0 : userInfo?.userType === '1' ? 1 : 0;
    setValue(defaultTab);
    // getTasksList().then((data)=>{
    //   console.log(data)
    // })
    fetchTaskList();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchTaskList = () => {
    let tasks = getTasksList();
    const makerTasks = tasks?.maker?.map((task) => {
      task.status =
        task.isApproved === true && task.isRun == true
          ? 'Running'
          : task.isApproved === true && task.isRun == false
          ? 'Pending Approval'
          : 'New';
      task.id = task.scriptId;
      return task;
    });
    const approverTasks = tasks?.approver?.map((task) => {
      task.status =
        task.isApproved === true && task.isRun == true
          ? 'Running'
          : task.isApproved === true && task.isRun == false
          ? 'Pending Approval'
          : 'New';
      task.id = task.scriptId;
      return task;
    });
    setTasks({ maker: makerTasks, approver: approverTasks });
  };

  return (
    <div className="App">
      <header className="App-header">Tasks List</header>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" color="primary">
          {appBarLabel(rowSelectionModel, value, tasks, fetchTaskList)}
        </AppBar>
      </ThemeProvider>
      <Box
        sx={{ borderBottom: 1, borderColor: 'divider', paddingLeft: '10px' }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{ style: { background: 'black', color: 'black' } }}
        >
          {(userInfo?.userType === 0 || userInfo?.userType === 2) && (
            <Tab label="Maker" {...a11yProps(0)} />
          )}
          {(userInfo?.userType === 1 || userInfo?.userType === 2) && (
            <Tab label="Approver" {...a11yProps(1)} />
          )}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <DataGrid
          rows={tasks.maker}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          sx={{ overflow: 'clip' }}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <DataGrid
          rows={tasks.approver}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setApproverSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={approverSelectionModel}
          sx={{ overflow: 'clip' }}
        />
      </CustomTabPanel>
    </div>
  );
}

export default App;
