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
  editMenuItem,
} from "../api/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const paperStyle = {
  padding: 40,
  paddingLeft: 100,
  paddingRight: 100,
  margin: "5px auto",
};

function AddMenu() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [name, setName] = useState("");
  const [selectCategories, setSelectCategories] = useState("");
  const [portion, setPortion] = useState(false);
  const [error, setError] = useState([]);
  const [price, setPrice] = useState("");
  const [portionActives, setPortionActives] = React.useState({
    full: false,
    half: false,
    quater: false,
  });
  const [menuItem, setMenuItem] = useState("");
  const [fullPrice, setFullPrice] = useState("");
  const [halfPrice, setHalfPrice] = useState("");
  const [quaterPrice, setQuaterPrice] = useState("");
  const [isVeg, setIsVeg] = useState("Veg");
  const [fileName, setFileName] = useState("");
  const [message,setMessage] = useState("")
  const [checked, setChecked] = useState({
    full: false,
    half: false,
    quater: false,
  });

  const [categories, setCategories] = React.useState([]);

  const validate = () => {
    let err = []
    if(name.length < 3 ){
      err.push("Name should 3 characters long")
    }
    if(selectCategories.length < 3 ){
      err.push("Name should 3 characters long")
    }
    if(!portion && price <= 0){
      err.push("Price should be a greated than 0")
    }
    if((portion && (fullPrice <= 0 || halfPrice <=0 || quaterPrice <=0 ))){
      err.push("Portion price is required.")
    }
    if(err.length > 0 ){
      setError(err)
      return false
    }
    else {
      return true
    }
  }
  const createData = () => {
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", selectCategories);
    formData.append("portion", portion);
    !portion && formData.append("price", price);
    portion && formData.append("fullPrice", fullPrice);
    portion && formData.append("halfPrice", halfPrice);
    portion && formData.append("quaterPrice", quaterPrice);
    formData.append("isVeg", isVeg);
    fileName && formData.append("menuImage", fileName);
    formData.append("status", 1);

    return formData;
  };

  const addMenuItem = (e) => {
    e.preventDefault();
    let valid = validate()
   if(valid) {
    const formData = createData();
    insertMenuItem(formData).then((res)=> {
    console.log("add",res)
    setMessage(res.data.message)
    //console.log("res>>>>>>>>>>>>" , res.data.status);
    if(res.data.status){
      setTimeout(() => {
        navigate("/Menu");
      }, 1500);
    }
    
    });
   }
  };

  const editItem = (e) => {
    e.preventDefault();
    const formData = createData();
    editMenuItem(id, formData);
    navigate("/Menu");
  };

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
    console.log("res categ here",)
    getCategories()
      .then((response) => {
        console.log("res categ",response)
        setCategories(response.data);
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
        setSelectCategories(val.data.category);
        setPortion(val.data.portion);
        setFullPrice(val.data.fullPrice);
        setHalfPrice(val.data.halfPrice);
        setQuaterPrice(val.data.quaterPrice);
        setIsVeg(val.data.isVeg);
        setFileName(val.data.menuImage);
        setChecked({
          full: true,
          half: true,
          quater: true,
        });
        if (portion) {
          setPortionActives({
            full: true,
            half: true,
            quater: true,
          });
        }
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
    console.log("Select: ", e.target.value);
    setSelectCategories(e.target.value);
  };

  const handleImage = (e) => {
    setFileName(e.target.files[0]);
  };

  const handleCancel = () => navigate('/Menu');

  console.log("Categories 1212121 ", categories);

  return (
    <Box component="form" enctype="multipart/form-data">
      <Grid>
        <Paper style={paperStyle}>
          {menuItem ? (
            <Typography
              variant="h4"
              fontWeight="bold"
              align="center"
              sx={{ color: "#3385ff" }}
            >
              Edit Menu Items
            </Typography>
          ) : (
            <Typography
              variant="h4"
              fontWeight="bold"
              align="center"
              sx={{ color: "#3385ff" }}
            >
              Add Menu Items
            </Typography>
          )}
          <Typography>
            {message}
          </Typography>
          {error.map((er)=> <Typography fontWeight="bold"
              align="center"
              sx={{ color: "red" }}>{er}</Typography>)}
          <Grid container spacing={1}>
            <Grid align="right" item xs={12} md={6}>
              <FormControl sx={{ mb: 2, mt: 2, width: "100%" }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Name
                </InputLabel>
                <OutlinedInput
                  type="text"
                  id="outlined-adornment-amount"
                  value={name}
                  onChange={(e) => {
                    if(e.target.value.length < 30 && isNaN(e.target.value)){
                      setName(e.target.value)
                    }
                  }}
                  label="Name"
                />
              </FormControl>
            </Grid>
            <Grid align="left" item xs={12} md={6}>
              {/* Select Categories */}
              <FormControl sx={{ mb: 2, mt: 2, width: "100%" }}>
                <InputLabel id="demo-simple-select-label">
                  Categories
                </InputLabel>
                <Select
                  value={selectCategories}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Categories"
                  onChange={(e) => handleSelect(e)}
                >
                  {categories?.map((item) => {
                    return <MenuItem value={item._id}>{item.title}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid align="left" item md={6}>
              <FormControl>
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  sx={{
                    color: "#3385ff",
                    fontWeight: "bold",
                    marginTop: "10px",
                    alignContent: "center",
                  }}
                >
                  Portions
                </FormLabel>
                {/* </Grid>
                <Grid item md={6}> */}
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={portion ? "Yes" : "No"}
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
            </Grid>
            <Grid item md={6}>
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
                      <Grid item md={4}>
                        <FormControlLabel
                          value={portion}
                          onClick={() => {
                            setPortionActives({
                              ...portionActives,
                              full: !portionActives.full,
                            });
                            setChecked({
                              ...checked,
                              full: !checked.full,
                            });
                          }}
                          control={<Checkbox checked={checked.full} />}
                          label="Full"
                        />
                      </Grid>
                      <Grid item md={4}>
                        <FormControlLabel
                          value={portion}
                          onClick={() => {
                            setPortionActives({
                              ...portionActives,
                              half: !portionActives.half,
                            });
                            setChecked({
                              ...checked,
                              half: !checked.half,
                            });
                          }}
                          control={<Checkbox checked={checked.half} />}
                          label="Half"
                        />
                      </Grid>
                      <Grid item md={4}>
                        <FormControlLabel
                          value={portion}
                          onClick={() => {
                            setPortionActives({
                              ...portionActives,
                              quater: !portionActives.quater,
                            });
                            setChecked({
                              ...checked,
                              quater: !checked.quater,
                            });
                          }}
                          control={<Checkbox checked={checked.quater} />}
                          label="Quater"
                        />
                      </Grid>
                    </Grid>
                  </RadioGroup>
                  <Grid container spacing={1}>
                    <Grid item md={4}>
                      <FormControl sx={{ mb: 2, width: "100%" }}>
                        <InputLabel htmlFor="outlined-adornment-amount">
                          Full Price
                        </InputLabel>
                        <OutlinedInput
                          value={fullPrice}
                          onChange={(e) => {
                            if (
                              fullPrice?.length <= 10 &&
                              !isNaN(e.target.value) &&
                              e.target.value.length > 0
                            ) {
                              setFullPrice(e.target.value);
                            }
                          }}
                          id="outlined-adornment-amount"
                          label="Full Price"
                          disabled={!portionActives.full}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={4}>
                      <FormControl sx={{ mb: 2, width: "100%" }}>
                        <InputLabel htmlFor="outlined-adornment-amount">
                          Half Price
                        </InputLabel>
                        <OutlinedInput
                          type="number"
                          value={halfPrice}
                          onChange={(e) => {
                            if (
                              e.target.value.length < 8 &&
                              e.target.value > 0 &&
                              !isNaN(e.target.value)
                            ) {
                              setHalfPrice(e.target.value);
                            }
                          }}
                          id="outlined-adornment-amount"
                          label="Half Price"
                          disabled={!portionActives.half}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={4}>
                      <FormControl sx={{ mb: 2, width: "100%" }}>
                        <InputLabel htmlFor="outlined-adornment-amount">
                          Quater Price
                        </InputLabel>
                        <OutlinedInput
                          type="number"
                          value={quaterPrice}
                          onChange={(e) => {
                            if (
                              e.target.value.length < 8 &&
                              e.target.value > 0 &&
                              !isNaN(e.target.value)
                            ) {
                              setQuaterPrice(e.target.value);
                            }
                          }}
                          id="outlined-adornment-amount"
                          label="Quater Price"
                          disabled={!portionActives.quater}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </FormControl>
              )}
              {!portion && (
                <FormControl sx={{ mb: 2, width: "100%" }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Price
                  </InputLabel>
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
            </Grid>
            <Grid align="left" item md={6}>
              {/* Is Veg */}
              <FormControl>
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  sx={{ color: "#3385ff", fontWeight: "bold" }}
                >
                  Preparation
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={isVeg}
                >
                  <FormControlLabel
                    value="Veg"
                    onChange={() => setIsVeg("Veg")}
                    control={<Radio />}
                    label="Veg"
                  />
                  <FormControlLabel
                    value="Non-Veg"
                    onChange={() => setIsVeg("Non-Veg")}
                    control={<Radio />}
                    label="Non-Veg"
                  />
                  <FormControlLabel
                    value="Egg"
                    onChange={() => setIsVeg("Egg")}
                    control={<Radio />}
                    label="Egg"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid align="left" item md={6}>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  onChange={handleImage}
                  hidden
                  accept="image/*"
                  type="file"
                  fileName="menuImage"
                />
                <AddPhotoAlternateIcon fontSize="large" />
                Upload a Image
              </IconButton>
            </Grid>
            {/* Edit  & Save Button  */}
            <Grid align="right" md={12} sx={{ margin: "10px 0" }}>
              {/* <Grid container spacing={2}>
              <Grid align='right' item md={4}> */}
              <Button
                variant="contained"
                align="center"
                onClick={handleCancel}
                sx={{ margin: "8px 10px" }}
              >
                Cancel
              </Button>
              {/* </Grid>
              <Grid align='right' item md={4}> */}
              {menuItem ? (
                <Button
                  variant="contained"
                  align="center"
                  onClick={(e) => editItem(e)}
                  sx={{ margin: "8px 0" }}
                >
                  Save Changes
                </Button>
              ) : (
                <Button
                  variant="contained"
                  align="center"
                  onClick={(e) => addMenuItem(e)}
                  sx={{ margin: "8px 0" }}
                >
                  Save
                </Button>
              )}
              {/* </Grid>
            </Grid> */}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Box>
  );
}

export default AddMenu;
