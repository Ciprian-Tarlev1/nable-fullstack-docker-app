import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_SERVER_HOST !== undefined ? process.env.NEXT_PUBLIC_SERVER_HOST : 'http://localhost:8080';

export const getTodos = () => {
  console.log(`process.env.NEXT_PUBLIC_SERVER_HOST: ${process.env.NEXT_PUBLIC_SERVER_HOST}`);
  console.log(`API_URL: ${API_URL}`);
  return axios.get(`${API_URL}/todos`)
    .then((response) => response.data._embedded.todos)
    .catch((error) => { throw error });
}

export const deleteTodo = (id) => {
  return axios.delete(`${API_URL}/todos/${id}`)
    .then((response) => response.data)
    .catch((error) => { throw error });
}

export const addTodo = (todo) => {
  return axios.post(`${API_URL}/todos`, todo)
    .then((response) => response.data)
    .catch((error) => { throw error });
}

export const updateTodo = (todo) => {
  return axios.put(`${API_URL}/todos`, todo)
    .then((response) => response.data)
    .catch((error) => { throw error });
}

export const getTodo = (id) => {
  return axios.get(`${API_URL}/todos/${id}`)
    .then((response) => response.data)
    .catch((error) => { throw error });
}