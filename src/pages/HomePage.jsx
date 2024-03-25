import bagimg from '../assets/bag.png'
import FormDialog from '../components/Dialog'
import TopBar from '../components/TopBar'
import { Button } from '../components/button'
import '../App.css'

export const HomePage = (handleBagNameChange) => {
  return (
    <>
    <TopBar bagName={''}/>
    <div className='main'>
    <div>
      <a href="https://www.dndbeyond.com/magic-items/4581-bag-of-holding" target="_blank">
        <img src={bagimg} className="logo" alt="satchel logo" />
      </a>
    </div>
    <h1>Bag of Holding</h1>
    
    <div className="card">
      
      <Button label="Open Bag" />        
      <FormDialog label= "Create Bag" onBagNameChange={handleBagNameChange}/>
    </div>
  </div>
  </>
  )
}
