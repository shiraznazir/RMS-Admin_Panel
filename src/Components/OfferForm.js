import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Grid,
  Button,
  Paper,
  Select,
  MenuItem
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { insertCategories, getCategorie, editCategorie } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

const paperStyle = {
  padding: 5,
  margin: "5px auto"
}

const categories = [
    "No. of orders",
    "Limited no of orders",
    "New User",
    "All Users",
    "Minimum Order Amount"
]

function OfferForm() {
  const { id } = useParams();
  const naviagate = useNavigate();
  const [title, setTitle] = useState();
  const [categorie, setCategorie] = useState();

//   useEffect(() => {
//     getCategorie(id)
//       .then((val) => {
//         setCategorie(val.data);
//         setTitle(val.data.title);
//       })
//       .catch((err) => {
//         console.log("Error ", err);
//       });
//   }, []);

//   const generateRandomNoID = () => {
//     let randomNumber = Math.floor(100000 + Math.random() * 900000);
//     randomNumber = String(randomNumber);
//     randomNumber = randomNumber.substring(0, 4);
//     return "cat_" + randomNumber;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let id = generateRandomNoID();
//     // console.log("Check Category id>>>", id);
//     insertCategories({
//       id: id,
//       title: title,
//     });
//     naviagate("/categories");
//   };

//   const handleEdit = (e) =>{
//     e.preventDefault()
//     editCategorie(id, {
//       title: title,
//     })
//     naviagate("/categories");
//   }

  return (
    <Box component="form">
     <Paper sx={paperStyle}>
     <Grid container spacing={2}>
        <Grid align='center' item xs={12} md={12}>
        {categorie ? (
          <Typography
            variant="h4"
            fontWeight="bold"
            align="center"
            sx={{ color: "#3385ff" }}
          >
            Edit Offers
          </Typography>
        ) : (
          <Typography
            variant="h4"
            fontWeight="bold"
            align="center"
            sx={{ color: "#3385ff" }}
          >
            Add Offers
          </Typography>
        )}
        </Grid>
        {/* offers Title */}
        <Grid align='center' item xs={12} md={12}>
          <FormControl sx={{ mb: 2, mt: 2, width: "50%" }}>
            <InputLabel htmlFor="outlined-adornment-amount">Title</InputLabel>
            <OutlinedInput
              type="text"
              id="outlined-adornment-amount"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              label="Title"
            />
          </FormControl>
        </Grid>
        {/* Select n of orders */}
        <Grid align='center' item xs={12} md={12}>
        <FormControl sx={{ mb: 2, mt: 2, width: "50%" }}>
                <InputLabel id="demo-simple-select-label">
                  Categories
                </InputLabel>
                <Select
                //   value={selectCategories}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Categories"
                //   onChange={(e) => handleSelect(e)}
                >
                  {categories?.map((item) => {
                    return <MenuItem value={item}>{item}</MenuItem>;
                  })}
                </Select>
              </FormControl>
        </Grid>
        {/* <Grid align='center' item xs={12} md={12} sx={{margin: "15px 0"}}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/*" type="file" />
            <AddPhotoAlternateIcon fontSize="large" />
            Upload a Image
          </IconButton>
        </Grid> */}
        <Grid align='center' item md={12} sx={{margin: "10px 0"}}>
          <Button variant="contained" align='center' sx={{ margin: "8px 10px" }}>Cancel</Button>
          {categorie ? (
            <Button variant="contained" align='center' sx={{ margin: "8px 0" }} onClick={(e) => handleEdit(e)}>
              Save Changes
            </Button>
          ) : (
            <Button variant="contained" align='center' sx={{ margin: "8px 0" }} onClick={(e) => handleSubmit(e)}>
              Save
            </Button>
          )}
        </Grid>
      </Grid>
     </Paper>
    </Box>
  );
}

export default OfferForm;
