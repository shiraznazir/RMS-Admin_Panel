import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import React from "react";

const Index = ({ title, icon, amount }) => {
  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Box
              sx={{
                bgcolor: "#F0F0F0",
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                ml: 2,
                mt: 2
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pt: 2,
                }}
              >
                {icon}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={9}>
            <CardContent>
              <Typography variant="h6" >{title}</Typography>
              <Typography variant="h4" fontWeight="bold">{amount}</Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default Index;
