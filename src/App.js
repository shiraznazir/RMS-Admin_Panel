import React,{ useEffect } from 'react'
import Navbar from './pages/app/Navbar'
import Login from './pages/login/Login';
import { useSelector } from 'react-redux';
import { selectUser } from './Components/store/reducer/userSlice';
import { useDispatch } from 'react-redux'
import { login } from "./Components/store/reducer/userSlice";

function App() {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log("User1 " , user);

  useEffect(() => {
    var user = JSON.parse(localStorage.getItem("admin"));
    console.log("User check>>", user)
    dispatch(
      login(user)
    )
    // const browerData = document.cookie
    // dispatch(
    //   login(browerData)
    // )
    window.process = {
      ...window.process,
    };
  }, []);

  return (
    <div>
      {user ? <Navbar /> : <Login />}  
    </div>
  )
}

export default App