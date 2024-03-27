import {useParams} from 'react-router-dom';
import TopBar from '../components/TopBar';
import ItemDialog from '../components/ItemDialog';
import CharacterDialog from '../components/CharacterDialog';
import {useState} from 'react';
import DataTable from '../components/DataTable';
import RowsContext from '../context/RowsContext';
import ToggleView from '../components/ToggleView';
import { useLocation } from 'react-router-dom';
import template from '../data/template';
import { useEffect } from 'react';

export const BagPage = ({}) => {

  const { bagName } = useParams();

  

  // remove hyphens and replace with spaces and capitalize first letter of each word
  const bagNameFormatted = bagName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  const [ characterList, setCharacterList ] = useState([]);
  const [ rows, setRows ] = useState([]); // Define your rows state here
  const [ isCharacterView, setIsCharacterView ] = useState(false);

  const location = useLocation();



  useEffect(() => {
    if (location.search) {
      setRows(template);
      setCharacterList(Array.from(new Set(template.map((row) => row['carried-by']))));
    }
  }, []); // Empty dependency array ensures that the effect runs only once



  const onButtonClick = (e, row) => {
    setRows((oldRows) => oldRows.filter((oldRow) => oldRow.id !== row.id));
  };

  const addCharacter = (characterName) => {
    setCharacterList([...characterList, characterName]);
  };


  return (
    <>
      <RowsContext.Provider value={{rows, setRows}}>
      <TopBar bagName={bagNameFormatted}/>
      <div className='card'>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          
        
          <ToggleView setIsCharacterView={setIsCharacterView} isCharacterView={isCharacterView}/>
          <div style={{ margin: '10px' }}></div>
          <ItemDialog characterList={characterList}/>  
          <div style={{ margin: '10px' }}></div>
          <CharacterDialog addCharacter={addCharacter} />
          
        </div>
        {isCharacterView && (
          characterList.map((character) => (
            // print character name
            <>
            <h2>
              Hero: {character}
            </h2>
            <DataTable rows = {rows} filteredField = {character} onButtonClick = {onButtonClick}/>
          
            </>
          ))
        )}
        {!isCharacterView && (
          <>
          <h2> All Items </h2>
          <DataTable rows = {rows} onButtonClick = {onButtonClick}/>
          </>
        )}
      </div>
    </RowsContext.Provider >  
    </>
  );
}
