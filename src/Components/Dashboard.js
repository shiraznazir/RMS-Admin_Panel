import React, { useEffect, useState } from "react";
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
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import { getOrders } from "../api/api";

const tableHeader = { fontWeight: "bold", fontSize: "20px" };

function Dashboard() {
  let count = 1;
  const [orders, setOrders] = useState();

  const fetchOrders = () => {
    getOrders()
      .then((res) => {
        // console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log("Orders:-", orders);

  return (
    <div style={{ backgroundColor: "#f0f1f1" }}>
      {/* <Typography
        variant="h4"
        component="div"
        sx={{ textAlign: "left", color: "#3385ff", fontWeight: "bold", m: 2 }}
      >
        Dashboard
      </Typography>
      <Typography variant="h6" sx={{ m: 2 }}>
        Welcome to RMS Admin Panel!
      </Typography> */}
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
                      <Typography>PENDING ORDERS</Typography>
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
                      <RestaurantMenuIcon fontSize="large" sx={{ m: 2.5 }} />
                    </Box>
                    <div>
                      <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
                        12
                      </Typography>
                      <Typography>TOTAL ORDER DELIVERED</Typography>
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
                      <AccountBalanceWalletIcon
                        fontSize="large"
                        sx={{ m: 2.5 }}
                      />
                    </Box>
                    <div>
                      <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
                        25
                      </Typography>
                      <Typography>TOTAL SALES</Typography>
                    </div>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          {/* Ordered Item details table */}
          <Grid>
            <TableContainer sx={{ ml: 5 }} component={Paper}>
              <Table
                sx={{ minWidth: 650, borderRadius: "100px" }}
                aria-label="caption table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={tableHeader}>Order Id</TableCell>
                    <TableCell sx={tableHeader} align="right">
                      Order Name
                    </TableCell>
                    <TableCell sx={tableHeader} align="right">
                      Portion
                    </TableCell>
                    <TableCell sx={tableHeader} align="right">
                      User Details{" "}
                    </TableCell>
                    <TableCell sx={tableHeader} align="right">
                      Payment
                    </TableCell>
                    <TableCell sx={tableHeader} align="right">
                      Time
                    </TableCell>
                    <TableCell sx={tableHeader} align="center">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {orders?.map((order)=>{
                    console.log("Order??????>>>>>>>>", order);
                  })} */}
                  {orders?.map((order) => (
                    <TableRow
                      key={count}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {count++}
                      </TableCell>
                      <TableCell align="left">{order.productId.name}</TableCell>
                      <TableCell align="left">
                        {order.productFull
                          ? "Full"
                          : order.productHalf
                          ? "Half"
                          : order.productQuater
                          ? "Quater"
                          : "-"}
                      </TableCell>
                      <TableCell align="right">{order.userId.mobNo}</TableCell>
                      <TableCell align="right">Payment</TableCell>
                      <TableCell align="right">12:00</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: "#009933",
                            color: "#FFF",
                            "&:hover": {
                              backgroundColor: "#77dd77",
                              color: "#FFF",
                            },
                          }}
                        >
                          Accept <CheckCircleOutlineIcon sx={{ ml: 1 }} />
                        </Button>
                        <Button
                          sx={{ ml: 1, bgcolor: "#FF0000", "&:hover": {
                            backgroundColor: "#ff726f",
                            color: "#FFF",
                          }, }}
                          variant="contained"
                        >
                          Reject <CancelIcon sx={{ ml: 1 }} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          {/* <Grid item xs={12} md={6} lg={4}>
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
          </Grid> */}
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
                        align="right"
                        sx={{ fontWeight: "bold", marginLeft: 23 }}
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

export default Dashboard;
