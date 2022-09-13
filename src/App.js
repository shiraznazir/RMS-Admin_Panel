import React from 'react'
import { Routes, Route } from "react-router-dom";
import  Navbar from './Components/Navbar'
import Dashboard from './Components/Dashboard'
import OrderedItem from './Components/OrderedItem'
import Menu from './Components/Menu';
import Stocks from './Components/Stocks'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/OrderedItem" element={<OrderedItem />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/Stocks" element={<Stocks />} />
      </Routes>      
    </div>
  )
}

export default App