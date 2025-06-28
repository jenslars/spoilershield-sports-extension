import React from 'react';

import HeaderSection from '../../shared/components/Header/HeaderSection.jsx';
import DatePicker from '../../shared/components/DatePicker/DatePicker.jsx';
import ScheduleFeed from '../../shared/components/ScheduleFeed/ScheduleFeed.jsx';
import { useSchedule } from '../../shared/hooks/useSchedule';
import { StyledLandingPage } from './styles';

const LandingPage = () => {
  const { monthYear, schedule, handleDateChange } = useSchedule();

  return (
    <StyledLandingPage>
      <HeaderSection monthYear={monthYear} />
      <DatePicker onDateChange={handleDateChange} />
      <ScheduleFeed schedule={schedule} />
    </StyledLandingPage>
  );
};

export default LandingPage;
