import React, { useEffect, useState } from 'react'
import SearchForm from './SearchForm/SearchForm'
import ClockList from './ClockList/ClockList'
import './WorldClock.css'


const WorldClock = () => {

    const [selectedLocations, setSelectedLocations] = useState([]);
    const [timeData, setTimeData] = useState({});



    const handleAddLocations = (location) => {
        if (!selectedLocations.includes(location)) {
            setSelectedLocations([...selectedLocations, location]);
        }
        console.log(selectedLocations)
    }

    const handleDelete = (locations) => {
        setSelectedLocations(selectedLocations
            .filter((location) => location.location !== locations.location)
        )
    }

    return (
        <div className='world-clock container'>
            <h1>World Clock</h1>
            <SearchForm handleAddLocations={handleAddLocations} />
            <ClockList selectedLocations={selectedLocations} handleDelete={handleDelete} />

        </div>
    )
}

export default WorldClock
