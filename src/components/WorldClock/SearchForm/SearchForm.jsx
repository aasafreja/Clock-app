import React, { useState, useEffect, useMemo } from 'react'
import './SearchForm.css'
import Papa from 'papaparse';
import AddCityPopUp from '../AddCityPopUp/AddCityPopUp';


const SearchForm = ({ handleAddLocations }) => {
    const [cities, setCities] = useState([]);

    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const [blurred, setBlurred] = useState(false)

    const getCities = () => {
        fetch('./worldcities.csv')
            .then(response => response.text())
            .then(responseText => {
                Papa.parse(responseText, {
                    header: true,  // assuming the first row of CSV contains headers
                    skipEmptyLines: true,
                    complete: (result) => {
                        const filteredData = result.data.map(city => ({
                            location: `${city.city}, ${city.country}`,
                            city: city.city,
                            country: city.country,
                            latitude: city.lat,
                            longitude: city.lng,
                        }))

                        setCities(filteredData); // Set cities to the parsed data
                    },
                    error: (error) => {
                        console.error('Error parsing CSV:', error);
                    }
                });
            })

    }

    useEffect(() => {
        getCities()
    }, [])


    const filteredCities = useMemo(() => {
        return cities.filter(city =>
            city.location.toLowerCase().includes(search.toLowerCase())
        ).slice(0, 20); // Limit to 20 results for performance
    }, [search, cities]);


    const handleSelect = (location) => {
        handleAddLocations(location);
        setSearch('');
        setIsOpen(false);

    }

    const handleAddClick = () => {
        setIsOpen(true);
        setBlurred(true)
    }

    return (
        <div className="form-container">
            <button className='btn btn-two' onClick={handleAddClick}>Add City</button>
            {isOpen && (
                <AddCityPopUp
                    onClose={() => setIsOpen(false)}
                    handleSelect={handleSelect}
                    search={search}
                    setSearch={setSearch}
                    filteredCities={filteredCities}
                />
            )}
        </div>
    )
}

export default SearchForm

