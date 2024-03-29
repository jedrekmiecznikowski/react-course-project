import bagimg from '../assets/bag.png'
import FormDialog from '../components/Dialog'
import TopBar from '../components/TopBar'
import OpenBag from '../components/OpenBag'
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
      
      <OpenBag label = "Open Bag"/>  
      <div style={{ margin: '10px' }}></div>     
      <FormDialog label= "Create Bag" onBagNameChange={handleBagNameChange}/>
    </div>
  </div>
  </>
  )
}
