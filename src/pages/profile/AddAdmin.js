import React, { useState } from "react";
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Paper,
  Box,
} from "@mui/material";
import { insertAdmin } from "../../api/api";
import { useNavigate } from "react-router-dom";
import SubMenu from "../../Components/SubMenu/SubMenu";
import Breadcrumb from "../../Components/Breadcrumb/index";

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
    margin: 5,
    width: "100%",
    margin: "5px auto",
    bgcolor: "#ffffff",
    borderRadius: 5,
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
  const [loading, setLoading] = useState(false);
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
    formData.append("username", name);
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
        username: name,
        password: password,
        mobNo: mobNo,
        email: email,
        gstNo: gstNo,
        fssaiNo: fssaiNo,
        address: address,
      };
      setLoading(true)
      insertAdmin(formData).then((res) => {
        if (res.data.status) {
          console.log("REs", res.data)
          setSuccess(res.data.message);
          setTimeout(() => {
            navigate("/Admins")
            setLoading(false)
          }, 3000);
        }
      });
    }
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  return (
    <>
      <SubMenu
        title={
          <Breadcrumb
            routeSegments={[
              { name: "Users", path: "#" },
              { name: "Add Users", path: "/Admins" },
            ]}
          />
        }
      />
      <Box sx={{ width: "100%", bgcolor: "#f0f0f0", p: 4, mt: -2, mb: 6 }}>
        <Box sx={style.paper}>
          <Box>
            <Typography
              variant="h5"
              fontWeight="bold"
              align="left"
              sx={{ color: "#3385ff", mb: 5 }}
            >
              Add Admin
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid align="center" item xs={12} md={6}>
              <FormControl sx={{ mb: 2, width: "100%" }}>
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
            <Grid align="center" item xs={12} md={6}>
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
            <Grid align="center" item xs={12} md={6}>
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
            <Grid align="center" item xs={12} md={6}>
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
            <Grid align="center" item xs={12} md={6}>
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
            <Grid align="center" item xs={12} md={6}>
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
            <Grid align="center" item xs={12} md={6}>
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
            <Grid align="center" item xs={12} md={6}>
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
          </Grid>
        </Box>
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          height: "75px",
          bgcolor: "#F8F9FA",
          zIndex: 10,
        }}
      >
        <Box sx={{ width: "94%", mt: 2 }} align="right">
          <Button
            variant="contained"
            align="center"
            sx={{ mr: 2 }}
            disabled={loading}
            onClick={() => navigate("/Admins")}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            align="center"
            disabled={loading}
            onClick={(e) => handleSubmit(e)}
          >
            Save
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default AddAdmin;
