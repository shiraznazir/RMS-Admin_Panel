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
  Divider,
  Autocomplete,
} from "@mui/material";
import { useForm } from "react-hook-form";
import SubMenu from "../../Components/SubMenu/SubMenu";
import Breadcrumb from "../../Components/Breadcrumb/index";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import {
  insertMenuItem,
  getCateByResturant,
  getMenuItems,
  getMenuItemsById,
  editMenuItem,
} from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../Components/store/reducer/userSlice";

const style = {
  mainContainer: {
    bgcolor: "#f0f0f0",
    mt: -2,
    p: 2,
    width: "100%",
  },
  formContainer: {
    bgcolor: "#ffffff",
    ml: 2,
    mt: 2,
    p: 2,
    borderRadius: 2,
    position: "relative",
    overflowX: "hidden",
  },
  form: {
    mt: 2,
  },
};

function AddMenu() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    trigger,
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { id } = useParams();
  const title = id ? "Edit" : "Add";

  const [categoriesValue, setCategoriesValue] = useState("");

  const [menuItems, setMenuItems] = useState([]);
  const [name, setName] = useState("");
  const [selectCategories, setSelectCategories] = useState("");
  const [portion, setPortion] = useState("No");
  const [error, setError] = useState([]);
  const [price, setPrice] = useState("");
  const [portionActives, setPortionActives] = useState({
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
  const [message, setMessage] = useState("");
  const [checked, setChecked] = useState({
    full: false,
    half: false,
    quater: false,
  });
  const [preview, setPreview] = useState("");
  const [categories, setCategories] = useState([]);

  const validate = () => {
    let err = [];
    if (name.length < 3) {
      err.push("Name should 3 characters long");
    }
    if (selectCategories.length < 3) {
      err.push("Please select category");
    }
    if (!portion && price <= 0) {
      err.push("Price should be a greated than 0");
    }
    if (portion && (fullPrice <= 0 || halfPrice <= 0 || quaterPrice <= 0)) {
      err.push("Portion price is required.");
    }
    if (err.length > 0) {
      setError(err);
      return false;
    } else {
      return true;
    }
  };

  const generateRandomNoID = () => {
    let randomNumber = Math.floor(100000 + Math.random() * 900000);
    randomNumber = String(randomNumber);
    randomNumber = randomNumber.substring(0, 4);
    return "mi_" + randomNumber;
  };

  const createData = () => {
    let id = generateRandomNoID();

    const checkId = menuItems.filter((item) => item.id === id);

    if (checkId.length) {
      createData();
    }

    const formData = new FormData();
    formData.append("id", id);
    formData.append("resturantId", user.id);
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
    let valid = validate();
    if (valid) {
      const formData = createData();
      console.log("Check item data>>>>>>>", formData);
      insertMenuItem(formData).then((res) => {
        setMessage(res.data.message);
        if (res.data.status) {
          setTimeout(() => {
            navigate("/Menu");
          }, 1500);
        }
      });
    }
  };

  const handleEditPortion = () => {
    if (!portion) {
      setHalfPrice("");
      setQuaterPrice("");
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
      .then((res) => {
        setMenuItems(res.data);
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  };

  const fetchCategories = () => {
    console.log("res categ here");
    getCateByResturant({ id: user.id })
      .then((res) => {
        let data = res.data.categories;
        let Catdata = data.filter((value) => {
          return value.resturantId === user.id;
        });
        setCategories(Catdata);
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  };

  const fetchMenuItemsById = () => {
    getMenuItemsById(id)
      .then((res) => {
        console.log("getMenuItemsById : ", res.data);
        setMenuItem(res.data);
        setName(res.data.name);
        setSelectCategories(res.data.category);
        setPortion(res.data.portion);
        setFullPrice(res.data.fullPrice);
        setHalfPrice(res.data.halfPrice);
        setQuaterPrice(res.data.quaterPrice);
        setIsVeg(res.data.isVeg);
        setFileName(res.data.menuImage);
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
    setPreview(URL.createObjectURL(e.target.files[0]));
    setFileName(e.target.files[0]);
  };
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  const saveAction = handleSubmit((data) => {
    console.log(data);
  });
  const handleCancel = () => navigate("/Menu");

  console.log("Menu Items section user id >>>>>>>>> ", user.id);
  console.log("categories :- ", categories);
  console.log("portion ", portion);
  return (
    <>
      <Box sx={{ overflowX: "hidden" }}>
        <SubMenu
          title={
            <Breadcrumb
              routeSegments={[
                { name: "Menu", path: "#" },
                { name: `${title} Menu`, path: "#" },
              ]}
            />
          }
        />
        <Box sx={style.mainContainer}>
          <Box sx={style.formContainer}>
            <Box sx={{ mb: 2, width: "100%" }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: "#1976D2" }}
              >
                Add Menu Items
              </Typography>
            </Box>
            <Divider fullWidth />
            <Box component="form" sx={style.form} autoComplete="off" noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    type="text"
                    required
                    label="Name"
                    error={Boolean(errors.name)}
                    helperText={Boolean(errors.name) && errors.name.message}
                    {...register("name", {
                      required: "Required",
                      pattern: {
                        value: /^[a-zA-Z0-9- ]*$/,
                        message: "Only alphanumeric allowed",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("name");
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    isOptionEqualToValue={(option, value) =>
                      option.label === value?.label
                    }
                    getOptionLabel={(option) => option.label || ""}
                    options={categories.map((item) => {
                      return {
                        uid: item.id,
                        label: item.title,
                      };
                    })}
                    value={categoriesValue}
                    onChange={(event, newValue) => {
                      setCategoriesValue(newValue);
                      setValue("category", newValue);
                      trigger("category");
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        error={Boolean(errors.category)}
                        helperText={errors?.category?.message}
                        {...register("category", {
                          required: "Required",
                        })}
                        label="Categories"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl>
                    <FormLabel>Portion</FormLabel>
                    <RadioGroup
                      row
                      value={portion}
                      onChange={(e) => setPortion(e.target.value)}
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  {portion === "Yes" ? (
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <TextField
                          type="text"
                          required
                          label="Full Price"
                          error={Boolean(errors.full_price)}
                          helperText={
                            Boolean(errors.full_price) &&
                            errors.full_price.message
                          }
                          {...register("full_price", {
                            required: "Required",
                            pattern: {
                              value: /^[0-9- ]*$/,
                              message: "Only number allowed",
                            },
                          })}
                          onKeyUp={() => {
                            trigger("full_price");
                          }}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          required
                          label="Half Price"
                          error={Boolean(errors.half_price)}
                          helperText={
                            Boolean(errors.half_price) &&
                            errors.half_price.message
                          }
                          {...register("half_price", {
                            required: "Required",
                            pattern: {
                              value: /^[0-9- ]*$/,
                              message: "Only number allowed",
                            },
                          })}
                          onKeyUp={() => {
                            trigger("half_price");
                          }}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          required
                          label="Quater Price"
                          error={Boolean(errors.quater_price)}
                          helperText={
                            Boolean(errors.quater_price) &&
                            errors.quater_price.message
                          }
                          {...register("quater_price", {
                            required: "Required",
                            pattern: {
                              value: /^[0-9- ]*$/,
                              message: "Only number allowed",
                            },
                          })}
                          onKeyUp={() => {
                            trigger("quater_price");
                          }}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  ) : (
                    <TextField
                      type="text"
                      required
                      label="Price"
                      error={Boolean(errors.price)}
                      helperText={
                        Boolean(errors.price) && errors.price.message
                      }
                      {...register("price", {
                        required: "Required",
                        pattern: {
                          value: /^[0-9- ]*$/,
                          message: "Only number allowed",
                        },
                      })}
                      onKeyUp={() => {
                        trigger("price");
                      }}
                      fullWidth
                    />
                  )}
                </Grid>
                
              </Grid>
              {/* <Button variant="contained" onClick={saveAction}>
                  Save
                </Button> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AddMenu;
