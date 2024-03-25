import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {useNavigate} from 'react-router-dom'

export default function FormDialog({label}) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const bagName = formJson.name;
    // onBagNameChange(bagName);
    handleClose();
    // then navigate
    navigate(`/bag/${bagName}`, {replace: true});
  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {label}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Create New Bag</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your bag. Make sure it is something you will remember. It must be one word.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name = "name"
            label="Type your bag name here"
            fullWidth
            variant="standard"
          />
          <FormControl>
            <br></br>  
            <FormLabel id="demo-row-radio-buttons-group-label">Use Template?</FormLabel>
            <RadioGroup
              required
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="1" control={<Radio />} label="Yes, I want to use the template." />
              <FormControlLabel value="0" control={<Radio />} label="No, I want to set up from scratch!!" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create Bag</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}