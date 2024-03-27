import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ColorToggleButton({isCharacterView, setIsCharacterView}) {

  return (
    <ToggleButtonGroup
      color="primary"
      value={isCharacterView ? 'character' : 'bag'}
      exclusive
      onChange={(event) => {setIsCharacterView(!isCharacterView)}}
      aria-label="Platform"
    >
      <ToggleButton value="bag">Bag View</ToggleButton>  
      <ToggleButton value="character">Character View</ToggleButton>
      
    </ToggleButtonGroup>
  );
}