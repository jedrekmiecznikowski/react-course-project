import { useState } from 'react'
import bagimg from './assets/bag.png'
import './App.css'
import { Button } from './components/button'
import TopBar from './components/TopBar'
import FormDialog from './components/Dialog'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <TopBar />
    <div className='main'>
      <div>
        <a href="https://www.dndbeyond.com/magic-items/4581-bag-of-holding" target="_blank">
          <img src={bagimg} className="logo" alt="satchel logo" />
        </a>
      </div>
      <h1>Bag of Holding</h1>
      
      <div className="card">
        <Button label="Open Bag" />        
        <FormDialog label= "Create Bag"/>
      </div>
    </div>
    </>
  )
}

export default App


