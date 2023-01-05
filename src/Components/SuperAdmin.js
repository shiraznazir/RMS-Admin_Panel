import React from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
  headerText: { fontWeight: "bold", ml: "100px", mt: 1 },
};

function SuperAdmin() {

  const navigate = useNavigate()

  const handleResturant = () => {
    navigate('/addAdmin')
  };

  return (
    <div>
      <Box sx={style.headerBox}>
        {/* <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ padding: 4, width: 100, height: 100 }}
      /> */}
      </Box>
      <Grid sx={{ mt: 2 }} container spacing={2}>
        <Grid item xs={6} md={8}>
          <Typography variant="h4" sx={style.headerText}>
            Super Admin
          </Typography>
        </Grid>
        <Grid align="right" sx={{ mr: 1 }} item xs={4} md={3}>
          <Button onClick={handleResturant} variant="outlined">
            Add Resturant
          </Button>
          {/* <Button
            onClick={(e) => handleSubmit(e)}
            sx={{ ml: 1, mr: 1 }}
            variant="outlined"
          >
            Save
          </Button> */}
        </Grid>
      </Grid>
    </div>
  );
}

export default SuperAdmin;
