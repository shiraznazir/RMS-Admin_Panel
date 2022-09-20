import React from "react";
import {
  Grid,
  Paper,
  Stack,
  Typography,
  OutlinedInput,
  FormControl,
  InputLabel,
  IconButton,
  Button,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const paperStyle = {
  padding: 40,
  height: "60vh",
  width: 500,
  margin: "20px auto",
};

function Form() {
  return (
    <Grid>
      {/* <Paper style={paperStyle}> */}
      <Typography variant="h4" fontWeight='bold' align="left" sx={{color: '#3385ff'}}>
        Add Menu Items
      </Typography>
      <Stack container direction='column' >
        <FormControl sx={{ mb: 2, mt: 2, width: '30%' }}>
          <InputLabel htmlFor="outlined-adornment-amount">Name</InputLabel>
          <OutlinedInput id="outlined-adornment-amount" label="Name" />
        </FormControl>
        <FormControl sx={{ mb: 2, width: '30%' }}>
          <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
          <OutlinedInput id="outlined-adornment-amount" label="Price" />
        </FormControl>
      </Stack>
      <Grid>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input hidden accept="image/*" type="file" />
          <AddPhotoAlternateIcon fontSize="large" />
        </IconButton>
        <Button>Upload a Image</Button>
      </Grid>
      <Grid>
        <Button variant="contained" align="center" sx={{ margin: "8px 0" }}>
          Add to Menu
        </Button>
      </Grid>
      {/* </Paper> */}
    </Grid>
  );
}

export default Form;
