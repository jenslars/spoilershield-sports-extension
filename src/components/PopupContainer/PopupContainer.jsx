import React, { useState, useEffect } from 'react';
import HeaderSection from './HeaderSection/HeaderSection'
import DatePicker from './DatePicker/DatePicker';
import ScheduleFeed from './ScheduleFeed/ScheduleFeed';
import { fetchNBASchedule } from '../../utils/api/nba_schedule_api';
import { StyledPopupContainer } from './styles';

const PopupContainer = () => {

  const [monthYear, setMonthYear] = useState({ month: '', year: '' });

  // Function to update month and year based on the new date
  const updateMonthYear = (date) => {
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    setMonthYear({ month, year });
  };

  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date()); // Initialize date with today's date

  // Function to fetch schedule based on the selected date
  const loadSchedule = async (selectedDate) => {
    try {
      // Format the date to YYYY-MM-DD
      const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
      
      console.log(formattedDate);
      const data = await fetchNBASchedule(formattedDate);
      setSchedule(data); // Update the schedule data
    } catch (error) {
      console.error('Error loading schedule:', error);
    }
  };

  // Fetch the schedule for the initial date when the component mounts
  useEffect(() => {
    loadSchedule(date);
  }, [date]); // Re-run the effect whenever `date` changes

  // Handle date change from DatePicker
  const handleDateChange = (newDate) => {
    setDate(newDate); // Update the date state
  };


    return (
      <StyledPopupContainer >
        <HeaderSection monthYear={monthYear} />
        <DatePicker updateMonthYear={updateMonthYear} />
        <ScheduleFeed schedule={schedule} date={date} />
      </StyledPopupContainer>
    );
  };

export default PopupContainer;
