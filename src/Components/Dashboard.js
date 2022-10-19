import React from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Button,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import InventoryIcon from "@mui/icons-material/Inventory";
import GroupIcon from "@mui/icons-material/Group";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function Dashboard2() {
  return (
    <div style={{ backgroundColor: "#f0f1f1", margin: 0, padding: 0 }}>
      <Typography
        variant="h4"
        component="div"
        sx={{ textAlign: "left", color: "#3385ff", fontWeight: "bold", m: 2 }}
      >
        Dashboard
      </Typography>
      <Typography variant="h6" sx={{ m: 2 }}>
        Welcome to RMS Admin Panel!
      </Typography>
      <Container sx={{ width: "100%" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Card
              sx={{
                margin: 2,
                fontSize: 12,
                height: 130,
                bgcolor: "#fff",
              }}
            >
              <CardActionArea>
                <CardContent>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        bgcolor: "#f0f1f1",
                        m: 1,
                        width: "5rem",
                        height: "5rem",
                        borderRadius: "50%",
                      }}
                    >
                      <RestaurantMenuIcon fontSize="large" sx={{ m: 2.5 }} />
                    </Box>
                    <div>
                      <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
                        56
                      </Typography>
                      <Typography>TOTAL MENUS</Typography>
                    </div>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card
              sx={{
                margin: 2,
                fontSize: 12,
                height: 130,
                bgcolor: "#fff",
              }}
            >
              <CardActionArea>
                <CardContent>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        bgcolor: "#f0f1f1",
                        m: 1,
                        width: "5rem",
                        height: "5rem",
                        borderRadius: "50%",
                      }}
                    >
                      <CurrencyRupeeIcon fontSize="large" sx={{ m: 2.5 }} />
                    </Box>
                    <div>
                      <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
                        12k
                      </Typography>
                      <Typography>TOTAL REVENUE</Typography>
                    </div>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card
              sx={{
                margin: 2,
                fontSize: 12,
                height: 130,
                bgcolor: "#fff",
              }}
            >
              <CardActionArea>
                <CardContent>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        bgcolor: "#f0f1f1",
                        m: 1,
                        width: "5rem",
                        height: "5rem",
                        borderRadius: "50%",
                      }}
                    >
                      <InventoryIcon fontSize="large" sx={{ m: 2.5 }} />
                    </Box>
                    <div>
                      <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
                        25
                      </Typography>
                      <Typography>TOTAL ORDER</Typography>
                    </div>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card
              sx={{
                maxWidth: 345,
                margin: 2,
                fontSize: 12,
                height: 130,
                bgcolor: "#fff",
              }}
            >
              <CardActionArea>
                <CardContent>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        bgcolor: "#f0f1f1",
                        m: 1,
                        width: "5rem",
                        height: "5rem",
                        borderRadius: "50%",
                      }}
                    >
                      <GroupIcon fontSize="large" sx={{ m: 2.5 }} />
                    </Box>
                    <div>
                      <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
                        25
                      </Typography>
                      <Typography>TOTAL ORDER</Typography>
                    </div>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card
              sx={{
                maxWidth: 345,
                margin: 2,
                fontSize: 12,
                height: 130,
                bgcolor: "#fff",
              }}
            >
              <CardActionArea>
                <CardContent>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        bgcolor: "#f0f1f1",
                        m: 1,
                        width: "5rem",
                        height: "5rem",
                        borderRadius: "50%",
                      }}
                    >
                      <InventoryIcon fontSize="large" sx={{ m: 2.5 }} />
                    </Box>
                    <div>
                      <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
                        25
                      </Typography>
                      <Typography>TOTAL ORDER</Typography>
                    </div>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card
              sx={{
                maxWidth: 345,
                margin: 2,
                fontSize: 12,
                height: 130,
                bgcolor: "#fff",
              }}
            >
              <CardActionArea>
                <CardContent>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        bgcolor: "#f0f1f1",
                        m: 1,
                        width: "5rem",
                        height: "5rem",
                        borderRadius: "50%",
                      }}
                    >
                      <InventoryIcon fontSize="large" sx={{ m: 2.5 }} />
                    </Box>
                    <div>
                      <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
                        25
                      </Typography>
                      <Typography>TOTAL ORDER</Typography>
                    </div>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                width: "100%",
                margin: 2,
                fontSize: 12,
                height: 500,
                bgcolor: "#fff",
              }}
            >
              <Typography
                variant="h4"
                component="div"
                sx={{ textAlign: "left", fontWeight: "bold", m: 2 }}
              >
                Orders Summary
              </Typography>
              <Typography variant="body1" sx={{ m: 2 }}>
                Lorem ipsum dolor sit amet, consecteturs
              </Typography>
              <Box component="span" sx={{ m: 2, p: 2, bgcolor: "#f4f6fC" }}>
                <Button>Monthly</Button>
                <Button>Weekly</Button>
                <Button>Today</Button>
              </Box>

              <CardActionArea>
                <CardContent>
                  <Box
                    sx={{
                      width: "100%",
                      height: "75px",
                      paddingTop: "1px",
                      bgcolor: "#E6FAEC",
                      borderRadius: 5,
                    }}
                  >
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Box
                        m={2}
                        p={1.5}
                        sx={{
                          width: "10%",
                          bgcolor: "#2BC055",
                          color: "#fff",
                          borderRadius: 2,
                          fontWeight: "bold",
                          fontSize: 20,
                        }}
                      >
                        25
                      </Box>
                      <Typography sx={{ fontWeight: "bold" }}>
                        New Orders
                      </Typography>
                      <Typography
                         align='right'
                         sx={{ fontWeight: "bold",marginLeft:23 }}
                      >
                        Manage Orders
                      </Typography>
                      <KeyboardArrowRightIcon />
                    </Stack>
                  </Box>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Box
                      m={2}
                      sx={{
                        width: "30%",
                        height: "100px",
                        border: "1px solid grey",
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        marginLeft={2}
                        marginTop={2}
                        sx={{ fontSize: 24, fontWeight: "bold" }}
                      >
                        25
                      </Typography>
                      <Typography marginLeft={2} sx={{ color: "#8D8C8C" }}>
                        On Delivery
                      </Typography>
                    </Box>
                    <Box
                      m={2}
                      sx={{
                        width: "30%",
                        height: "100px",
                        border: "1px solid grey",
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        marginLeft={2}
                        marginTop={2}
                        sx={{ fontSize: 24, fontWeight: "bold" }}
                      >
                        60
                      </Typography>
                      <Typography marginLeft={2} sx={{ color: "#8D8C8C" }}>
                        Delivered
                      </Typography>
                    </Box>
                    <Box
                      m={2}
                      sx={{
                        width: "30%",
                        height: "100px",
                        border: "1px solid grey",
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        marginLeft={2}
                        marginTop={2}
                        sx={{ fontSize: 24, fontWeight: "bold" }}
                      >
                        5
                      </Typography>
                      <Typography marginLeft={2} sx={{ color: "#8D8C8C" }}>
                        Canceled
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                width: "100%",
                margin: 2,
                fontSize: 12,
                height: 500,
                bgcolor: "#fff",
              }}
            >
              <Typography
                variant="h4"
                component="div"
                alignItems="right"
                sx={{ fontWeight: "bold", m: 2 }}
              >
                Revenue
              </Typography>
              <Typography variant="body1" sx={{ m: 2 }}>
                Lorem ipsum dolor sit amet, consecteturs
              </Typography>
              <CardActionArea>
                <CardContent></CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Dashboard2;
