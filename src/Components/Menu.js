import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Typography, Box, Grid, Button, Modal } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { Stack } from "@mui/system";
import { selectUser } from './store/reducer/userSlice';
import { getMenuItemsByRes, deleteMenuItem } from "../api/api";
import { setMenuItems } from "./store/reducer/menuItemsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const tableHeader = { fontWeight: "bold", fontSize: "15px" };

function Menu() {

  const menuItems = useSelector((state) => state.menuItems.menuItems);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    navigate("/menu");
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getMenuItemsByRes(user.id)
      .then((res) => {
        let data = res.data.filter((item)=>{
            return item.resturantId === user.id
        })
        dispatch(setMenuItems(data));
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  }, []);

  const handleDelete = (id) => {
    deleteMenuItem(id);
    navigate("/menu");
  };

  console.log("menuItems >> :- ", menuItems);

  return (
    <Box
      pb={3}
      sx={{ bgcolor: "#f0f1f1", width: "100%", borderRadius: "10px" }}
    >
      <Grid m={2} container spacing={2}>
        <Grid item xs={12} md={8} lg={9}>
          <Typography
            p="2"
            variant="h5"
            fontWeight="bold"
            sx={{ color: "#2E4CDC" }}
          >
            Menu Items
          </Typography>
          <Typography p="2" sx={{ color: "#93868C" }}>
            Here is your Menu Items list data
          </Typography>
        </Grid>
        <Grid item mt={3} xs={12} md={4} lg={3}>
          <Link
            to="/addmenu"
            style={{ textDecoration: 'none' }}
          >
            <Button
              variant="outlined"
              sx={{ bgcolor: "#dde0ef" }}
            >
              <ControlPointIcon sx={{ marginRight: "10px" }} />
                Add Menu Items
              <KeyboardArrowDownIcon />
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Box m={4} sx={{ borderRadius: "100px" }}>
        <TableContainer m={3} component={Paper}>
          <Table
            sx={{ minWidth: 650, borderRadius: "100px" }}
            aria-label="caption table"
          >
            <TableHead>
              <TableRow sx={tableHeader}>
                <TableCell sx={tableHeader}>Menu Items No</TableCell>
                <TableCell sx={tableHeader} align="centre">
                  Menu Items Name
                </TableCell>
                <TableCell sx={tableHeader} align="centre">
                  Veg
                </TableCell>
                <TableCell sx={tableHeader} align="centre">
                  Full Price
                </TableCell>
                <TableCell sx={tableHeader} align="centre">
                  Half Price
                </TableCell>
                <TableCell sx={tableHeader} align="centre">
                  Quater Price
                </TableCell>
                <TableCell sx={tableHeader} align="centre">
                  Edit
                </TableCell>
                <TableCell sx={tableHeader} align="centre">
                  Remove
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menuItems.map((item) => (
                <TableRow key={item._id}>
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="centre">{item.name}</TableCell>
                  <TableCell align="centre">{item.isVeg}</TableCell>
                  <TableCell align="centre">
                    {item.price ? item.price : item.fullPrice}
                  </TableCell>
                  <TableCell align="centre">
                    {item.halfPrice ? item.halfPrice : "-"}
                  </TableCell>
                  <TableCell align="centre">
                    {item.quaterPrice ? item.quaterPrice : "-"}
                  </TableCell>
                  <TableCell align="centre">
                    <Link to={`/edit/${item._id}`}>
                      <EditIcon fontSize="large" />
                    </Link>
                  </TableCell>
                  <TableCell align="centre">
                    <ClearIcon
                      fontSize="large"
                      sx={{ color: "#FF0000", alignItems: "center" }}
                      onClick={handleOpen}
                    />
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          m={2}
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Are you sure to delete the item
                        </Typography>
                        <Stack direction="row" spacing={5} m={2}>
                          <Button
                            onClick={() => {
                              handleDelete(item._id);
                              handleClose();
                            }}
                            variant="contained"
                          >
                            Yes
                          </Button>
                          <Button onClick={handleClose} variant="contained">
                            No
                          </Button>
                        </Stack>
                      </Box>
                    </Modal>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Menu;
