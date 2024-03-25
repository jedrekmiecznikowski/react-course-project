import { useState, useEffect } from "react"
import bagimg from '../assets/bag.png'
import '../App.css'
import { Button } from './button'
import FormDialog from './Dialog'


export const ThemeToggle = () => {
  const [isDark, setTheme] = useState(false)

  return (
    <div className={isDark ? "dark-theme" : "main"}>
    <button onClick={() => setTheme(!isDark)}>
      {isDark ? "Light" : "Dark"} Mode
    </button>

    
      <a href="https://www.dndbeyond.com/magic-items/4581-bag-of-holding" target="_blank">
        <img src={bagimg} className="logo" alt="satchel logo" />
      </a>
    
    <h1>Bag of Holding</h1>
    
    <div className="card">
      <Button label="Open Bag" />        
      <FormDialog label= "Create Bag"/>
    </div>
  </div>
  </>
  )
}