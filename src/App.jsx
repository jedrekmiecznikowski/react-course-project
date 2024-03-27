import { useState } from 'react'
import bagimg from './assets/bag.png'
import './App.css'
import FormDialog from './components/Dialog'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {routes} from './routes/routes'
import {HomePage} from './pages/HomePage'
import {BagPage} from './pages/BagPage'
import {NotFoundPage} from './pages/NotFoundPage'
import {InitiativePage} from './pages/InitiativePage'

function App() {

  return (
    <>
    
    
    
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/bag/:bagName" element={<BagPage/>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </BrowserRouter>
    {/* {!formSubmitted && (
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
    )}
    {formSubmitted && (
      <div className='card'>
      <Button label="Add Item"/> 
      <Button label="Add Character"/> 
      </div>

    )
    
    } */}
    </>
  )
}

export default App;


