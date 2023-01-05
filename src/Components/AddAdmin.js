import React, { useState } from "react";
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Paper,
} from "@mui/material";
import { insertAdmin } from "../api/api";

const style = {
  address: {
    width: "100%",
    borderColor: "#C4C4C4",
    borderRadius: "5px",
    "&:hover": {
      borderColor: "#0000FF",
    },
    "&:placeholder": {
      color: "red",
      opacity: 1,
    },
  },
  paper: {
    padding: 5,
    width: "40%",
    margin: "5px auto",
  },
};

function AddAdmin() {
  const [resName, setResName] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mobNo, setMobNo] = useState();
  const [email, setEmail] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [fssaiNo, setFssaiNo] = useState("");
  const [address, setAddress] = useState("");

  const formCredentials = () => {
    const formdata = new FormData();

    formdata.append("resturantName", resName);
    formdata.append("name", name);
    formdata.append("password", password);
    formdata.append("mobNo", mobNo);
    formdata.append("email", email);
    formdata.append("gstNo", gstNo);
    formdata.append("fssaiNo", fssaiNo);
    formdata.append("address", address);

    return formdata;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = formCredentials();
    insertAdmin(formData);
  };

  // console.log("Check form Data >>>>>>>>>", mobNo);

  return (
    <Grid component="form">
      <Paper sx={ style.paper }>
        <Typography
          variant="h5"
          fontWeight="bold"
          align="center"
          sx={{ color: "#3385ff" }}
        >
          Add Admin
        </Typography>
        <Grid align="center">
          <FormControl sx={{ mb: 2, mt: 2, width: "100%" }}>
            <InputLabel size="small" htmlFor="outlined-adornment-amount">
              Resturant Name
            </InputLabel>
            <OutlinedInput
              type="text"
              size="small"
              id="outlined-adornment-amount"
              value={resName}
              onChange={(e) => {
                if (e.target.value.length <= 60) {
                  setResName(e.target.value);
                }
              }}
              fontWeight="small"
              label="Resturant Name"
            />
          </FormControl>
        </Grid>
        <Grid align="center">
          <FormControl sx={{ mb: 2, width: "100%" }}>
            <InputLabel size="small" htmlFor="outlined-adornment-amount">
              Name
            </InputLabel>
            <OutlinedInput
              type="text"
              size="small"
              id="outlined-adornment-amount"
              value={name}
              onChange={(e) => {
                if (e.target.value.length < 20 && isNaN(e.target.value)) {
                  setName(e.target.value);
                }
              }}
              fontWeight="small"
              label="Name"
            />
          </FormControl>
        </Grid>
        <Grid align="center">
          <FormControl sx={{ mb: 2, width: "100%" }}>
            <InputLabel size="small" htmlFor="outlined-adornment-amount">
              Password
            </InputLabel>
            <OutlinedInput
              type="password"
              size="small"
              id="outlined-adornment-amount"
              value={password}
              onChange={(e) => {
                if (e.target.value.length < 20 && isNaN(e.target.value)) {
                  setPassword(e.target.value);
                }
              }}
              fontWeight="small"
              label="Password"
            />
          </FormControl>
        </Grid>
        <Grid align="center">
          <FormControl sx={{ mb: 2, width: "100%" }}>
            <InputLabel size="small" htmlFor="outlined-adornment-amount">
              Email
            </InputLabel>
            <OutlinedInput
              type="text"
              size="small"
              id="outlined-adornment-amount"
              label="email"
              value={email}
              onChange={(e) => {
                if (e.target.value.length < 20) {
                  setEmail(e.target.value);
                }
              }}
            />
          </FormControl>
        </Grid>
        <Grid align="center">
          <FormControl sx={{ mb: 2, width: "100%" }}>
            <InputLabel size="small" htmlFor="outlined-adornment-amount">
              Mobile No
            </InputLabel>
            <OutlinedInput
              size="small"
              id="outlined-adornment-amount"
              label="Mobile No"
              value={mobNo}
              onChange={(e) => {
                if (e.target.value.length <= 10 && !isNaN(e.target.value)) {
                  setMobNo(e.target.value);
                }
              }}
            />
          </FormControl>
        </Grid>
        <Grid align="center">
          <FormControl sx={{ mb: 2, width: "100%" }}>
            <InputLabel size="small" htmlFor="outlined-adornment-amount">
              GST No
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              label="GST No"
              size="small"
              value={gstNo}
              onChange={(e) => setGstNo(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid align="center">
          <FormControl sx={{ mb: 2, width: "100%" }}>
            <InputLabel size="small" htmlFor="outlined-adornment-amount">
              FSSAI No
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              label="FSSAI No"
              size="small"
              value={fssaiNo}
              onChange={(e) => setFssaiNo(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid align="center">
          <FormControl sx={{ mb: 2, width: "100%" }}>
            <InputLabel size="small" htmlFor="outlined-adornment-amount">
              Address
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              label="Address"
              size="small"
              multiline
              rows="3"
              cols="50"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid align="center">
          <Button
            variant="contained"
            align="center"
            onClick={(e) => handleSubmit(e)}
            sx={{ margin: "8px 0" }}
          >
            Submit
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default AddAdmin;
