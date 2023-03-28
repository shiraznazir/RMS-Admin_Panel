import React from "react";
import SubMenu from "../../Components/SubMenu/SubMenu";
import Breadcrumb from "../../Components/Breadcrumb/index";
import Cards from "../../Components/Cards/index";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Box, Grid, Container } from "@mui/material";

const SuperDashboard = () => {
  return (
    <>
      <SubMenu
        title={
          <Breadcrumb routeSegments={[{ name: "Dashboard", path: "#" }]} />
        }
      />
      <Box sx={{ bgcolor: "#F0F0F0", width: "100%", pl: 2, pb: 2, pr: 2 }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Cards title="Total Resturant" icon={<RestaurantIcon fontSize="large" />} amount={25} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Cards title="Active Resturant" icon={<RestaurantIcon fontSize="large" />} amount={12} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Cards title="Not Active Resturant" icon={<RestaurantIcon fontSize="large" />} amount={13} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default SuperDashboard;
