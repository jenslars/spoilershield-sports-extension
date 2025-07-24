import React, { useState, useEffect } from 'react';
import NavigateLeftButton from './NavigateLeftButton/NavigateLeftButton';
import NavigateRightButton from './NavigateRightButton/NavigateRightButton';
import DateSection from './DateSection/DateSection';

interface DatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {
  // Helper function to generate a range of dates
  const generateDateRange = (startDate: Date, days: number): Date[] => {
    const dates: Date[] = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const today = new Date();
  let startDate = new Date(today);
  startDate.setDate(today.getDate() - 365);

  // Align startDate to the previous (or current) Monday
  const dayOfWeek = startDate.getDay(); // 0 (Sun) - 6 (Sat)
  const daysToMonday = (dayOfWeek + 6) % 7; // 0 if Mon, 1 if Tue, ..., 6 if Sun
  startDate.setDate(startDate.getDate() - daysToMonday);

  const dateRange = generateDateRange(startDate, 730);

  // Find the index of the selectedDate and set the current week accordingly
  const selectedIndex = dateRange.findIndex(date => 
    date.toDateString() === selectedDate.toDateString()
  );
  const initialWeekIndex = selectedIndex !== -1 ? Math.floor(selectedIndex / 7) : 0;
  const [currentWeekIndex, setCurrentWeekIndex] = useState(initialWeekIndex);

  useEffect(() => {
    // When selectedDate changes, update the week index
    if (selectedIndex !== -1) {
      setCurrentWeekIndex(Math.floor(selectedIndex / 7));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const currentWeek = dateRange.slice(currentWeekIndex * 7, (currentWeekIndex + 1) * 7);

  // Navigate to the previous week
  const handlePrevWeek = () => {
    setCurrentWeekIndex((prevIndex) => {
      if (prevIndex > 0) {
        const newIndex = prevIndex - 1;
        const newDate = dateRange[newIndex * 7];
        onDateChange(newDate);
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
        const newDate = dateRange[newIndex * 7];
        onDateChange(newDate);
        return newIndex;
      }
      return prevIndex;
    });
  };

  // Handle day selection
  const handleDayClick = (selected: Date) => {
    onDateChange(selected);
  };

  return (
    <div className="flex flex-row justify-around items-center mx-auto mt-[10px]">
      <NavigateLeftButton onClick={handlePrevWeek} />
      <DateSection 
        currentWeek={currentWeek} 
        activeDay={selectedDate} 
        onDayClick={handleDayClick} 
      />
      <NavigateRightButton onClick={handleNextWeek} />
    </div>
  );
};

export default DatePicker; 