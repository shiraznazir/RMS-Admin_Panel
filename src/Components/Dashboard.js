import React from "react";
import { Stack, Container, Grid, Divider } from "@mui/material";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardActionArea,
  CardActions,
} from "@mui/material";
import DashTable from "./DashTable";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function Dashboard() {
  return (
    <div>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4} >
            <Card sx={{ maxWidth: 345, margin: 2,fontSize: 12, height: 120, bgcolor: '#0066ff', color: '#fff' }}>
              <CardActionArea>
                <CardContent>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <PointOfSaleIcon />
                    <Typography variant="h5" component="div">
                      TotalSales
                    </Typography>
                  </Stack>
                  <Divider />
                  <Divider orientation="vertical" flexItem />
                  <Typography variant="h6" sx={{color: '#fff'}}>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <CurrencyRupeeIcon /> 1200000
                    </Stack>
                  </Typography>
                  <Typography variant="h6" sx={{color: '#fff'}}>
                    Total Order : 125
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ maxWidth: 345, margin: 2, fontSize: 12, height: 120, bgcolor: '#0066ff', color: '#fff' }}>
              <CardActionArea>
                <CardContent>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <ViewStreamIcon />
                    <Typography gutterBottom variant="h5" component="div">
                      New Order
                    </Typography>
                  </Stack>
                  <Divider />
                  <Typography variant="h6" color="text.secondary" sx={{color: '#fff'}} >
                    55
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ maxWidth: 345, margin: 2, height: 120, bgcolor: '#0066ff', color: '#fff' }}>
              <CardActionArea>
                <CardContent>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <HourglassBottomIcon />
                    <Typography gutterBottom variant="h5" component="div">
                      On-The-Way
                    </Typography>
                  </Stack>
                  <Divider />
                  <Typography variant="h6" sx={{color: '#fff'}} >
                    15
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ maxWidth: 345, margin: 2, height: 120,bgcolor: '#0066ff', color: '#fff' }}>
              <CardActionArea>
                <CardContent>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <HourglassBottomIcon />
                    <Typography gutterBottom variant="h5" component="div">
                      In-Process
                    </Typography>
                  </Stack>
                  <Divider />
                  <Typography variant="h6" sx={{color: '#fff'}} >
                    25
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ maxWidth: 345, margin: 2, height: 120, bgcolor: '#0066ff', color: '#fff' }}>
              <CardActionArea>
                <CardContent>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <HourglassBottomIcon />
                    <Typography gutterBottom variant="h5" component="div">
                      Completed-Order
                    </Typography>
                  </Stack>
                  <Divider />
                  <Typography variant="h6" sx={{color: '#fff'}}>
                    20
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <DashTable />
    </div>
  );
}

export default Dashboard;
