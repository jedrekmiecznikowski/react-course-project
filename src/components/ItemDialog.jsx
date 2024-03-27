import React from 'react';
import {useState, useEffect, useContext} from 'react';
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
import QuantityInput from './QuantityInput';
import RowsContext from '../context/RowsContext';


export default function ItemDialog({characterList}) {

  const [itemNames, setItemNames] = useState([]);
  const [itemIndexes, setItemIndexes] = useState([]);
  const [magicItemIndexes, setMagicItemIndexes] = useState([]);
  const [value, setValue] = useState(1);

  const [open, setOpen] = useState(false);
  const [isItemPicked, setIsItemPicked] = useState(false);
  const [autocompleteValue, setAutocompleteValue] = useState(''); // Add this to your state hooks
  const [quantity, setQuantity] = useState(1);

  const {rows, setRows} = useContext(RowsContext);

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
    console.log(formJson);
    // pick itemName that is not undefined or ''
    const fetchItemDetails = async () => {
        let response;
        let newRow;
        if (formJson['item-name-custom']) {
            newRow = {       
                id:  formJson['item-name-custom'].replace(/\s+/g, '-').toLowerCase() + '-' + formJson['carried-by'],
                name: formJson['item-name-custom'],
                quantity: quantity, // Assuming you have a quantity field in your form
                'carried-by': formJson['carried-by'], // Assuming you have a carried-by field in your form
                notes: formJson['notes'],
            }; 
        } else {
            if (magicItemIndexes.includes(
                itemIndexes[itemNames.indexOf(autocompleteValue)]
                )) {
                response = await axios.get('https://www.dnd5eapi.co/api/magic-items/' + itemIndexes[itemNames.indexOf(autocompleteValue)]);
                
            } else {
                response = await axios.get('https://www.dnd5eapi.co/api/equipment/' + itemIndexes[itemNames.indexOf(autocompleteValue)]);
                
            } 
            newRow = {       
                id:  response.data.index + '-' + formJson['carried-by'],
                name: response.data.name,
                cost: response.data.cost?.quantity,
                quantity: quantity, // Assuming you have a quantity field in your form
                weight: response.data.weight,
                'carried-by': formJson['carried-by'], // Assuming you have a carried-by field in your form
                'rarity-name': response.data.rarity?.name,
                notes: formJson['notes'],
            }; 
        }

        // Check if a row with the same id already exists
        let existingRow = rows.find(row => row.id === newRow.id);

        if (existingRow) {
        // If it does, increase the quantity of that row by 1
        existingRow.quantity += quantity;
        console.log(existingRow.quantity);
        setRows([...rows]);
        } else {
        // If it doesn't, add the new row to rows
        setRows(prevRows => [...prevRows, newRow]);
        }
    }
    fetchItemDetails();
    console.log(rows);
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
        name = "items-search"
        value={autocompleteValue}
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
        onInputChange={(event, value) => {
            setAutocompleteValue(value);
            setIsItemPicked(!!value);

        }}
    />
     <br></br>
     <Accordion disabled={isItemPicked}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Can't find the item you're looking for? Add it here!</Typography>
          <TextField
            autoFocus            
            margin="dense"
            id="item-name-custom"
            name = "item-name-custom"
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
        <FormControl>
        <QuantityInput quantity = {quantity} setQuantity = {setQuantity}/> 
          
               
            <br></br>  
            <FormLabel id="demo-row-radio-buttons-group-label">Who carries it?</FormLabel>
            <RadioGroup              
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="carried-by"
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

