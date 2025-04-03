import React, { useState } from 'react'
import Timer from './components/Timer/Timer'
import StopWatch from './components/StopWatch/StopWatch'
import WorldClock from './components/WorldClock/WorldClock'
import NavBar from './components/NavBar/NavBar'
import './App.css'


const App = () => {

  const [activeTab, setActiveTab] = useState('stopwatch');


  return (
    <div className='main-app'>
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "timer" && <Timer />}
      {activeTab === "stopwatch" && <StopWatch />}
      {activeTab === "worldclock" && <WorldClock />}
    </div>

  )
}

export default App

