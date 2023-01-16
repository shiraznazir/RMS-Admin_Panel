import React, { useEffect, useState, useRef } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useSelector } from "react-redux";
import { selectUser } from "./store/reducer/userSlice";
import { getDeliveredOrders, getOrdersHistory } from "../api/api";
import { useDownloadExcel } from "react-export-table-to-excel";
import groupArray from "group-array";
import {
  TextField,
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

const style = {
  header: {
    m: 2,
  },
  datePicker: {
    ml: 2,
  },
  tableHeader: {
    fontWeight: "bold",
    fontSize: "20px",
  },
  table: {
    ml: 2,
    width: "97%",
    mb: 1,
  },
};

function Sales() {
  let date = new Date();
  let previousDate = new Date(new Date().setDate(new Date().getDate() - 1));
  const user = useSelector(selectUser);
  const [startDate, setStartDate] = useState(previousDate);
  const [endDate, setEndDate] = useState(date);
  const [orderList, setOrderList] = useState([]);
  const [cardData, setCardData] = useState({
    deliveredOrder: 0,
    totalSales: 0,
    rejectOrder: 0,
  });
  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Orders table",
    sheet: "Orders",
  });

  const fetchDeliveredOrder = () => {
    getDeliveredOrders({
      id: user.id,
      startDate: startDate,
      endDate: endDate,
      list: true,
    })
      .then((res) => {
        if (res.data.status) {
          setCardData({
            deliveredOrder: res.data.deliveredOrders,
            totalSales: res.data.totalSales,
            rejectOrder: res.data.rejectOrder,
          });
          setOrderList(res.data.list);
        }
        console.log("res ", res.data);
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  };

  const handleStartDate = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDate = (newValue) => {
    setEndDate(newValue);
  };

  const handleDate = () => {
    fetchDeliveredOrder();
  };

  const handleReset = () => {
    fetchDeliveredOrder();
    setStartDate(previousDate);
    setEndDate(date);
  };

  useEffect(() => {
    fetchDeliveredOrder();
  }, []);

  return (
    <>
      <Box sx={style.header}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Start Date"
            inputFormat="MM/DD/YYYY"
            value={startDate}
            onChange={handleStartDate}
            renderInput={(params) => <TextField {...params} />}
          />
          <DesktopDatePicker
            label="End Date"
            inputFormat="MM/DD/YYYY"
            value={endDate}
            onChange={handleEndDate}
            sx={style.datePicker}
            renderInput={(params) => <TextField {...params} />}
          />
          <Button variant="contained" onClick={handleDate} sx={{ m: 1 }}>
            Find
          </Button>
          <Button variant="contained" onClick={handleReset} sx={{ m: 1 }}>
            Reset
          </Button>
          <Button variant="contained" onClick={onDownload}> Export excel </Button>
        </LocalizationProvider>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
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
        <Grid item xs={12} md={6} lg={6}>
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
      </Grid>
      <Grid sx={style.table}>
        <TableContainer component={Paper}>
          <Table ref={tableRef} aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={style.tableHeader}>
                  Order Id
                </TableCell>
                <TableCell align="left" sx={style.tableHeader}>
                  User Details
                </TableCell>
                <TableCell align="left" sx={style.tableHeader}>
                  Amount
                </TableCell>
                <TableCell align="left" sx={style.tableHeader}>
                  Date
                </TableCell>
                <TableCell align="left" sx={style.tableHeader}>
                  Time
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(orderList).map((key) => {
                let date = new Date(orderList[key][0].timeStamp);
                let sale = 0;
                orderList[key].map((order) => {
                  sale += order.totalProductPrice;
                });

                return (
                  <TableRow>
                    <TableCell align="centre">{key}</TableCell>
                    <TableCell align="centre">
                      {orderList[key][0].userId.name
                        ? orderList[key][0].userId.name
                        : orderList[key][0].userId.mobNo}
                    </TableCell>
                    <TableCell align="centre">{sale}</TableCell>
                    <TableCell align="centre">
                      {date.toLocaleDateString()}
                    </TableCell>
                    <TableCell align="centre">
                      {date.toLocaleTimeString()}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
}

export default Sales;
