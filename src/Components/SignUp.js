import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function SignUp() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
              <Dialog
          className="Test"
          sx={{ width: "100%" }}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>SignUp</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {/* <Typography>It's quick and easy</Typography> */}
            </DialogContentText>
            {/* Resturant Name */}
            <FormControl sx={ formStyle }>
              <InputLabel htmlFor="outlined-adornment-amount">
                Resturant Name
              </InputLabel>
              <OutlinedInput
                value={resturantName}
                type="text"
                id="outlined-adornment-amount"
                label="ResturantName"
                onChange={(e)=>{
                  if(e.target.value.length < 50){
                    setResturantName(e.target.value)
                  }
                }}
              />
            </FormControl>
            {/* Contact Person Name */}
            <FormControl sx={ formStyle }>
              <InputLabel htmlFor="outlined-adornment-amount">
                Contact Person Name
              </InputLabel>
              <OutlinedInput
                value={name}
                type="text"
                id="outlined-adornment-amount"
                label="ContactPersonName"
                // onChange={(e)=>{
                //   if(e.target)
                // }}
              />
            </FormControl>
            {/* Mobile Number */}
            <FormControl sx={ formStyle }>
              <InputLabel htmlFor="outlined-adornment-amount">
                Mobile Number
              </InputLabel>
              <OutlinedInput
                type="number"
                id="outlined-adornment-amount"
                label="MobileNumber"
              />
            </FormControl>
            {/* Email Address */}
            <FormControl sx={ formStyle }>
              <InputLabel htmlFor="outlined-adornment-amount">
                Email Address
              </InputLabel>
              <OutlinedInput
                type="text"
                id="outlined-adornment-amount"
                label="EmailAddress"
              />
            </FormControl>
            {/* Password */}
            <FormControl sx={ formStyle }>
              <InputLabel htmlFor="outlined-adornment-amount">
                New Password
              </InputLabel>
              <OutlinedInput
                type="text"
                id="outlined-adornment-amount"
                label="NewPassword"
              />
            </FormControl>
            {/* GST No */}
            <FormControl sx={ formStyle }>
              <InputLabel htmlFor="outlined-adornment-amount">
                GST Number
              </InputLabel>
              <OutlinedInput
                type="text"
                id="outlined-adornment-amount"
                label="GSTNumber"
              />
            </FormControl>
            {/* FSSAI No */}
            <FormControl sx={ formStyle }>
              <InputLabel htmlFor="outlined-adornment-amount">
                FSSAI Number
              </InputLabel>
              <OutlinedInput
                type="text"
                id="outlined-adornment-amount"
                label="FSSAINumber"
              />
            </FormControl>
            {/* Address */}
            <Grid container spacing={1}>
              <Grid item xs={4}>
                {/* House No */}
                <FormControl sx={ formStyle }>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    House Number
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    id="outlined-adornment-amount"
                    label="HouseNumber"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                {/* Street Name  */}
                <FormControl sx={ formStyle }>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Street Name
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    id="outlined-adornment-amount"
                    label="StreetName"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                {/* Locality  */}
                <FormControl sx={ formStyle }>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Locality
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    id="outlined-adornment-amount"
                    label="Locality"
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                {/* City */}
                <FormControl sx={ formStyle }>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    City
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    id="outlined-adornment-amount"
                    label="City"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                {/* State  */}
                <FormControl sx={ formStyle }>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    State
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    id="outlined-adornment-amount"
                    label="State"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                {/* Pincode  */}
                <FormControl sx={ formStyle }>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Pincode
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    id="outlined-adornment-amount"
                    label="Pincode"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Submit</Button>
          </DialogActions>
        </Dialog>
    </div>
  );
}