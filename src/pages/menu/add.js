import React from "react";
import SubMenu from "../../Components/SubMenu/SubMenu";
import Breadcrumb from "../../Components/Breadcrumb/index";
import { useParams } from "react-router-dom";
import { Box, Typography, Divider, Grid } from '@mui/material';

const style = {
  mainContainer: {
    bgcolor: "#f0f0f0",
    mt: -2,
    p: 2,
    width: "100%",
    height: "100vh"
  },
  formContainer: {
    bgcolor: "#ffffff",
    ml: 2,
    mt: 2,
    p: 2,
    borderRadius: 2
  },
};

const Add = () => {

  const params = useParams();
  const title = params.id ? "Edit" : "Add";
  
  return (
    <>
      <SubMenu
        title={
          <Breadcrumb
            routeSegments={[
              { name: "Menu", path: "#" },
              { name: `${title} Menu`, path: "#" },
            ]}
          />
        }
      />
      <Box sx={style.mainContainer}>
        <Box sx={style.formContainer}>
            <Box>
                <Typography variant="h6" fontWeight="bold" sx={{color: "#1976D2"}} >Add Menu Items</Typography>
            </Box>
            <Divider fullWidth />
            <Grid>
                <Grid>

                </Grid>
            </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Add;
