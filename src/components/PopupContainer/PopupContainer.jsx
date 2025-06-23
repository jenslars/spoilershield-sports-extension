import React, { useState, useEffect } from 'react';
import HeaderSection from './HeaderSection/HeaderSection';
import DatePicker from './DatePicker/DatePicker';
import ScheduleFeed from './ScheduleFeed/ScheduleFeed';
import { fetchNBASchedule } from '../../utils/api/nba_schedule_api';
import { StyledPopupContainer } from './styles';

const PopupContainer = () => {
  const [monthYear, setMonthYear] = useState({ month: '', year: '' });
  const [schedule, setSchedule] = useState(null);
  const [date, setDate] = useState(new Date());

  // Function to update month and year based on the new date
  const updateMonthYear = (date) => {
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    setMonthYear({ month, year });
  };

  // Function to fetch and set schedule data
  const loadSchedule = async (selectedDate) => {
    try {
      const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
      const data = await fetchNBASchedule(formattedDate);
      setSchedule(data); // Set the schedule data
    } catch (error) {
      console.error('Error loading schedule:', error);
    }
  };

  // Handle date change and load the schedule for the new date
  const handleDateChange = (newDate) => {
    setDate(newDate);
    loadSchedule(newDate);
  };

  return (
    <StyledPopupContainer>
      <HeaderSection monthYear={monthYear} />
      <DatePicker updateMonthYear={updateMonthYear} onDateChange={handleDateChange} />
      <ScheduleFeed schedule={schedule} />
    </StyledPopupContainer>
  );
};

export default PopupContainer;
