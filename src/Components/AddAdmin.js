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
import { useNavigate } from "react-router-dom";

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
  success: {
    color: "#006400",
  },
  error: {
    color: "#FF0000",
  },
};

function AddAdmin() {
  const navigate = useNavigate();
  const [resName, setResName] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mobNo, setMobNo] = useState();
  const [email, setEmail] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [fssaiNo, setFssaiNo] = useState("");
  const [address, setAddress] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const formCredentials = () => {
    const formData = new FormData();

    formData.append("resturantName", resName);
    formData.append("name", name);
    formData.append("password", password);
    formData.append("mobNo", mobNo);
    formData.append("email", email);
    formData.append("gstNo", gstNo);
    formData.append("fssaiNo", fssaiNo);
    formData.append("address", address);

    return formData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (resName === "") {
      setError("Resturant Name is mandatory");
    } else if (name === "") {
      setError("Name is mandatory");
    } else if (password === "") {
      setError("Password is mandatory");
    } else if (mobNo === "") {
      setError("mobNo is mandatory");
    } else {
      const generateRandomNoID = () => {
        let randomNumber = Math.floor(100000 + Math.random() * 900000);
        randomNumber = String(randomNumber);
        randomNumber = randomNumber.substring(0, 4);
        return "res_" + randomNumber;
      };
      const id = generateRandomNoID();
      let formData = {
        id: id,
        resturantName: resName,
        role: 2,
        name: name,
        password: password,
        mobNo: mobNo,
        email: email,
        gstNo: gstNo,
        fssaiNo: fssaiNo,
        address: address,
      };
      console.log("Adding resturant>>>>>", formData);
      insertAdmin(formData).then((res) => {
        if (res.data.status) {
          setSuccess(res.data.message);
          setTimeout(() => {
            navigate("/superAdmin");
          }, 3000);
        }
      });
    }
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  // console.log("Check form Data >>>>>>>>>", mobNo);

  return (
    <Grid component="form">
      <Paper sx={style.paper}>
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
              value={password}
              onChange={(e) => {
                if (e.target.value.length < 20) {
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
              Mobile No
            </InputLabel>
            <OutlinedInput
              size="small"
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
              Email
            </InputLabel>
            <OutlinedInput
              type="text"
              size="small"
              label="email"
              value={email}
              onChange={(e) => {
                if (e.target.value.length < 30) {
                  setEmail(e.target.value);
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
              label="GST No"
              size="small"
              value={gstNo}
              onChange={(e) => {
                if (e.target.value.length <= 15) {
                  setGstNo(e.target.value);
                }
              }}
            />
          </FormControl>
        </Grid>
        <Grid align="center">
          <FormControl sx={{ mb: 2, width: "100%" }}>
            <InputLabel size="small" htmlFor="outlined-adornment-amount">
              FSSAI No
            </InputLabel>
            <OutlinedInput
              label="FSSAI No"
              size="small"
              value={fssaiNo}
              onChange={(e) => {
                if (e.target.value.length <= 14) {
                  setFssaiNo(e.target.value);
                }
              }}
            />
          </FormControl>
        </Grid>
        <Grid align="center">
          <FormControl sx={{ mb: 2, width: "100%" }}>
            <InputLabel size="small" htmlFor="outlined-adornment-amount">
              Address
            </InputLabel>
            <OutlinedInput
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
        {error && (
          <Typography align="left" sx={style.error}>
            {error}
          </Typography>
        )}
        {success && (
          <Typography align="left" sx={style.success}>
            {success}
          </Typography>
        )}
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
