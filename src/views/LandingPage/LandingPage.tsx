import React from 'react';
import HeaderSection from '../../shared/components/Header/HeaderSection';
import DatePicker from '../../shared/components/DatePicker/DatePicker';
import ScheduleFeed from '../../shared/components/ScheduleFeed/ScheduleFeed';
import { useSchedule } from '../../shared/hooks/useSchedule';
import { useApiKey } from '../../shared/hooks/useApiKey';

const LandingPage: React.FC = () => {
  const { apiKey, loading: apiKeyLoading, error: apiKeyError } = useApiKey();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const scheduleHook = useSchedule(apiKey, selectedDate);
  const { monthYear, schedule, isLoading, error } = scheduleHook;

  const handleDateChange = (newDate: Date) => setSelectedDate(newDate);

  return (
    <div className="h-full bg-background text-text-primary">
      <HeaderSection monthYear={monthYear} />
      <DatePicker selectedDate={selectedDate} onDateChange={handleDateChange} />
      {apiKeyLoading && <div>Checking device registration...</div>}
      {apiKeyError && <div>Error: {apiKeyError}</div>}
      {isLoading && <div>Loading schedule...</div>}
      {error && <div>Error: {error}</div>}
      {schedule && <ScheduleFeed schedule={schedule} />}
    </div>
  );
};

export default LandingPage; 