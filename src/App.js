import React from 'react'
import { Routes, Route } from "react-router-dom";
import  Navbar from './Components/Navbar'
import Navbar2 from './Components/Navbar2'
import Dashboard from './Components/Dashboard'
import OrderedItem from './Components/OrderedItem'
import Menu from './Components/Menu';
import Stocks from './Components/Stocks'
import Dashboard2 from './Components/Dashboard2';
import Login from './Components/Login';
import {useSelector} from 'react-redux';
import { selectUser } from './Components/store/reducer/userSlice';

function App() {

  const user = useSelector(selectUser);

  return (
    <div>
      {user ? <Navbar2 /> : <Login />}  
    </div>
  )
}

export default App