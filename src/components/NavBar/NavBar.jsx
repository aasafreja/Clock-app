
import React from 'react'
import stopWatchImage from '../../assets/icons/stopwatch.png'
import timerImage from '../../assets/icons/timer.png'
import worldClock from '../../assets/icons/world-time.png'
import './NavBar.css'

const NavBar = ({ activeTab, setActiveTab }) => {


    return (
        <div className="navigation-menu">
            <div className={`menu-item ${activeTab === 'stopwatch' ? "active" : ""}`}>
                <img className='active' src={stopWatchImage}
                    style={{ width: '41px', cursor: 'pointer' }}
                    onClick={() => setActiveTab("stopwatch")} />
                <p>Stopwatch</p>
            </div>
            <div className={`menu-item ${activeTab === 'timer' ? "active" : ""}`}>
                <img src={timerImage}
                    style={{ width: '36px', cursor: 'pointer' }}
                    onClick={() => setActiveTab("timer")} />
                <p>Timer</p>
            </div>
            <div className={`menu-item ${activeTab === 'worldclock' ? "active" : ""}`}>
                <img src={worldClock}
                    style={{ width: '36px', cursor: 'pointer' }}
                    onClick={() => setActiveTab("worldclock")} />
                <p>World Clock</p>
            </div>
        </div>
    )
}

export default NavBar
