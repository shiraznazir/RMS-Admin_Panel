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
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { insertCategories, getCategory, editCategory } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../Components/store/reducer/userSlice";

const paperStyle = {
  padding: 5,
  margin: "5px auto",
};

function AddCategories() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [title, setTitle] = useState(null);
  const [category, setCategory] = useState(null);
  console.log("Id>>", id);

  useEffect(() => {
    if (id) {
      getCategory(id)
        .then((res) => {
          if (res.data.status) {
            setCategory(res.data.categories);
            setTitle(res.data.title.categories);
          }
        })
        .catch((err) => {
          console.log("Error ", err);
        });
    }
  }, []);

  const generateRandomNoID = () => {
    let randomNumber = Math.floor(100000 + Math.random() * 900000);
    randomNumber = String(randomNumber);
    randomNumber = randomNumber.substring(0, 4);
    return "cat_" + randomNumber;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let id = generateRandomNoID();
    insertCategories({
      id: id,
      resturantId: user.id,
      title: title,
    });
    navigate("/Category");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    editCategory(id, {
      title: title,
    });
    navigate("/Category");
  };
  const handleCancel = () => {
    navigate("/Category");
  };
  // console.log("Category " , category)
  return (
    <Box component="form">
      <Paper sx={paperStyle}>
        <Grid container spacing={2}>
          <Grid align="center" item xs={12} md={12}>
            <Typography
              variant="h4"
              fontWeight="bold"
              align="center"
              sx={{ color: "#3385ff" }}
            >
              {category ? "Edit Category" : "Add Category"}
            </Typography>
          </Grid>
          <Grid align="center" item xs={12} md={12}>
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
          <Grid align="center" item xs={12} md={12} sx={{ margin: "15px 0" }}>
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
          <Grid align="center" item md={12} sx={{ margin: "10px 0" }}>
            <Button
              variant="contained"
              align="center"
              sx={{ margin: "8px 10px" }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            {category ? (
              <Button
                variant="contained"
                align="center"
                sx={{ margin: "8px 0" }}
                onClick={(e) => handleEdit(e)}
              >
                Save Changes
              </Button>
            ) : (
              <Button
                variant="contained"
                align="center"
                sx={{ margin: "8px 0" }}
                onClick={(e) => handleSubmit(e)}
              >
                Save
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default AddCategories;
