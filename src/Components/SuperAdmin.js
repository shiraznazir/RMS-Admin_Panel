import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAdmin, updateAdmin } from "../api/api";

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

function SuperAdmin() {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState("");
  const [id, setId] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleResturant = () => {
    navigate("/addAdmin");
  };

  const fetchApi = () => {
    getAdmin().then((res) => {
      if (res.data.status) {
        let data = res.data.admins.filter((item)=>{
          console.log("ID", item.role)
          if(item.role === 2){
            return item
          }
        })
        setAdmins(data);
      }
    });
  };

  const activatePlan = (plan) => {
    setOpen(false);
    const addMonths = (numOfMonths, date = new Date()) => {
      date.setMonth(date.getMonth() + numOfMonths);
      return date;
    };
    let lastDate = addMonths(plan);
    let currentDate = new Date();

    let update = {
      startDate: currentDate,
      endDate: lastDate,
    };

    updateAdmin(id, update).then((res) => {
      if (res.data.status) { 
        setSuccess(res.data.msg);
      }
    });
  };

  useEffect(() => {
    fetchApi();
  }, [success]);

  return (
    <div>
      <Box sx={style.headerBox}>
        {/* <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ padding: 4, width: 100, height: 100 }}
      /> */}
      </Box>
      <Grid sx={{ mt: 2 }} container spacing={2}>
        <Grid item xs={6} md={8}>
          <Typography variant="h4" sx={style.headerText}>
            Super Admin
          </Typography>
        </Grid>
        <Grid align="right" sx={{ mr: 1 }} item xs={4} md={3}>
          <Button onClick={handleResturant} variant="outlined">
            Add Resturant
          </Button>
          {/* <Button
            onClick={(e) => handleSubmit(e)}
            sx={{ ml: 1, mr: 1 }}
            variant="outlined"
          >
            Save
          </Button> */}
        </Grid>
      </Grid>
      <Box m={4} elevation={5} sx={{ borderRadius: "100px" }}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650, borderRadius: "100px" }}
            aria-label="caption table"
          >
            <TableHead>
              <TableRow sx={{ fontWeight: "bold", fontSize: "20px" }}>
                <TableCell sx={{ fontWeight: "bold", fontSize: "20px" }}>
                  Serial No
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "20px" }}
                  align="centre"
                >
                  Resturant Name
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "20px" }}
                  align="centre"
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "20px" }}
                  align="centre"
                >
                  Mobile No
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "20px" }}
                  align="centre"
                >
                  Start Date
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "20px" }}
                  align="centre"
                >
                  End Date
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "20px" }}
                  align="centre"
                >
                  Order Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.map((admin, index) => (
                  <TableRow key={admin.id}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="centre">{admin.resturantName}</TableCell>
                  <TableCell align="centre">{admin.username}</TableCell>
                  <TableCell align="centre">{admin.mobNo}</TableCell>
                  <TableCell align="centre">
                    {admin.startDate
                      ? new Date(admin.startDate).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell align="centre">
                    {admin.endDate
                      ? new Date(admin.endDate).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell align="centre">
                    <Button
                      variant="contained"
                      onClick={() => {
                        setId(admin._id);
                        setOpen(true);
                      }}
                    >
                      Renew
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Select Plan</DialogTitle>
        <ListItemButton onClick={() => activatePlan(3)}>
          <ListItemText primary="3 Months" />
        </ListItemButton>
        <ListItemButton onClick={() => activatePlan(6)}>
          <ListItemText primary="6 Months" />
        </ListItemButton>
        <ListItemButton onClick={() => activatePlan(12)}>
          <ListItemText primary="12 Months" />
        </ListItemButton>
        <ListItemButton onClick={() => activatePlan(24)}>
          <ListItemText primary="24 Months" />
        </ListItemButton>
      </Dialog>
    </div>
  );
}

export default SuperAdmin;
