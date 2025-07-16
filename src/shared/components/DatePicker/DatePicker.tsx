import React, { useState } from 'react';
import NavigateLeftButton from './NavigateLeftButton/NavigateLeftButton';
import NavigateRightButton from './NavigateRightButton/NavigateRightButton';
import DateSection from './DateSection/DateSection';
import { useSchedule } from '../../hooks/useSchedule';

interface DatePickerProps {
  onDateChange?: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onDateChange }) => {
  const { date, monthYear, handleDateChange } = useSchedule();

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

  // Find today's index and set the initial week
  const todayIndex = dateRange.findIndex(date => 
    date.toDateString() === today.toDateString()
  );
  const initialWeekIndex = Math.floor(todayIndex / 7);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(initialWeekIndex);
  const [activeDay, setActiveDay] = useState(today);

  const currentWeek = dateRange.slice(currentWeekIndex * 7, (currentWeekIndex + 1) * 7);

  // Navigate to the previous week
  const handlePrevWeek = () => {
    setCurrentWeekIndex((prevIndex) => {
      if (prevIndex > 0) {
        const newIndex = prevIndex - 1;
        setActiveDay(dateRange[newIndex * 7]);
        handleDateChange(dateRange[newIndex * 7]);
        if (onDateChange) onDateChange(dateRange[newIndex * 7]);
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
        setActiveDay(dateRange[newIndex * 7]);
        handleDateChange(dateRange[newIndex * 7]);
        if (onDateChange) onDateChange(dateRange[newIndex * 7]);
        return newIndex;
      }
      return prevIndex;
    });
  };

  // Handle day selection
  const handleDayClick = (selectedDate: Date) => {
    setActiveDay(selectedDate);
    handleDateChange(selectedDate);
    if (onDateChange) onDateChange(selectedDate);
  };

  return (
    <div className="flex flex-row justify-around items-center mx-auto mt-[10px]">
      <NavigateLeftButton onClick={handlePrevWeek} />
      <DateSection 
        currentWeek={currentWeek} 
        activeDay={activeDay} 
        onDayClick={handleDayClick} 
      />
      <NavigateRightButton onClick={handleNextWeek} />
    </div>
  );
};

export default DatePicker; 