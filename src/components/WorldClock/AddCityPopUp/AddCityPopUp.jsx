import React from "react";
import "./AddCityPopUp.css"; // Style separately for better UI

const AddCityPopUp = ({ onClose, handleSelect, search, setSearch, filteredCities }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <button className="close-btn" onClick={onClose}>X</button>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search city..."
                />
                <ul className="option-list">
                    {filteredCities.length === 0 ? (
                        <li style={{ padding: "8px" }}>No results found</li>
                    ) : (
                        filteredCities.map((city, index) => (
                            <li key={index} onClick={() => handleSelect(city)}>
                                {city.location}
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default AddCityPopUp;
