import { times } from 'lodash';
import React, { useEffect, useState } from 'react'
import './ClockList.css'

const ClockList = ({ selectedLocations, handleDelete }) => {
    const [timeZones, setTimeZones] = useState([]);
    const [timeData, setTimeData] = useState({});
    const [previousMinute, setPreviousMinute] = useState(null);

    const fetchTimeZones = async () => {
        const fetchedZones = await Promise.all(
            selectedLocations.map(async (location) => {
                try {
                    const url = `https://timeapi.io/api/timezone/coordinate?latitude=${location.latitude}&longitude=${location.longitude}`;
                    const res = await fetch(url);
                    const data = await res.json();
                    return { ...location, timeZone: data.timeZone };
                } catch (error) {
                    console.error(`Error fetching time zone for ${location.location}:`, error);
                    return { ...location, timeZone: null };
                }
            })
        );
        setTimeZones(fetchedZones);
        console.log('this is timezones:')
        console.log(timeZones)
    };

    useEffect(() => {
        if (selectedLocations.length > 0) {
            fetchTimeZones();
        }
    }, [selectedLocations]);

    const getCurrentTime = (timeZone) => {
        if (!timeZone) return { currentTime: "Unknown", utc: "Unknown" };
        const now = new Date();

        return {
            currentTime: now.toLocaleTimeString('en-US', {
                timeZone,
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
            }),
            UTC: now.toLocaleTimeString('en-US', {
                timeZone,
                timeZoneName: 'short'
            }).split(' ')[2],
            fullDateTime: now.toLocaleString('en-US', { timeZone: timeZone })
        }
    }

    const updateTimeData = () => {

        const updatedTimeData = {};

        timeZones.forEach((city) => {
            if (city.timeZone) {
                const { currentTime, UTC } = getCurrentTime(city.timeZone);
                updatedTimeData[city.location] = { currentTime, UTC };
            }
        })

        console.log('Updated time data:', updatedTimeData);
        setTimeData(updatedTimeData);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const currentMinute = now.getMinutes();

            if (currentMinute !== previousMinute) {
                updateTimeData()
                setPreviousMinute(currentMinute)
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [previousMinute, timeZones])

    const rigaTime = getCurrentTime('Europe/Riga');

    const compareTime = (timeToCompare) => {
        const now = new Date();

        const date1 = new Date(now.toLocaleString('en-GB', { timeZone: 'Europe/Riga' }));
        const date2 = new Date(now.toLocaleString('en-GB', { timeZone: timeToCompare }));

        //reset time
        date1.setHours(0, 0, 0, 0);
        date2.setHours(0, 0, 0, 0);


        if (date1.getTime() === date2.getTime()) {
            return 'Today';
        } else if (date1.getTime() < date2.getTime()) {
            return 'Tomorrow';
        } else {
            return 'Yesterday';
        }
    }

    const compareHours = (time1, time2, timeZone) => {
        const day = compareTime(timeZone)

        const date1 = new Date(time1);
        const date2 = new Date(time2);

        const timeDifference = date1 - date2 // Subtract dates to get milliseconds
        const hourDifference = timeDifference / (1000 * 60 * 60);  // Convert milliseconds to hours

        if (hourDifference > 0) {
            return '-' + hourDifference;
        } else {
            return '+' + Math.abs(hourDifference)
        }





    }


    // Render individual time details for each location
    const renderTimeDetails = (timeZone, currentTime, UTC, location) => (
        <li key={location}>
            <p className="time-comparison">
                {compareTime(timeZone)} {compareHours(rigaTime.fullDateTime, currentTime)} HRS ({UTC})
            </p>
            <div className="current-time-details">
                <strong>{location}</strong>
                <p>{currentTime}</p>
            </div>
            <button onClick={() => handleDelete(location)}>X</button>
        </li>
    );

    return (
        <div className='selected-timezones'>
            <ul className='location-container'>
                <li>
                    <p className='time-comparison'>Today +0 HRS ({rigaTime.UTC})</p>
                    <div className="current-time-details">
                        <strong>Riga, Latvia</strong>
                        <p>{rigaTime.currentTime} </p>
                    </div>
                </li>
                {/* start */}
                {timeZones.map((zone, index) => {
                    const { currentTime, UTC, fullDateTime } = getCurrentTime(zone.timeZone);
                    return (
                        <li key={index}>
                            <p className='time-comparison'>
                                {compareTime(zone.timeZone)} {compareHours(rigaTime.fullDateTime, fullDateTime, zone.timeZone)} HRS ({UTC})
                            </p>
                            <div className="current-time-details">
                                <strong>{zone.location}</strong>
                                <p>{currentTime}</p>
                            </div>

                            <button onClick={() => handleDelete(zone)}>X</button>

                        </li>
                    );
                }
                )}
                {/* end */}
            </ul>
        </div>


    )
}

export default ClockList


