import axios from 'axios';

export const getMenuItems = () =>{
    return axios.get('http://localhost:9000/menu')
}

export const getMenuItemsById = (id) =>{
    return axios.get(`http://localhost:9000/menu/${id}`)
}

export const deleteMenuItem = (id) =>{
    return axios.delete(`http://localhost:9000/menu/delete/${id}`)
}

export const insertMenuItem = (data) =>{
    console.log("Add Menu Items: ", data);
    return axios.post('http://localhost:9000/menu', data)
}

export const insertCategories = (data)=> {
    console.log("Data:- ", data)
    return axios.post(`http://localhost:9000/categories/`,data)
}

export const getCategories = ()=> {
    return axios.get(`http://localhost:9000/categories/`)
}