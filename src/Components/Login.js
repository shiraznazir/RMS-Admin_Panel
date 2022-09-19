import React from "react";
import {
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
  padding: 20,
  height: "70vh",
  width: 300,
  margin: "20px auto",
};

const avatarStyle = {
  backgroundColor: "green",
};

const btnStyle = {
    margin: "8px 0"
}

function Login() {
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
            fullWidth
            required
          />
          <TextField
            sx={{margin: "8px 0"}}
            label="Password"
            placeholder="Enter Password"
            type="password"
            fullWidth
            required
          />

          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth>
            Sign In
          </Button>
        
        <Typography>
          <Link href="#">Forgot password ?</Link>
        </Typography>
        <Typography>Do you have an account ?
          <Link href="#">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}

export default Login;
