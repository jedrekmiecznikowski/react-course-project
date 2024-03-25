import React from 'react';
import {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import StarIcon from '@mui/icons-material/Star'; // Import StarIcon
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import  QuantityInput from './QuantityInput';





export default function ItemDialog({characterList}) {

  const [itemNames, setItemNames] = useState([]);
  const [itemIndexes, setItemIndexes] = useState([]);
  const [magicItemIndexes, setMagicItemIndexes] = useState([]);
    const [value, setValue] = useState(1);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();
  }

  useEffect(() => {
    const fetchItemNames = async () => {
        const responseEquipment = await axios.get('https://www.dnd5eapi.co/api/equipment');
        // console.log(responseEquipment);
        const responseMagicItems = await axios.get('https://www.dnd5eapi.co/api/magic-items');
        // add magic items to equipment & map to name
        const names = responseEquipment.data.results.concat(
            responseMagicItems.data.results).map(
                (item) => item.name);
        const indexes = responseEquipment.data.results.concat(
            responseMagicItems.data.results).map(
                (item) => item.index);
        const magicIndexes = responseMagicItems.data.results.map((item) => item.index);
            
        

        setItemNames(names);
        setItemIndexes(indexes);
        setMagicItemIndexes(magicIndexes);

  };
    fetchItemNames();
  },[]);  

return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Item
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>

          <Autocomplete
        freeSolo
        id="items-search"
        disableClearable
        options={(Array.from(new Set(itemNames))).sort()}
        renderOption={(props, option, { selected }) => (
            <Box
              component="li"
              sx={{ '& > :not(style)': {alignItems: 'center' } }}
              {...props}
            >
              <>  
              {magicItemIndexes.includes(itemIndexes[itemNames.indexOf(option)]) && <StarIcon sx = {{margin: 0}}/>}
              {option}
                </>               
            </Box>
          )}
        renderInput={(params) => (
            <TextField
                {...params}
                label="Search items"
                InputProps={{
                    ...params.InputProps,
                    type: 'search',
                }}
            />
        )}
    />
     <br></br>
     <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Can't find the item you're looking for? Add it here!</Typography>
          <TextField
            autoFocus            
            margin="dense"
            id="name"
            name = "name"
            label="Type your item name here"
            fullWidth
            variant="standard"
            inputProps={{
                autoComplete: 'off'
           }}
            
          />
        </AccordionSummary>
        <AccordionDetails>
        <TextField
            autoFocus            
            margin="dense"
            id="description"
            name = "description"
            label="Type your item description here"
            fullWidth
            variant="standard"
            inputProps={{
                autoComplete: 'off'
           }}
          />
        </AccordionDetails>

        </Accordion>
        <QuantityInput/> 
          <FormControl>
               
            <br></br>  
            <FormLabel id="demo-row-radio-buttons-group-label">Who carries it?</FormLabel>
            <RadioGroup              
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              {characterList.map((character) => (
                <FormControlLabel key={character} value={character} control={<Radio />} label={character} />
              ))}
            </RadioGroup>
          </FormControl>
          <TextField
            autoFocus            
            margin="dense"
            id="note"
            name = "notes"
            label="Player Notes"
            fullWidth
            variant="standard"
            inputProps={{
                autoComplete: 'off'
           }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add Item</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    
);
}

