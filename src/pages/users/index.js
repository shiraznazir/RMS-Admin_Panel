import React, { useEffect, useState } from "react";
import SubMenu from "../../Components/SubMenu/SubMenu";
import Breadcrumb from "../../Components/Breadcrumb/index";
import {
  TableContainer,
  TableBody,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Box,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getUsers } from "../../api/api";

const style = {
  tableHeadCell: {
    fontWeight: "bold",
  },
};

const Index = () => {
  const [usersData, setUsersData] = useState([]);

  const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: "name",
      headerName: "Customer's Name",
      width: 300,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 300,
    },
    {
      field: "mobNo",
      headerName: "Mobile No",
      width: 300,
    },
    {
      field: "email",
      headerName: "Email Address",
      width: 300,
    },
  ];

  useEffect(() => {
    getUsers()
      .then((res) => {
        if (res.data.success) {
          setUsersData(
            res.data.data.map((item) => {
              return { ...item, id: item._id };
            })
          );
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);
  console.log("Res ", usersData);
  return (
    <>
      <SubMenu
        title={<Breadcrumb routeSegments={[{ name: "Users", path: "#" }]} />}
      />
      {/* <Box sx={{ width: "100%", bgcolor: "#f0f0f0", p: 4, mt: -2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={style.tableHeadCell}>User's Name</TableCell>
                <TableCell sx={style.tableHeadCell}>Gender</TableCell>
                <TableCell sx={style.tableHeadCell}>Mobile Number</TableCell>
                <TableCell sx={style.tableHeadCell}>Email Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersData?.map((item) => {
                return (
                  <TableRow>
                    <TableCell>{item.name ? item.name : "-"}</TableCell>
                    <TableCell>{item.gender ? item.gender : "-"}</TableCell>
                    <TableCell>{item.mobNo}</TableCell>
                    <TableCell>{item.email ? item.email : "-"}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box> */}
      <Box></Box>
      <Box
        sx={{ height: 400, width: "100%", bgcolor: "#f0f0f0", p: 4, mt: -2 }}
      >
        <DataGrid
          sx={{ bgcolor: "#ffffff" }}
          rows={usersData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </>
  );
};

export default Index;
