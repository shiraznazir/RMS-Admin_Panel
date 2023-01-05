import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./store/reducer/userSlice";
import { checkAdminCredentials } from "../api/api";
import {
  TextareaAutosize,
  FormControl,
  InputLabel,
  OutlinedInput,
  Grid,
  Paper,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const paperStyle = {
  padding: 40,
  height: "70vh",
  width: 350,
  margin: "50px auto",
};

const avatarStyle = {
  backgroundColor: "green",
};

const btnStyle = {
  margin: "8px 0",
};

const formStyle = {
  mb: 2,
  mt: 1,
  width: "100%",
};

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    username: "",
    password: "",
    submit: "",

  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "") {
      setError({ ...error, username: "Username is mandatory" });
    } else if (password === "") {
      setError({ username: "", password: "Password is mandatory" });
    } else {
      checkAdminCredentials({ username: username, password: password }).then((res)=>{
        console.log("check res", res.data);
        if(res.data.status){
          // setError({ username: "", password: "", submit: "Invalid username and password" });
          dispatch(
            login({
              username: username,
              password: password,
              loggedIn: true,
            })
          );
          localStorage.setItem(
            "user",
            JSON.stringify({ username: username, loggedIn: true })
          );
          // document.cookie = `username=${username}; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/`;
          // document.cookie = `password=${password}; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/`;
          // document.cookie = `loggedIn=${true}; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/`;
          navigate("/");
        }else{
          setError({ username: "", password: "", submit: "Invalid username and password" });
        }
      });
    }
  };

  console.log("User Details>>>>>", username, password);

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField
          label="Username"
          placeholder="Enter Username"
          onChange={(e) => {
            if(e.target.value.length < 10){
              setUsername(e.target.value)
            }
          }}
          fullWidth
          required
        />
        {error.username && <Typography sx={{ color: "#FF0000" }}>{error.username}</Typography>}
        <TextField
          sx={{ margin: "15px 0" }}
          label="Password"
          placeholder="Enter Password"
          onChange={(e) => {
            if(e.target.value.length < 10){
              setPassword(e.target.value)
            }
          }}
          type="password"
          fullWidth
          required
        />
        {error.password && <Typography sx={{ color: "#FF0000" }}>{error.password}</Typography>}
        {error.submit && <Typography sx={{ color: "#FF0000" }}>{error.submit}</Typography>}
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
        <Button
          onClick={(e) => handleSubmit(e)}
          type="submit"
          color="primary"
          variant="contained"
          style={btnStyle}
          fullWidth
        >
          Sign In
        </Button>

        <Typography>
          <Link href="#">Forgot password ?</Link>
        </Typography>
        <Typography>
          Do you have an account ?<Link onClick={handleClickOpen}>Sign Up</Link>
        </Typography>
      </Paper>
      <div>
        {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      </div>
    </Grid>
  );
}

export default Login;
