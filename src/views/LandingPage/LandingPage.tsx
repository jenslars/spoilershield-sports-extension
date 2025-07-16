import React from 'react';
import HeaderSection from '../../shared/components/Header/HeaderSection';
import DatePicker from '../../shared/components/DatePicker/DatePicker';
import ScheduleFeed from '../../shared/components/ScheduleFeed/ScheduleFeed';
import { useSchedule } from '../../shared/hooks/useSchedule';

const LandingPage: React.FC = () => {
  const { monthYear, schedule, handleDateChange } = useSchedule();

  return (
    <div className="h-full bg-background text-text-primary">
      <HeaderSection monthYear={monthYear} />
      <DatePicker onDateChange={handleDateChange} />
      <ScheduleFeed schedule={schedule} />
    </div>
  );
};

export default LandingPage; 