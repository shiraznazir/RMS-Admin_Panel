import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Paper,
  Avatar,
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const style = {
  address: {
    width: "100%",
    borderColor: "#C4C4C4",
    borderRadius: "5px",
    "&:hover": {
      borderColor: "#000000",
    },
    "&:placeholder": {
      color: "red",
      opacity: 1,
    },
  },
  headerBox: {
    padding: "10px",
    bgcolor: "#f0f1f1",
    mt: 2,
    width: "100%",
    height: "150px",
    borderRadius: "50px 50px 0 0",
    fontSize: "25px",
  },
  headerText: { fontWeight: "bold", ml: "100px", mt: 1 },
};

function Admin() {
  const navigate = useNavigate();
  const [resName, setResName] = useState("");
  const [name, setName] = useState("");
  const [mobNo, setMobNo] = useState();
  const [email, setEmail] = useState("");
  const [gstNo, setGstNo] = useState();
  const [fssaiNo, setFssaiNo] = useState();
  const [address, setAddress] = useState();

  const createFormData = () => {

    const formData = new FormData();
    formData.append("resturantName", resName);
    formData.append("adminName", name);
    formData.append("mobNo", mobNo);
    formData.append("email", email);
    formData.append("gstNo", gstNo);
    formData.append("fssaiNo", fssaiNo);
    formData.append("address", address);

    return formData;
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = createFormData();
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Box>
      <Box sx={style.headerBox}>
        {/* <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ padding: 4, width: 100, height: 100 }}
      /> */}
      </Box>
      <Grid sx={{ mt: 4 }} container spacing={2}>
        <Grid item xs={6} md={8}>
          <Typography variant="h4" sx={style.headerText}>
            Profile
          </Typography>
        </Grid>
        <Grid align="right" item xs={4} md={4}>
          <Button onClick={handleCancel} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={(e) => handleSubmit(e)}
            sx={{ ml: 1, mr: 1 }}
            variant="outlined"
          >
            Save
          </Button>
        </Grid>
      </Grid>
      <Grid sx={{ mt: 4 }} container spacing={2}>
        <Grid item xs={4} md={5.5}>
          <Typography sx={{ ml: "100px", mt: 1 }}>Resturant Name</Typography>
        </Grid>
        <Grid item xs={6} md={6}>
          <TextField
            inputProps={{
              style: {
                height: "0px",
              },
            }}
            type="text"
            placeholder="Resturant Name"
            value={resName}
            onChange={(e) => {
              if (e.target.value.length <= 60) {
                setResName(e.target.value);
              }
            }}
            id="outlined-basic"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid item xs={4} md={5.5}>
          <Typography sx={{ ml: "100px", mt: 1 }}>Admin Name</Typography>
        </Grid>
        <Grid item xs={6} md={6}>
          <TextField
            inputProps={{
              style: {
                height: "0px",
              },
            }}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              if (e.target.value.length <= 30) {
                setName(e.target.value);
              }
            }}
            id="outlined-basic"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid item xs={4} md={5.5}>
          <Typography sx={{ ml: "100px", mt: 1 }}>Mobile Number</Typography>
        </Grid>
        <Grid item xs={6} md={6}>
          <TextField
            inputProps={{
              style: {
                height: "0px",
              },
            }}
            placeholder="Mobile Number"
            value={mobNo}
            onChange={(e) => {
              if (e.target.value.length <= 10 && !isNaN(e.target.value)) {
                setMobNo(e.target.value);
              }
            }}
            id="outlined-basic"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid item xs={4} md={5.5}>
          <Typography sx={{ ml: "100px", mt: 1 }}>Email Address</Typography>
        </Grid>
        <Grid item xs={6} md={6}>
          <TextField
            inputProps={{
              style: {
                height: "0px",
              },
            }}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => {
              if (e.target.value.length <= 30) {
                setEmail(e.target.value);
              }
            }}
            id="outlined-basic"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid item xs={4} md={5.5}>
          <Typography sx={{ ml: "100px", mt: 1 }}>GST Number</Typography>
        </Grid>
        <Grid item xs={6} md={6}>
          <TextField
            inputProps={{
              style: {
                height: "0px",
              },
            }}
            placeholder="GST Number"
            value={gstNo}
            onChange={(e) => {
              if (e.target.value.length <= 15) {
                setGstNo(e.target.value);
              }
            }}
            id="outlined-basic"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid item xs={4} md={5.5}>
          <Typography sx={{ ml: "100px", mt: 1 }}>FSSAI Number</Typography>
        </Grid>
        <Grid item xs={6} md={6}>
          <TextField
            inputProps={{
              style: {
                height: "0px",
              },
            }}
            placeholder="FSSAI Number"
            value={fssaiNo}
            onChange={(e) => {
              if (e.target.value.length <= 14) {
                setFssaiNo(e.target.value);
              }
            }}
            id="outlined-basic"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid item xs={4} md={5.5}>
          <Typography sx={{ ml: "100px", mt: 1 }}>Address</Typography>
        </Grid>
        <Grid item xs={6} md={6}>
          <textarea
            type="address"
            value={address}
            placeholder="Address"
            onChange={(e) => {
              if (e.target.value.length < 100) {
                setAddress(e.target.value);
              }
            }}
            rows="3"
            cols="50"
            style={style.address}
          />
          {/* <TextField
            inputProps={{
              style: {
                height: "0px",
              },
            }}
            sx={{ mb: 2 }}
            id="outlined-basic"
            type='address'
            variant="outlined"
            fullWidth
            multiline
            rows={3}
          /> */}
        </Grid>
      </Grid>
      {/* <Card elevation={2} sx={{ p: 2, width: "50%" }}>
        <Grid container spacing={1}>
          <Grid item sx={2} md={2}>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </Grid>
          <Grid item sx={4} md={4}>
            <h4 sx={{ color: "#808080" }}>Hello</h4>
          </Grid>
        </Grid>
      </Card> */}
    </Box>
  );
}

export default Admin;
