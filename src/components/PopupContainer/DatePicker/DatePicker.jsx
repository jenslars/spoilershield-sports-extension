import React, { useState, useEffect } from 'react';
import NavigateLeftButton from './NavigateLeftButton/NavigateLeftButton';
import NavigateRightButton from './NavigateRightButton/NavigateRightButton';
import DateSection from './DateSection/DateSection';
import { StyledDatePicker } from './styles';

// Helper function to generate a range of dates
const generateDateRange = (startDate, days) => {
  const dates = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    dates.push(date);
  }
  return dates;
};

const DatePicker = ({ updateMonthYear, onDateChange }) => {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [dateRange, setDateRange] = useState([]);
  const today = new Date();
  const [activeDay, setActiveDay] = useState(today);

  useEffect(() => {
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 365);
    const dates = generateDateRange(startDate, 730);
    setDateRange(dates);

    // Find today's index and set the initial week
    const todayIndex = dates.findIndex(date => 
      date.toDateString() === today.toDateString()
    );
    const initialWeekIndex = Math.floor(todayIndex / 7);
    setCurrentWeekIndex(initialWeekIndex);

    updateMonthYear(dates[todayIndex]);
    onDateChange(dates[todayIndex]); // Load initial schedule for today's date
  }, []);

  const currentWeek = dateRange.slice(currentWeekIndex * 7, (currentWeekIndex + 1) * 7);

  // Navigate to the previous week
  const handlePrevWeek = () => {
    setCurrentWeekIndex((prevIndex) => {
      if (prevIndex > 0) {
        const newIndex = prevIndex - 1;
        updateMonthYear(dateRange[newIndex * 7]);
        return newIndex;
      }
      return prevIndex;
    });
  };

  // Navigate to the next week
  const handleNextWeek = () => {
    setCurrentWeekIndex((prevIndex) => {
      if (prevIndex < (dateRange.length / 7) - 1) {
        const newIndex = prevIndex + 1;
        updateMonthYear(dateRange[newIndex * 7]);
        return newIndex;
      }
      return prevIndex;
    });
  };

  // Handle day selection
  const handleDayClick = (selectedDate) => {
    setActiveDay(selectedDate);
    updateMonthYear(selectedDate);
    onDateChange(selectedDate); 
  };

  return (
    <StyledDatePicker>
      <NavigateLeftButton onClick={handlePrevWeek} />
      <DateSection 
        currentWeek={currentWeek} 
        activeDay={activeDay} 
        onDayClick={handleDayClick} 
      />
      <NavigateRightButton onClick={handleNextWeek} />
    </StyledDatePicker>
  );
};

export default DatePicker;
