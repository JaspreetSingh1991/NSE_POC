import {
  AppBar,
  Box,
  Button,
  createTheme,
  Grid2,
  Toolbar,
  Typography,
} from '@mui/material';
import './App.css';

import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider } from '@emotion/react';
import { useState } from 'react';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
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

function appBarLabel(rowSelectionModel) {
  const sendForApproval = () => {
    console.log(rowSelectionModel)
  };

  const approveTasks = () => {};
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
          >
            Send For Approval
          </Button>
        </Grid2>
        <Grid2 item xs={2}>
          <Button
            sx={{ color: 'black', borderColor: 'black' }}
            variant="outlined"
            onClick={approveTasks}
          >
            Approve
          </Button>
        </Grid2>
      </Grid2>
    </Toolbar>
  );
}

function App() {
  const [rowSelectionModel, setRowSelectionModel] =
    useState([]);
  return (
    <div className="App">
      <header className="App-header">Tasks List</header>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" color="primary">
          {appBarLabel(rowSelectionModel)}
        </AppBar>
      </ThemeProvider>
      <DataGrid
        rows={rows}
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
    </div>
  );
}

export default App;
