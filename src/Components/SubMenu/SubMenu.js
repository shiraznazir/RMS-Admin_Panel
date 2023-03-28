import React from "react";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Tooltip from "@mui/material/Tooltip";

function Index(props) {
  let navigate = useNavigate();
  return (
    <>
      <Box
        component="div"
        sx={{
          py: 2,
          px: 3,
          m: -1,
          mb: 2,
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          background: "#f8f9fa",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Tooltip title="Back">
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIcon fontSize="medium" sx={{ cursor: "pointer" }} />
            </IconButton>
          </Tooltip>
          {props.title}
        </div>
        <div>{props.action}</div>
      </Box>
    </>
  );
}

export default Index;
