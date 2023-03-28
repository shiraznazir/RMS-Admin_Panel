import React from "react";
import { Typography, Box, Grid, Button } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(id, name, address, price, status) {
  return { id, name, address, price, status };
}

const rows = [
  createData(
    "#7552397",
    "Samantha Bake",
    "79 The Drive London",
    "$22.18",
    "New Order"
  ),
  createData(
    "#7552397",
    "Samantha Bake",
    "79 The Drive London",
    "$22.18",
    "New Order"
  ),
  createData(
    "#7552397",
    "Samantha Bake",
    "79 The Drive London",
    "$22.18",
    "New Order"
  ),
  createData(
    "#7552397",
    "Samantha Bake",
    "79 The Drive London",
    "$22.18",
    "New Order"
  ),
  createData(
    "#7552397",
    "Samantha Bake",
    "79 The Drive London",
    "$22.18",
    "New Order"
  ),
  createData(
    "#7552397",
    "Samantha Bake",
    "79 The Drive London",
    "$22.18",
    "New Order"
  ),
  createData(
    "#7552397",
    "Samantha Bake",
    "79 The Drive London",
    "$22.18",
    "New Order"
  ),
];

function Menu() {
  return (
      <Box
        pb={3}
        sx={{ bgcolor: "#f0f1f1", width: "100%", borderRadius: "10px" }}
      >
        <Grid m={2} container spacing={2}>
          <Grid item xs={9}>
            <Typography
              p="2"
              variant="h5"
              fontWeight="bold"
              sx={{ color: "#2E4CDC" }}
            >
              Orders
            </Typography>
            <Typography p="2" sx={{ color: "#93868C" }}>
              Here is your order list data
            </Typography>
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
                    Order ID
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", fontSize: "20px" }}
                    align="centre"
                  >
                    Customer Name
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", fontSize: "20px" }}
                    align="centre"
                  >
                    Location
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", fontSize: "20px" }}
                    align="centre"
                  >
                    Amount
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
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="centre">{row.name}</TableCell>
                    <TableCell align="centre">{row.address}</TableCell>
                    <TableCell align="centre">{row.price}</TableCell>
                    <TableCell align="centre">
                      <Button
                        variant="contained"
                        sx={{ color: "#FE7C69", bgcolor: "#FFEAE7" }}
                      >
                        {row.status}
                      </Button>
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
