import React, { useState } from "react";
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Paper
} from "@mui/material";
import { insertAdmin } from '../api/api'

const paperStyle = { 
  padding: 5 ,
  width: "40%",
  margin: "5px auto"
}

function AddAdmin() {
  const [name, setName] = useState("");
  const [fName, setFName] = useState("");
  const [mobNo, setMobNo] = useState();
  const [address, setAddress] = useState("");
  const [role, setRole]  = useState("");

  const formCredentials = () =>{
    const formdata = new FormData();

    formdata.append("name", name)
    formdata.append("fatherName", fName)
    formdata.append("mobNo", mobNo)
    formdata.append("address", address)
    formdata.append("role", role)

    return formdata
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    insertAdmin(formCredentials)
  }

  return (
    <Grid component="form">
      <Paper sx={paperStyle}>
      <Typography
        variant="h5"
        fontWeight="bold"
        align="center"
        sx={{ color: "#3385ff" }}
      >
        Add Admin
      </Typography>
      <Grid align='center' >
        <FormControl sx={{ mb: 2, mt: 2, width: "100%" }}>
          <InputLabel size="small" htmlFor="outlined-adornment-amount">Name</InputLabel>
          <OutlinedInput
            type="text"
            size="small"
            id="outlined-adornment-amount"
            value={name}
            onChange={(e) => {
              if(e.target.value.length < 20 && isNaN(e.target.value)){
                setName(e.target.value)
              }
            }}
            fontWeight="small"
            label="Name"
          />
        </FormControl>
      </Grid>
      <Grid align='center'>
        <FormControl sx={{ mb: 2, width: "100%" }}>
          <InputLabel size="small" htmlFor="outlined-adornment-amount">
            Father's Name
          </InputLabel>
          <OutlinedInput
            type="text" 
            size="small"
            id="outlined-adornment-amount"
            label="Father's Name"
            value={fName}
            onChange={(e)=> {
              if(e.target.value.length < 20 && isNaN(e.target.value)){
                setFName(e.target.value)
              }
            }}
          />
        </FormControl>
      </Grid>
      <Grid align='center'>
        <FormControl sx={{ mb: 2, width: "100%" }}>
          <InputLabel size="small" htmlFor="outlined-adornment-amount">
            Mobile No
          </InputLabel>
          <OutlinedInput
            
            size="small"
            id="outlined-adornment-amount"
            label="Mobile No"
            value={mobNo}
            onChange={(e)=>{
              if(mobNo?.length <= 10 && 
                !isNaN(e.target.value) &&
                 e.target.value.length > 0){
                setMobNo(e.target.value)
              }
            }}
          />
        </FormControl>
      </Grid>
      <Grid align='center'>
        <FormControl sx={{ mb: 2, width: "100%" }}>
          <InputLabel size="small" htmlFor="outlined-adornment-amount">
            Address...
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Address"
            size="small"
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
          />
        </FormControl>
      </Grid>
      <Grid align='center'>
        <FormControl sx={{ mb: 2, width: "100%" }}>
          <InputLabel size="small" htmlFor="outlined-adornment-amount">
            Role
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            size="small"
            label="Role"
            value={role}
            onChange={(e)=>setRole(e.target.value)}
          />
        </FormControl>
      </Grid>
      <Grid align='center'>
      <Button
              variant="contained"
              align="center"
              onClick={(e)=> handleSubmit(e)}
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
