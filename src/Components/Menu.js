import React from "react";
import { Typography, Box, Grid, Stack, Button } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Menu() {
  return (
    <div style={{ backgroundColor: "#f0f1f1", width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Stack>
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
          </Stack>
        </Grid>
        <Grid item xs={2}>
          <Button variant="outlined">
            <ControlPointIcon sx={{ marginRight: "10px" }} />
            Add Menu
            <KeyboardArrowDownIcon />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Menu;
