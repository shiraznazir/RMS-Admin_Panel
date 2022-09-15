import React from "react";
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

function createData(id, name, price) {
  return { id, name, price };
}

const rows = [
  createData("#1221", "Paneer", "$240"),
  createData("#1222", "Butter Chicken", "$540"),
  createData("#1223", "Korma Chicken", "$450"),
  createData("#1224", "Moradabadi Biryani", "$300"),
  createData("#1225", "Hydrabadi Biryani", "$300"),
  createData("#1226", "Mutton Biryani", "$350"),
  createData("#1227", "Mutton Korma", "$600"),
];

function Menu() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            Menu Items
          </Typography>
          <Typography p="2" sx={{ color: "#93868C" }}>
            Here is your Menu Items list data
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Button variant="outlined">
            <ControlPointIcon sx={{ marginRight: "10px" }} />
            Add Menu Items
            <KeyboardArrowDownIcon />
          </Button>
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
                  Menu Items No
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "20px" }}
                  align="centre"
                >
                  Menu Items Name
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
                  Edit
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "20px" }}
                  align="centre"
                >
                  Remove
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
                  <TableCell align="centre">{row.price}</TableCell>
                  <TableCell align="centre">
                    <EditIcon fontSize="large" />
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
                        <Stack direction='row' spacing={5} m={2} >
                          <Button variant="contained">Yes</Button>
                          <Button variant="contained">No</Button>
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
