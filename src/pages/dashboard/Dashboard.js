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
  Breadcrumbs,
} from "@mui/material";
import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
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

import {
  getOrders,
  getOrderByStatus,
  editOrder,
  getDeliveredOrders,
} from "../../api/api";
import groupArray from "group-array";
import { useSelector } from "react-redux";
import { selectUser } from "../../Components/store/reducer/userSlice";
import { Link } from "react-router-dom";

const tableHeader = { fontWeight: "bold", fontSize: "20px" };

const tableCell = { fontSize: "12px" };

function Row(props) {
  const { row, handleOrder, handleReject } = props;
  const [open, setOpen] = React.useState(false);
  let date = new Date(row[0].timeStamp);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell sx={tableCell}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={tableCell} align="left">
          {row[0].id}
        </TableCell>
        <TableCell sx={tableCell} align="left">
          {row[0].userId.name ? row[0].userId.name : row[0].userId.mobNo}
        </TableCell>
        <TableCell sx={tableCell} align="left">
          {row[0].status === 1
            ? "Pay At Resturant"
            : row[0].status === 2
            ? "Payment Successfull"
            : row[0].status === 3
            ? "Order Accepted"
            : row[0].status === 3
            ? "Order Accepted"
            : row[0].status === 4
            ? "In Kitchen"
            : "Ready to deliver"}
        </TableCell>
        <TableCell sx={tableCell} align="left">
          {date.toLocaleDateString()}
        </TableCell>
        <TableCell sx={tableCell} align="left">
          {date.toLocaleTimeString()}
        </TableCell>
        <TableCell sx={tableCell} align="left">
          {
            <Button
              variant="contained"
              onClick={() => handleOrder(row)}
              sx={{
                ...tableCell,
                bgcolor:
                  row[0].status === 1 || row[0].status === 2
                    ? "#009933"
                    : row[0].status === 3
                    ? "#FFA500"
                    : row[0].status === 4
                    ? "#0000FF"
                    : "#A52A2A",
                color: "#FFF",
                "&:hover": {
                  backgroundColor:
                    row[0].status === 1 || row[0].status === 2
                      ? "#77dd77"
                      : row[0].status === 3
                      ? "#FFD580"
                      : row[0].status === 4
                      ? "#ADD8E6"
                      : "#C4A484",
                  color: "#FFF",
                },
              }}
            >
              {row[0].status === 1 || row[0].status === 2
                ? "Accept"
                : row[0].status === 3
                ? "Add for Kitchen"
                : row[0].status === 4
                ? "Ready To Deliver"
                : "Delivered"}{" "}
              <CheckCircleOutlineIcon sx={{ ml: 1 }} />
            </Button>
          }
          <Button
            sx={{
              ...tableCell,
              ml: 1,
              bgcolor: "#FF0000",
              "&:hover": {
                backgroundColor: "#ff726f",
                color: "#FFF",
              },
            }}
            onClick={() => handleReject(row[0])}
            variant="contained"
          >
            Reject <CancelIcon sx={{ ml: 1 }} />
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                sx={{ ...tableCell, fontWeight: "bold" }}
                gutterBottom
                component="div"
              >
                Orders
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ ...tableCell, fontWeight: "bold" }}
                      align="left"
                    >
                      Order Name
                    </TableCell>
                    <TableCell
                      sx={{ ...tableCell, fontWeight: "bold" }}
                      align="left"
                    >
                      Menu Item Id
                    </TableCell>
                    <TableCell
                      sx={{ ...tableCell, fontWeight: "bold" }}
                      align="left"
                    >
                      Amount
                    </TableCell>
                    <TableCell
                      sx={{ ...tableCell, fontWeight: "bold" }}
                      align="left"
                    >
                      Portion
                    </TableCell>
                    <TableCell
                      sx={{ ...tableCell, fontWeight: "bold" }}
                      align="left"
                    >
                      Quantity
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.map((order) => (
                    <TableRow>
                      <TableCell sx={tableCell} align="left">
                        {order.productId.name}
                      </TableCell>
                      <TableCell sx={tableCell} align="left">
                        {order.productId.id}
                      </TableCell>
                      <TableCell sx={tableCell} align="left">
                        {order.totalProductPrice}
                      </TableCell>
                      <TableCell sx={tableCell} align="left">
                        {order.productFull
                          ? "Full"
                          : order.productHalf
                          ? "Half"
                          : order.productQuater
                          ? "Quater"
                          : "-"}
                      </TableCell>
                      <TableCell sx={tableCell} align="left">
                        {order.qty}
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
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [cardData, setCardData] = useState({
    deliveredOrder: 0,
    totalSales: 0,
    rejectOrder: 0,
  });
  const user = useSelector(selectUser);

  const fetchOrderByStatus = () => {
    getOrderByStatus(user.id).then((res) => {
      // console.log("get order by user ", res.data);
      let _responseData = res.data.data
      if (res.status) {
        let data = groupArray(_responseData, "id");
        // console.log("After Data ", data)
        setOrders(data);
      }
    });
  };

  const fetchDeliveredOrder = () => {
    let date = new Date();
    let previousDate = new Date(new Date().setDate(new Date().getDate() - 1));
    getDeliveredOrders({ id: user.id, startDate: previousDate, endDate: date })
      .then((res) => {
        if (res.data.status) {
          setCardData({
            deliveredOrder: res.data.deliveredOrders,
            totalSales: res.data.totalSales,
            rejectOrder: res.data.rejectOrder,
          });
        }
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  };

  const handleOrder = (orders) => {
    orders?.map((order) => {
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
    });
  };

  const handleReject = (order) => {
    let update = {
      ...order,
      status: -1,
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
    fetchDeliveredOrder();
    // addOrders();
  }, []);

  console.log("Data Order:-", orders);

  return (
    <div style={{ backgroundColor: "#f0f1f1", width: "100%" }}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
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
                        {Object.keys(orders).length}
                      </Typography>
                      <Typography>PENDING ORDERS</Typography>
                    </div>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
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
                        {cardData.deliveredOrder}
                      </Typography>
                      <Typography>TOTAL ORDER DELIVERED</Typography>
                    </div>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
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
                        {cardData.totalSales}
                      </Typography>
                      <Typography>TOTAL SALES</Typography>
                    </div>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          {/* Ordered Item details table */}
          {Object.keys(orders).length > 0 && (
            <Container>
              <TableContainer component={Paper} sx={{ ml: 2, width: "100%" }}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell align="left" sx={tableHeader}>
                        Order Id
                      </TableCell>
                      <TableCell align="left" sx={tableHeader}>
                        User Details
                      </TableCell>
                      <TableCell align="left" sx={tableHeader}>
                        Status
                      </TableCell>
                      <TableCell align="left" sx={tableHeader}>
                        Date
                      </TableCell>
                      <TableCell align="left" sx={tableHeader}>
                        Time
                      </TableCell>
                      <TableCell align="left" sx={tableHeader}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(orders).map((key) => (
                      <Row
                        key={key}
                        row={orders[key]}
                        handleOrder={handleOrder}
                        handleReject={handleReject}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          )}
        </Grid>
      </Container>
      <Container>
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
                        {Object.keys(orders).length}
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
                        {Object.keys(orders).length}
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
                        {cardData.deliveredOrder}
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
                        {cardData.rejectOrder}
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
