import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, Box, Grid, Button, Popover } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getCateByResturant, deleteCategory } from "../../api/api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../Components/store/reducer/userSlice";
import Dialog from "@mui/material/Dialog/Dialog";

function Categories() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [categoryId, setCategory] = useState("");

  const fetchCategories = () =>{
    getCateByResturant({ id: user.id })
      .then((res) => {
        if (res.data.status) {
          setCategories(res.data.categories);
        }
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  }
  const handleOpen = (id) => {
    setCategory(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchCategories()
  }, []);

  const handleDelete = () => {
    deleteCategory(categoryId).then((res) => {
      if (res.data.status) {
        setOpen(false);
        fetchCategories();
        navigate("/category");
      }
    });
  };

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
            Categories of Food Items
          </Typography>
          <Typography p="2" sx={{ color: "#93868C" }}>
            Here is your Categories list data
          </Typography>
        </Grid>
        <Grid item mt={3} xs={12} md={4} lg={3}>
          <Link to="/addcategories" style={{ textDecoration: "none" }}>
            <Button variant="outlined" sx={{ bgcolor: "#dde0ef" }}>
              <ControlPointIcon sx={{ marginRight: "10px" }} />
              Add Categories
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
              <TableRow sx={{ fontWeight: "bold", fontSize: "20px" }}>
                <TableCell sx={{ fontWeight: "bold", fontSize: "20px" }}>
                  Categories ID
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "20px" }}
                  align="centre"
                >
                  Title
                </TableCell>
                {/* <TableCell
                  sx={{ fontWeight: "bold", fontSize: "20px" }}
                  align="centre"
                >
                  Status
                </TableCell> */}
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "20px" }}
                  align="centre"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {
                categories?.map((ele)=>{
                  console.log("Cate ID", ele.id);
                })
              } */}
              {categories?.map((category) => (
                <TableRow key={category.id}>
                  <TableCell component="th" scope="row">
                    {category.id}
                  </TableCell>
                  <TableCell align="centre">{category.title}</TableCell>
                  {/* <TableCell align="centre">{category.status}</TableCell> */}
                  <TableCell align="centre">
                    <Link
                      to={`/editCategories/${category._id}`}
                      sx={{ textDecoration: "none" }}
                    >
                      <EditIcon sx={{ color: "#000000" }} />
                    </Link>
                    {/* <Link to={(e) => handleOpen(e, category._id)}> */}
                    <DeleteIcon
                      onClick={() => handleOpen(category._id)}
                      sx={{ color: "#FF0000", cursor: 'pointer' }}
                    />
                    {/* </Link> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Typography sx={{ p: 2 }}>Are you sure to delete</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <Button
              sx={{ m: 2 }}
              onClick={() => handleDelete()}
              variant="contained"
            >
              Yes
            </Button>
          </Grid>
          <Grid item xs={6} md={6}>
            <Button sx={{ m: 2 }} onClick={handleClose} variant="contained">
              No
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </Box>
  );
}

export default Categories;
