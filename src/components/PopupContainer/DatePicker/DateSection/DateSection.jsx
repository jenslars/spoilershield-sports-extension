import React from 'react';
import Day from './Day/Day';
import { StyledDateSection } from './styles';

const DateSection = ({ currentWeek, activeDay, onDayClick }) => {
  return (
    <StyledDateSection>
      {currentWeek.map((date, index) => (
        <Day
          key={index}
          date={date}
          isActive={activeDay && activeDay.toDateString() === date.toDateString()} // Check if the date is active
          onClick={() => onDayClick(date)}
        />
      ))}
    </StyledDateSection>
  );
};

export default DateSection;
