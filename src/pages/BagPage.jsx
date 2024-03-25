import {Button} from '../components/button';
import {useParams} from 'react-router-dom';
import TopBar from '../components/TopBar';
import songsData from '../data/songs.json';
import ItemDialog from '../components/ItemDialog';
import CharacterDialog from '../components/CharacterDialog';
import {useState} from 'react';

export const BagPage = ({}) => {

  const { bagName } = useParams();

  const [ characterList, setCharacterList ] = useState([]);

  const addCharacter = (characterName) => {
    setCharacterList([...characterList, characterName]);
  }

  console.log(characterList);

  return (
    <>
    <TopBar bagName={bagName}/>
    <div className='card'>
    <ItemDialog characterList={characterList}/>  
    <CharacterDialog addCharacter={addCharacter} />
    </div>
    </>
  )
}
