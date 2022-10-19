import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import { getCategories, deleteCategorie } from "../api/api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([]);
  const naviagate = useNavigate();

  useEffect(() => {
    getCategories()
      .then((val) => {
        setCategories(val.data);
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  }, []);

  const handleDelete = (e, id) => {
    e.preventDefault();
    deleteCategorie(id);
    naviagate("/categories");
  };

  console.log("000000000", categories);

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
          <Link to="/addcategories" sx={{ textDecoration: "none" }}>
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
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "20px" }}
                  align="centre"
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "20px" }}
                  align="centre"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories?.map((categorie) => (
                <TableRow key={categorie.id}>
                  <TableCell component="th" scope="row">
                    {categorie._id}
                  </TableCell>
                  <TableCell align="centre">{categorie.title}</TableCell>
                  <TableCell align="centre">{categorie.status}</TableCell>
                  <TableCell align="centre">
                    <Link
                      to={`/editCategories/${categorie._id}`}
                      sx={{ textDecoration: "none" }}
                    >
                      <EditIcon sx={{ color: "#000000" }} />
                    </Link>
                    <DeleteIcon
                      onClick={(e) => handleDelete(e, categorie._id)}
                      sx={{ color: "#FF0000" }}
                    />
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

export default Categories;
