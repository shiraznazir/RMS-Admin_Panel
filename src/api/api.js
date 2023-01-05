import axios from 'axios';
axios.defaults.baseURL = "http://localhost:9000"

export const getMenuItems = () =>{
    return axios.get('/menu')
}

export const getMenuItemsById = (id) =>{
    console.log("IDs:-", id);
    return axios.get(`/menu/${id}`)
}

export const deleteMenuItem = (id) =>{
    return axios.delete(`/menu/delete/${id}`)
}

export const insertMenuItem = (data) =>{
    console.log("Add Menu Items: ", data);
    return axios.post('/menu', data)
}

export const editMenuItem = (id, data)=>{
    console.log("Edit Menu Item :- ", id, data)
    return axios.put(`/menu/${id}`, data)
}

export const insertCategories = (data)=> {
    console.log("Data:- ", data)
    return axios.post(`/categories/`,data)
}

export const getCategories = ()=> {
    return axios.get(`/categories/`)
}

export const getCategorie = (id) =>{
    return axios.get(`/categories/${id}`)
}

export const deleteCategorie = (id) =>{
    return axios.delete(`/categories/${id}`)
}

export const editCategorie = (id, data) =>{
    return axios.put(`/categories/${id}`, data)
}

export const insertAdmin = (data) =>{
    console.log("insert Admin>>", data);
    return axios.post(`/admin/`, data)
}

export const checkAdminCredentials = (data) =>{
    // console.log("CHeck admin>>>>>>>>>>>.", data);
    return axios.post(`/admin/check-admin/`, data)
}

export const getOrders = () =>{
    return axios.get(`/order/`)
}

export const getOrderByStatus = () =>{
    return axios.get(`/order/allOrder/`)
}

export const editOrder = (id, data) =>{
    //console.log("Edit order >>>>>>>>", id, data);
    return axios.put(`/order/${id}`, data)
}