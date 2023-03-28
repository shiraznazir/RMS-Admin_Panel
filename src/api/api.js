import axios from "axios";
axios.defaults.baseURL = "http://localhost:9000";

export const getMenuItems = () => {
  return axios.get("/menu");
};

export const getMenuItemsByRes = (id) => {
  return axios.get(`/menu/res-id/${id}`);
};

export const getMenuItemsById = (id) => {
  console.log("IDs:-", id);
  return axios.get(`/menu/${id}`);
};

export const deleteMenuItem = (id) => {
  return axios.delete(`/menu/delete/${id}`);
};

export const insertMenuItem = (data) => {
  console.log("Add Menu Items: ", data);
  return axios.post("/menu", data);
};

export const editMenuItem = (id, data) => {
  console.log("Edit Menu Item :- ", id, data);
  return axios.put(`/menu/${id}`, data);
};

export const insertCategories = (data) => {
  return axios.post(`/categories/`, data);
};

export const getCategories = () => {
  return axios.get(`/categories/`);
};

export const getCateByResturant = (data) => {
  return axios.post(`/categories/res-id`, data);
};

export const getCategory = (id) => {
  return axios.get(`/categories/${id}`);
};

export const deleteCategory = (id) => {
  return axios.delete(`/categories/${id}`);
};

export const editCategory = (id, data) => {
  return axios.put(`/categories/${id}`, data);
};

export const insertAdmin = (data) => {
  return axios.post(`/admin`, data);
};

export const getAdmin = () => {
  return axios.get(`/admin`);
};

export const getAdminByUser = (id) => {
  return axios.get(`/admin/${id}`);
};

export const updateAdmin = (id, data) => {
  return axios.put(`/admin/update-admin/${id}`, data);
};

export const checkAdminCredentials = (data) => {
  return axios.post(`/admin/check-admin/`, data);
};

export const getOrders = () => {
  return axios.get(`/order/`);
};

export const getOrderByStatus = (id) => {
  return axios.get(`/order/allOrder/${id}`);
};

export const editOrder = (id, data) => {
  return axios.put(`/order/${id}`, data);
};

export const getDeliveredOrders = (data) => {
  console.log("Recent Order ", data)
  return axios.post(`/order/recent-order/`, data);
};

export const getOrdersHistory = (data) =>{
  return axios.post(`/history-order`, data) 
}

export const getPreviousOrders = (data) =>{
  return axios.post(`/res-history`, data) 
}

export const getUsers = () =>{
  return axios.get(`/user`)
}
