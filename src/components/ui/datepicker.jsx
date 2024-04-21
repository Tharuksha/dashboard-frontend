import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

function DatePicker() {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div>
            <label htmlFor="addedOn">Added On:</label>
            <ReactDatePicker
                id="addedOn"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy" // Specify the date format here
            />
            {/* You can display the selected date if needed */}
            {/* {selectedDate && <p>Selected Date: {selectedDate.toDateString()}</p>} */}
        </div>
    );
}

export default DatePicker;
