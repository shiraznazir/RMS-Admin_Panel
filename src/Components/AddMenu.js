import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Box,
  Stack,
  Typography,
  OutlinedInput,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  insertMenuItem,
  getCategories,
  getMenuItems,
  getMenuItemsById,
} from "../api/api";
import { useParams } from "react-router-dom";

const paperStyle = {
  padding: 40,
  height: "60vh",
  width: 500,
  margin: "20px auto",
};

function AddMenu() {
  const { id } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [name, setName] = useState("");
  const [selectCategories, setSelectCategories] = useState("");
  const [portion, setPortion] = useState(false);
  const [price, setPrice] = useState(0);
  const [portionActives, setPortionActives] = React.useState({
    full: true,
    half: true,
    quater: true,
  });
  const [menuItem, setMenuItem] = useState("");
  const [fullPrice, setFullPrice] = useState(0);
  const [halfPrice, setHalfPrice] = useState(0);
  const [quaterPrice, setQuaterPrice] = useState(0);
  const [isVeg, setIsVeg] = useState(false);
  const [fileName, setFileName] = useState("");

  const [categories, setCategories] = React.useState([]);

  const addMenuItem = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("categorie", selectCategories);
    formData.append("portion", portion);
    formData.append("price", price);
    formData.append("fullPrice", fullPrice);
    formData.append("halfPrice", halfPrice);
    formData.append("quaterPrice", quaterPrice);
    formData.append("isVeg", isVeg);
    formData.append("menuImage", fileName);

    insertMenuItem(formData);
  };

  const editItem = (e) =>{
    e.preventDefault()
    
  }

  const fetchMenuItem = () => {
    getMenuItems()
      .then((val) => {
        setMenuItems(val.data);
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  };

  const fetchCategories = () => {
    getCategories()
      .then((val) => {
        setCategories(val.data);
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  };

  const fetchMenuItemsById = () => {
    getMenuItemsById(id)
      .then((val) => {
        console.log("getMenuItemsById : ", val.data);
        setMenuItem(val.data);
        setName(val.data.name);
        setSelectCategories(val.data.categorie);
        setPortion(val.data.portion);
        setFullPrice(val.data.fullPrice);
        setHalfPrice(val.data.halfPrice);
        setQuaterPrice(val.data.quaterPrice);
        setIsVeg(val.data.isVeg);
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  };

  useEffect(() => {
    fetchMenuItem();
    fetchCategories();
    fetchMenuItemsById();
  }, []);

  const handleSelect = (e) => {
    // console.log("Select: ", e.target.value);
    setSelectCategories(e.target.value);
  };

  const handleImage = (e) => {
    setFileName(e.target.files[0]);
  };
  console.log("Menu Item Categories ", selectCategories);

  return (
    <Box component="form">
      <Grid>
        {/* <Paper style={paperStyle}> */}
        {menuItem ? (
          <Typography
            variant="h4"
            fontWeight="bold"
            align="left"
            sx={{ color: "#3385ff" }}
          >
            Edit Menu Items
          </Typography>
        ) : (
          <Typography
            variant="h4"
            fontWeight="bold"
            align="left"
            sx={{ color: "#3385ff" }}
          >
            Add Menu Items
          </Typography>
        )}
        <Stack container direction="column">
          <FormControl sx={{ mb: 2, mt: 2, width: "30%" }}>
            <InputLabel htmlFor="outlined-adornment-amount">Name</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name"
            />
          </FormControl>
          {/* Select Categories */}
          <FormControl>
            <InputLabel id="demo-simple-select-label">Categories</InputLabel>
            <Select
              value={selectCategories}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Categories"
              onChange={(e) => handleSelect(e)}
              sx={{ width: "30%" }}
            >
              {categories?.map((item) => {
                return <MenuItem value={item.title}>{item.title}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              sx={{ color: "#3385ff", fontWeight: "bold" }}
            >
              Portions
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              defaultValue={portion}
            >
              <FormControlLabel
                value="Yes"
                onClick={() => setPortion(true)}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                value="No"
                onClick={() => setPortion(false)}
                control={<Radio />}
                label="No"
                defaultChecked
              />
            </RadioGroup>
          </FormControl>
          {/* portion option for full , half and quater */}
          {portion && (
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <Grid container spacing={0}>
                  <Grid item md={1}>
                    <FormControlLabel
                      value={portionActives.full}
                      onClick={() =>
                        setPortionActives({
                          ...portionActives,
                          full: !portionActives.full,
                        })
                      }
                      control={<Checkbox />}
                      label="Full"
                    />
                  </Grid>
                  <Grid item md={1}>
                    <FormControlLabel
                      value={!portionActives.half}
                      onClick={() =>
                        setPortionActives({
                          ...portionActives,
                          half: !portionActives.half,
                        })
                      }
                      control={<Checkbox />}
                      label="Half"
                    />
                  </Grid>
                  <Grid item md={1}>
                    <FormControlLabel
                      value={portionActives.quater}
                      onClick={() =>
                        setPortionActives({
                          ...portionActives,
                          quater: !portionActives.quater,
                        })
                      }
                      control={<Checkbox />}
                      label="Quater"
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
              <Grid container spacing={1}>
                <Grid item md={1}>
                  <FormControl sx={{ mb: 2, width: "100%" }}>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Full Price
                    </InputLabel>
                    <OutlinedInput
                      type="number"
                      value={fullPrice}
                      onChange={(e) => {
                        if (
                          e.target.value.length < 8 &&
                          !isNaN(e.target.value)
                        ) {
                          setFullPrice(e.target.value);
                        }
                      }}
                      id="outlined-adornment-amount"
                      label="Full Price"
                      disabled={portionActives.full}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={1}>
                  <FormControl sx={{ mb: 2, width: "100%" }}>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Half Price
                    </InputLabel>
                    <OutlinedInput
                      value={halfPrice}
                      onChange={(e) => {
                        if (
                          e.target.value.length < 8 &&
                          !isNaN(e.target.value)
                        ) {
                          setHalfPrice(e.target.value);
                        }
                      }}
                      id="outlined-adornment-amount"
                      label="Half Price"
                      disabled={portionActives.half}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={1.5}>
                  <FormControl sx={{ mb: 2, width: "100%" }}>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Quater Price
                    </InputLabel>
                    <OutlinedInput
                      type="number"
                      value={quaterPrice}
                      onChange={(e) => {
                        if (!isNaN(e.target.value)) {
                          setQuaterPrice(e.target.value);
                        }
                      }}
                      id="outlined-adornment-amount"
                      label="Quater Price"
                      disabled={portionActives.quater}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </FormControl>
          )}
          {!portion && (
            <FormControl sx={{ mb: 2, width: "30%" }}>
              <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
              <OutlinedInput
                type="number"
                value={price}
                onChange={(e) => {
                  if (e.target.value.length < 6 && !isNaN(e.target.value)) {
                    setPrice(e.target.value);
                  }
                }}
                id="outlined-adornment-amount"
                label="Price"
              />
            </FormControl>
          )}
        </Stack>
        {/* Is Veg */}
        <FormControl>
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            sx={{ color: "#3385ff", fontWeight: "bold" }}
          >
            Veg / Non-Veg
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue="Yes"
          >
            <FormControlLabel
              value="Yes"
              onChange={() => setIsVeg(true)}
              control={<Radio />}
              label="Yes"
            />
            <FormControlLabel
              value="No"
              onChange={() => setIsVeg(false)}
              control={<Radio />}
              label="No"
            />
          </RadioGroup>
        </FormControl>
        <Grid>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input onChange={handleImage} hidden accept="image/*" type="file" />
            <AddPhotoAlternateIcon fontSize="large" />
            Upload a Image
          </IconButton>
        </Grid>
        <Grid>
          {menuItem ? (
            <Button
              variant="contained"
              align="center"
              onClick={(e) => editItem(e)}
              sx={{ margin: "8px 0" }}
            >
              Edit Menu
            </Button>
          ) : (
            <Button
              variant="contained"
              align="center"
              onClick={(e) => addMenuItem(e)}
              sx={{ margin: "8px 0" }}
            >
              Add to Menu
            </Button>
          )}
        </Grid>
        {/* </Paper> */}
      </Grid>
    </Box>
  );
}

export default AddMenu;
