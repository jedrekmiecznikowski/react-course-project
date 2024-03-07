import { useState } from 'react'
import bagimg from './assets/bag.png'
import './App.css'
import { Button } from './components/button'
import TopBar from './components/TopBar'
import FormDialog from './components/Dialog'
import {ThemeToggle} from './components/ThemeToggle'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <TopBar />
    <ThemeToggle />
    </>
  )
}

export default App


