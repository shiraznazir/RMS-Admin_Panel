import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import moment from "moment";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";
import SubMenu from "../../Components/SubMenu/SubMenu";
import Breadcrumb from "../../Components/Breadcrumb/index";
import { DataGrid } from "@mui/x-data-grid";
import { getAdmin, updateAdmin } from "../../api/api";

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
  tableBox: {
    mt: -2,
    bgcolor: "#f0f0f0",
    pb: 2,
  },
  headerText: { fontWeight: "bold", ml: 5, mt: 1, color: "#1976D2" },
  addResturant: { ml: { xs: 5, md: 15 } },
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
        let data = res.data.admins.filter((item) => {
          if (item.role === 2) {
            item.startDate = moment(item.startDate).format("DD-MMM-YYYY");
            item.endDate = moment(item.endDate).format("DD-MMM-YYYY");
            let currentDate = new Date();
            let endDate = new Date(item.endDate);
            let status = currentDate < endDate;
            item.status = status;
            return item;
          }
        });
        setAdmins(data);
      }
    });
  };

  const addMonths = (numOfMonths, date) => {
    date.setMonth(date.getMonth() + numOfMonths);
    return date;
  };

  const activatePlan = (plan) => {
    setOpen(false);
    
    let lastDate = addMonths(plan, new Date());
    let resturant = admins?.filter((item)=> item.id === id)
    let firstDate = new Date();
    if(resturant[0].status){
      firstDate = new Date(resturant[0].startDate);
      lastDate = addMonths(plan, new Date(resturant[0].endDate))
    }
   
    let update = {
      startDate: firstDate,
      endDate: lastDate,
    };
    updateAdmin(id, update).then((res) => {
      if (res.data.status) {
        setSuccess(res.data.msg);
        fetchApi()
      }
    });
  };

  useEffect(() => {
    fetchApi();
  }, [success]);

  const columns = [
    { field: "id", headerName: "Resturant ID", width: 100 },
    {
      field: "resturantName",
      headerName: "Resturant name",
      width: 250,
      editable: true,
    },
    {
      field: "username",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "mobNo",
      headerName: "Mobile No.",
      width: 150,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 160,
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 160,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {
        return (
          <Chip
            label={params.value ? "Active" : "Inactive"}
            color={params.value ? "success" : "error"}
            variant="outlined"
          />
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => {
              console.log("Params ", params);
              setId(params.id);
              setOpen(true);
            }}
            variant="contained"
          >
            Renew
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <SubMenu
        title={<Breadcrumb routeSegments={[{ name: "Admins", path: "#" }]} />}
      />
      <Box sx={style.tableBox}>
        <Grid sx={{ mt: 2, pt: 2 }} container spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" sx={style.headerText}>
              Resturants List
            </Typography>
          </Grid>
          <Grid sx={{ mr: 1 }} item xs={12} md={3}>
            <Button
              onClick={handleResturant}
              variant="outlined"
              sx={style.addResturant}
            >
              Add Resturant
            </Button>
          </Grid>
        </Grid>
        <Box
          sx={{ height: 400, width: "96%", bgcolor: "#ffffff", ml: 4, mt: 2 }}
        >
          <DataGrid
            rows={admins}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
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
