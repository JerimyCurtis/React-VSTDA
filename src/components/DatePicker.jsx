// src/components/DatePicker.jsx
import React from 'react';

const DatePicker = ({ selectedDate, setSelectedDate }) => {
  return (
    <input
      type="date"
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
    />
  );
};

export default DatePicker;
