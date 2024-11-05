import React, { useState } from 'react';
import Day from './Day/Day';
import { StyledDateSection } from './styles';

const DateSection = ({ currentWeek }) => {
  const today = new Date().toDateString(); // Get today's date as a string for comparison
  const [activeDay, setActiveDay] = useState(today); // Initialize with today's date

  const handleDayClick = (date) => {
    setActiveDay(date.toDateString()); // Update active day to the clicked date
  };

  return (
    <StyledDateSection>
      {currentWeek.map((date, index) => (
        <Day
          key={index}
          date={date}
          isActive={activeDay === date.toDateString()} // Only the active day has the hover effect
          onClick={() => handleDayClick(date)}
        />
      ))}
    </StyledDateSection>
  );
};

export default DateSection;
