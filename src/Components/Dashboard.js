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
import PropTypes from 'prop-types';
  import Collapse from '@mui/material/Collapse';
  import IconButton from '@mui/material/IconButton';
  import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
  import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
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
import { getOrders, getOrderByStatus, editOrder } from "../api/api";
const tableHeader = { fontWeight: "bold", fontSize: "20px" };

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  // console.log("Checknvhjbjbf", props);
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};


const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

function Dashboard() {
  
  const [orders, setOrders] = useState([]);
  const [item, setItem] = useState([]);

  // const fetchOrders = () => {
  //   getOrders()
  //     .then((res) => {
  //       // console.log(res.data);
  //       setOrders(res.data);
  //     })
  //     .catch((err) => {
  //       console.log("Error ", err);
  //     });
  // };

  const fetchOrderByStatus = () => {
    getOrderByStatus().then((res) => {
      console.log("XChwhjnh>>>>>>>>", res.data);
      setOrders(res.data);
    });
  };

  const addOrders = () => {
    orders?.map((element)=>{
      console.log("ADD Order>>>>>", element);
    })
  }

  const handleOrder = (order) => {
    console.log("Check>>>>>>", order);

    if (order.status === 1) {
      order.status = order.status + 1;
    }
    let update = {
      ...order,
      status: order.status + 1,
    };
    editOrder(order._id, update).then((res) => {
      if (res.data.status) {
        fetchOrderByStatus();
      }
    });
  };

  const handleReject = (order) => {
    let update = {
      ...order,
      status: 10,
    };
    editOrder(order._id, update).then((res) => {
      if (res.data.status) {
        fetchOrderByStatus();
      }
    });
  };

  useEffect(() => {
    // fetchOrders();
    fetchOrderByStatus();
    addOrders();
  }, []);

  console.log("Orders:-", orders);

  return (
    <div style={{ backgroundColor: "#f0f1f1", width: "100%" }}>
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
      {/* <Container> */}
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
          <TableContainer sx={{ ml: 5, width: "94vw", mb: 4 }} component={Paper}>
            <Table sx={{ borderRadius: "100px" }} aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell sx={tableHeader}>Order Id</TableCell>
                  <TableCell sx={tableHeader} align="left">
                    Order Name
                  </TableCell>
                  <TableCell sx={tableHeader} align="left">
                    Portion
                  </TableCell>
                  <TableCell sx={tableHeader} align="left">
                    User Details{" "}
                  </TableCell>
                  <TableCell sx={tableHeader} align="center">
                    Quantity
                  </TableCell>
                  <TableCell sx={tableHeader} align="left">
                    Status
                  </TableCell>
                  <TableCell sx={tableHeader} align="left">
                    Time
                  </TableCell>
                  <TableCell sx={tableHeader} align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((order) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {order.id}
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
                    <TableCell align="left">{order.userId.mobNo}</TableCell>
                    <TableCell align="center">{order.qty}</TableCell>
                    <TableCell align="left">
                      {order.status === 1
                        ? "Pay At Resturant"
                        : order.status === 2
                        ? "Payment Successfull"
                        : order.status === 3
                        ? "Order Accepted"
                        : order.status === 3
                        ? "Order Accepted"
                        : order.status === 4
                        ? "In Kitchen"
                        : "Ready to deliver"
                        }
                    </TableCell>
                    <TableCell align="left">{order.timeStamp}</TableCell>
                    <TableCell align="center">
                      {
                        <Button
                          variant="contained"
                          onClick={() => handleOrder(order)}
                          sx={{
                            bgcolor:
                              order.status === 1 || order.status === 2
                                ? "#009933"
                                : order.status === 3
                                ? "#FFA500"
                                : order.status === 4
                                ? "#0000FF"
                                : "#A52A2A",
                            color: "#FFF",
                            "&:hover": {
                              backgroundColor:
                                order.status === 1 || order.status === 2
                                  ? "#77dd77"
                                  : order.status === 3
                                  ? "#FFD580"
                                  : order.status === 4
                                  ? "#ADD8E6"
                                  : "#C4A484",
                              color: "#FFF",
                            },
                          }}
                        >
                          {order.status === 1 || order.status === 2
                            ? "Accept"
                            : order.status === 3
                            ? "Add for Kitchen"
                            : order.status === 4
                            ? "Ready To Deliver"
                            : "Delivered"}{" "}
                          <CheckCircleOutlineIcon sx={{ ml: 1 }} />
                        </Button>
                      }
                      <Button
                        sx={{
                          ml: 1,
                          bgcolor: "#FF0000",
                          "&:hover": {
                            backgroundColor: "#ff726f",
                            color: "#FFF",
                          },
                        }}
                        onClick={()=>handleReject(order)}
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
          <TableContainer component={Paper} sx={{ ml: 5, width: "94vw"}}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align="left" sx={tableHeader} >Order Id</TableCell>
                  <TableCell align="left" sx={tableHeader} >User Details</TableCell>
                  <TableCell align="left" sx={tableHeader} >Status</TableCell>
                  <TableCell align="left" sx={tableHeader} >Time</TableCell>
                  <TableCell align="left" sx={tableHeader} >Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <Row key={row.name} row={row} />
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
      {/* </Container> */}
    </div>
  );
}

export default Dashboard;
