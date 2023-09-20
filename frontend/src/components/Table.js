'use client'

import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from 'next/link';
import MenuItem from '@mui/material/MenuItem';
import {
  getTodos,
  deleteTodo,
  addTodo,
  getTodo
} from '../app/service';

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
          theme.palette.action.selectedOpacity +
          theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));

const rows = [
  { id: 1, title: 'Snow', description: 'Jon', completed: true },
  { id: 2, title: 'Lannister', description: 'Cersei', completed: false },
  { id: 3, title: 'Lannister', description: 'Jaime', completed: true },
  { id: 4, title: 'Stark', description: 'Arya', completed: false },
  { id: 5, title: 'Targaryen', description: 'Daenerys', completed: true },
  { id: 6, title: 'Melisandre', description: null, completed: false },
  { id: 7, title: 'Clifford', description: 'Ferrara', completed: true },
  { id: 8, title: 'Frances', description: 'Rossini', completed: false },
  { id: 9, title: 'Roxie', description: 'Harvey', completed: true },
];

const completedStatuses = [
  {
    value: true,
    label: 'Yes',
  },
  {
    value: false,
    label: 'In Progress',
  },
];

export default function Table() {

  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState({ "completed": false, "description": "", "id": 0, "title": "" });
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, [isModified]);

  const fetchTodos = () => {
    getTodos()
      .then((response) => {
        setSelectedRows([...response]);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      })
  }

  const onDeleteTodo = (id) => {
    deleteTodo(id);
    setIsModified(!isModified)
  }

  const onChangeValue = (value) => {
    if (value.target.id === 'title') {
      setTodo({
        ...todo,
        title: value.target.value,
        completed: false
      })
    }
    if (value.target.id === 'description') {
      setTodo({
        ...todo,
        description: value.target.value,
        completed: false
      })
    }
    if (todo.id === undefined || !todo) {
      setTodo({
        ...todo,
        id: Math.floor(Math.random() * (100 - 10 + 1) + 10)
      })
    }
    if (value.target.name === undefined && (value.target.value === true || value.target.value === false)) {
      setTodo({
        ...todo,
        completed: value.target.value
      })
    }
  }

  const handleClickOpen = (id) => {
    if (id !== 0) {
      getTodo(id)
        .then((response) => {
          setTodo({
            ...response
          })
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        })
    }
    setOpen(true);
  };

  const handleClose = (event) => {
    if(event?.target?.textContent !== "Cancel") {
      if (todo?.title && todo?.description && todo?.completed !== undefined && todo.id !== undefined) {
        addTodo(todo);
        setTodo({ "completed": false, "description": "", "id": 0, "title": "" });
        setIsModified(!isModified)
      }
      setOpen(false);
    } else {
      setTodo({ "completed": false, "description": "", "id": 0, "title": "" });
      setOpen(false);
    }
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 50
    },
    {
      field: 'title',
      headerName: 'Title',
      flex: 0.5,
      width: 110,
      renderCell: (params) => {
        return <Link onClick={() => handleClickOpen(params.row.id)} href="#">{params.row.title}</Link>
      }
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 0.8,
      width: 250,
    },
    {
      field: 'completed',
      headerName: 'Completed',
      width: 120,
      renderCell: (params) => {
        return params.row.completed ? 'Yes' : 'In Progress'
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 120,
      renderCell: (params) => {
        return <Button onClick={() => onDeleteTodo(params.row.id)} color="error" variant="contained">Delete</Button>
      },
    },
  ];

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <h1 style={{ textAlign: 'center' }}>Todo List</h1>
      <StripedDataGrid
        sx={{ margin: "25px" }}
        rows={...selectedRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        pageSizeOptions={[15, 30, 60]}
        disableRowSelectionOnClick
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
      />
      <Button onClick={() => handleClickOpen(0)} color="primary" variant="contained" style={{ float: 'left', marginLeft: 40 }}>Add Todo</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add an item in todo list.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="string"
            value={todo?.title}
            fullWidth
            variant="standard"
            onChange={onChangeValue}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="string"
            value={todo?.description}
            fullWidth
            variant="standard"
            onChange={onChangeValue}
          />
          <TextField
            select
            defaultValue="false"
            autoFocus
            margin="dense"
            id="isCompleted"
            label="Completed"
            fullWidth
            value={todo?.completed}
            variant="standard"
            onChange={onChangeValue}
          >
            {completedStatuses.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={(event) => handleClose(event)}>Cancel</Button>
          <Button onClick={(event) => handleClose(event)}>Add/Updated Todo</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}