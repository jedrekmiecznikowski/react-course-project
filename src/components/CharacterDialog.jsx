import React from 'react';
import {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormHelperText from '@mui/material/FormHelperText';

export default function CharacterDialog({addCharacter}) {
  const [open, setOpen] = useState(false);
  const [characterName, setCharacterName] = useState('');
  const [error, setError] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!characterName) {
        setError(true);
        return;
    }
    addCharacter(characterName);
    setCharacterName('');
    handleClose();
  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Character
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Add Character</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus            
            margin="dense"
            id="character-name"
            name = "character-name"
            label="Type Character Name"
            fullWidth
            variant="standard"
            value={characterName}
            onChange={event => setCharacterName(event.target.value)}
            error={error}
            inputProps={{
                autoComplete: 'off'
           }}
          />
          {error && <FormHelperText error={true}>Character name is required</FormHelperText>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add Character</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}