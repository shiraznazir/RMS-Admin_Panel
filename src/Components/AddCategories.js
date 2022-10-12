import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Grid,
  Button,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { insertCategories } from "../api/api";

function Categories() {
  const [title, setTitle] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    insertCategories({
      title: title
    });
  };


  return (
    <Box component="form">
      <Grid>
        <Typography
          variant="h4"
          fontWeight="bold"
          align="left"
          sx={{ color: "#3385ff" }}
        >
          Add Categories
        </Typography>
        <Grid>
          <FormControl sx={{ mb: 2, mt: 2, width: "30%" }}>
            <InputLabel htmlFor="outlined-adornment-amount">Title</InputLabel>
            <OutlinedInput
              type="text"
              id="outlined-adornment-amount"
              label="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </FormControl>
        </Grid>
        <Grid>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/*" type="file" />
            <AddPhotoAlternateIcon fontSize="large" />
            Upload a Image
          </IconButton>
        </Grid>
        <Grid>
          <Button variant="contained" onClick={(e) => handleSubmit(e)}>
            Add Categories
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Categories;
