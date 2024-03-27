import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useNavigate} from 'react-router-dom'



export default function OpenBag({label}) {
    const [open, setOpen] = useState(false);
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
      const bagNameHyphenated = bagName.replace(/\s+/g, '-').toLowerCase();
      handleClose();
      // then navigate
      navigate(`/bag/${bagNameHyphenated}`, {replace: true});
    }
    
    return (
      <>
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
        <DialogTitle>Open Existing Bag</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name of your bag. 
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Open Bag</Button>
        </DialogActions>
        </Dialog>
        </>
    )
}


