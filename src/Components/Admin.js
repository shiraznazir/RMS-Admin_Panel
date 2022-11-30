import React from "react";
import { Box, Card, Paper, Avatar, Grid } from "@mui/material";

function Admin() {
  return (
    <Box sx={{ bgcolor: "#F6F8FE", p: 2, m: 0 }}>
      <h4>Welcome Back, Admin Bhai</h4>
      <Card elevation={2} sx={{ p: 2, width: "50%" }}>
        <Grid container spacing={1}>
          <Grid item sx={2} md={2}>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </Grid>
          <Grid item sx={4} md={4}>
            <h4 sx={{ color: "#808080" }}>Hello</h4>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

export default Admin;
