import axios from 'axios';

export const getProducts = ()=> {
    return axios.get('http://localhost:3500/products')
}